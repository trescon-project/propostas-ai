'use client';

import React, { useState, useEffect } from 'react';
import { useProposal } from '@/contexts/ProposalContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import HomeSlide from '@/components/templates/HomeSlide';
import ChallengeSlide from '@/components/templates/ChallengeSlide';
import SolutionSlide from '@/components/templates/SolutionSlide';
import PricingSlide from '@/components/templates/PricingSlide';
import MethodologySlide from '@/components/templates/MethodologySlide';
import WorkPlanSlide from '@/components/templates/WorkPlanSlide';
import WorkPlanDrilldownSlide from '@/components/templates/WorkPlanDrilldownSlide';
import { generateProposalAction } from '@/app/actions/generateProposal';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, AutoAwesome, Save, Share, Dashboard } from '@mui/icons-material';
import { saveProposalAction } from '@/app/actions/saveProposal';
import { trackAccessAction } from '@/app/actions/trackAccess';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function EditorPage() {
    const { data, updateMeta, setAiContext, updateData } = useProposal();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const searchParams = useSearchParams();
    const proposalId = searchParams.get('id');

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Usuário';
                setUserName(name);
            }
        };
        fetchUser();

        const fetchProposal = async () => {
            if (!proposalId) return;

            try {
                const supabase = createClient();
                const { data: proposal, error } = await supabase
                    .from('proposals')
                    .select('*')
                    .eq('id', proposalId)
                    .single();

                if (error) throw error;

                if (proposal) {
                    // Update data carefully to preserve defaults for missing sections
                    updateData({
                        meta: {
                            title: proposal.title,
                            companyName: proposal.company_name,
                            customUrl: proposal.custom_url,
                            date: proposal.date,
                            // @ts-ignore
                            status: proposal.status
                        },
                        slides: {
                            ...data.slides, // Keep existing defaults/current state
                            ...(proposal.content as any) // Override with loaded data
                        },
                        aiContext: proposal.ai_context || ''
                    });
                }
            } catch (err) {
                console.error("Error fetching proposal:", err);
                alert("Erro ao carregar a proposta. Verifique se o ID está correto.");
            }
        };

        if (proposalId) {
            trackAccessAction(proposalId);
            fetchProposal();
        }
    }, [proposalId]);

    const handleGenerate = async () => {
        if (!data.aiContext) return;
        setIsGenerating(true);
        try {
            const result = await generateProposalAction(data.aiContext);

            if (result.success && result.data) {
                // Merge generated slides with existing ones to preserve structure
                updateData({
                    meta: {
                        ...data.meta,
                        date: result.data.home?.date || data.meta.date
                    },
                    slides: {
                        ...data.slides,
                        ...result.data
                    }
                });
            } else {
                throw new Error(result.error || 'Falha ao gerar dados');
            }
        } catch (error) {
            console.error("Error generating proposal:", error);
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            alert(`Erro ao gerar proposta: ${errorMessage}. Verifique o console para mais detalhes.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await saveProposalAction(data);
            if (result.success) {
                alert('Proposta salva com sucesso!');
            } else {
                alert('Erro ao salvar: ' + result.error);
            }
        } catch (error) {
            alert('Erro ao salvar proposta.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleShare = async () => {
        setIsSaving(true);
        try {
            const result = await saveProposalAction(data);
            if (result.success) {
                const url = `${window.location.origin}/public/${data.meta.customUrl}`;
                await navigator.clipboard.writeText(url);
                alert('Proposta salva e link copiado para a área de transferência!');
            } else {
                alert('Erro ao salvar proposta para gerar o link: ' + result.error);
            }
        } catch (error) {
            alert('Erro ao processar compartilhamento.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const slides = document.querySelectorAll('.swiper-slide');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1920, 1080]
            });

            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i] as HTMLElement;
                const canvas = await html2canvas(slide, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#000528',
                    width: 1920,
                    height: 1080,
                    windowWidth: 1920,
                    windowHeight: 1080
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                if (i > 0) pdf.addPage([1920, 1080], 'landscape');
                pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
            }

            pdf.save(`${data.meta.companyName || 'Proposta'} - ${data.meta.title || 'Apresentacao'}.pdf`);
        } catch (error) {
            console.error("Export error:", error);
            alert("Erro ao exportar PDF.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#000528] overflow-hidden text-white">
            {/* Sidebar (Editor Controls) */}
            <div className="w-[400px] h-full border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col gap-6 z-50 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-poppins mb-1">Editor de Proposta</h1>
                        <p className="text-sm text-white/60">
                            Olá, <span className="text-[#0B95DA] font-semibold">{userName}</span>
                        </p>
                    </div>
                    <Link href="/dashboard" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white" title="Dashboard">
                        <Dashboard />
                    </Link>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Status da Proposta</label>
                    <select
                        value={data.meta.status || 'rascunho'}
                        onChange={(e) => updateMeta('status', e.target.value)}
                        className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors appearance-none cursor-pointer"
                    >
                        <option value="rascunho" className="bg-zinc-900 text-white">Rascunho</option>
                        <option value="em análise" className="bg-zinc-900 text-white">Em Análise</option>
                        <option value="aprovada" className="bg-zinc-900 text-white">Aprovada</option>
                        <option value="reprovada" className="bg-zinc-900 text-white">Reprovada</option>
                    </select>
                </div>

                {/* Meta Inputs */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Link da Proposta (Custom URL)</label>
                        <input
                            type="text"
                            value={data.meta.customUrl}
                            onChange={(e) => updateMeta('customUrl', e.target.value)}
                            className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Nome da Empresa</label>
                        <input
                            type="text"
                            value={data.meta.companyName}
                            onChange={(e) => updateMeta('companyName', e.target.value)}
                            className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Título da Proposta</label>
                        <input
                            type="text"
                            value={data.meta.title}
                            onChange={(e) => updateMeta('title', e.target.value)}
                            className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Data da Proposta</label>
                        <input
                            type="text"
                            value={data.meta.date}
                            onChange={(e) => updateMeta('date', e.target.value)}
                            className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0B95DA] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Contexto para IA</label>
                        <textarea
                            value={data.aiContext}
                            onChange={(e) => setAiContext(e.target.value)}
                            placeholder="Cole aqui o briefing, dores do cliente e solução esperada..."
                            className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm h-40 resize-none focus:outline-none focus:border-[#0B95DA] transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`col-span-2 py-4 rounded-xl bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <AutoAwesome />
                            {isGenerating ? 'Gerando...' : 'Gerar Proposta IA'}
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`py-3 rounded-xl bg-white/10 border border-white/10 font-bold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Save fontSize="small" />
                            {isSaving ? 'Salvando...' : 'Salvar'}
                        </button>

                        <button
                            onClick={handleShare}
                            className="py-3 rounded-xl bg-white/10 border border-white/10 font-bold text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Share fontSize="small" />
                            Compartilhar
                        </button>

                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className={`col-span-2 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Download fontSize="small" />
                            {isExporting ? 'Exportando...' : 'Exportar PDF'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 h-full relative bg-black/20">
                <Swiper
                    direction={'vertical'}
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    pagination={{ clickable: true }}
                    modules={[Mousewheel, Pagination]}
                    className="w-full h-full"
                >
                    <SwiperSlide>
                        <HomeSlide editable={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ChallengeSlide editable={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SolutionSlide editable={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <MethodologySlide editable={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WorkPlanSlide editable={true} />
                    </SwiperSlide>
                    {/* @ts-ignore */}
                    {(data.slides.weeklyDetails || []).map((week) => (
                        <SwiperSlide key={week.id}>
                            <WorkPlanDrilldownSlide week={week as any} editable={true} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide>
                        <PricingSlide editable={true} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
