'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProposal } from '@/contexts/ProposalContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { createClient } from '@/lib/supabase/client';
import { saveProposalAction } from '@/app/actions/saveProposal';
import { generateProposalAction } from '@/app/actions/generateProposal';
import { trackAccessAction } from '@/app/actions/trackAccess';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
    Add, ContentCopy, Delete, Texture, Dashboard,
    AutoAwesome, Save, Share, Download, ArrowUpward, ArrowDownward
} from '@mui/icons-material';
import { SLIDE_COMPONENTS, SLIDE_LABELS } from '@/config/slideMappings';

function EditorContent() {
    const { data, updateMeta, setAiContext, updateData, addSlide, removeSlide, duplicateSlide, addExtraContent, moveSlide } = useProposal();
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
                    updateData({
                        meta: {
                            title: proposal.title,
                            companyName: proposal.company_name,
                            customUrl: proposal.custom_url,
                            date: proposal.date,
                            status: proposal.status
                        },
                        slides: Array.isArray(proposal.content)
                            ? proposal.content
                            : data.slides, // Fallback if data remains in old format (or you can map old object to new array here)
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
        if (!data.aiContext.trim()) {
            alert("Por favor, preencha o contexto para a IA antes de gerar a proposta.");
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateProposalAction(data.aiContext);
            if (result.success && result.data) {
                updateData({ slides: result.data });
                alert("Proposta gerada com sucesso!");
            } else {
                alert("Erro ao gerar proposta: " + (result.error || "Erro desconhecido"));
            }
        } catch (error) {
            console.error("Generate error:", error);
            alert("Erro ao gerar proposta com IA.");
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
            const slides = document.querySelectorAll('.swiper-slide-content'); // Target content wrapper
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

                    <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Adicionar Slide</label>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(SLIDE_LABELS).map(([type, label]) => (
                                <button
                                    key={type}
                                    onClick={() => addSlide(type)}
                                    className="p-2 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-left truncate"
                                    title={label}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
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
                    {data.slides.map((slide, index) => {
                        const SlideComponent = SLIDE_COMPONENTS[slide.type];

                        if (!SlideComponent) return null;

                        return (
                            <SwiperSlide key={slide.id}>
                                <div className="relative w-full h-full group swiper-slide-content">
                                    {/* Slide Toolbar */}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => addExtraContent(slide.id, 'text')}
                                            className="p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 text-white tooltip-left"
                                            title="Adicionar Texto"
                                        >
                                            <Texture />
                                        </button>
                                        <div className="flex flex-col gap-1 mb-2 pb-2 border-b border-white/10">
                                            <button
                                                onClick={() => index > 0 && moveSlide(index, index - 1)}
                                                disabled={index === 0}
                                                className={`p-2 rounded-full backdrop-blur text-white tooltip-left transition-colors ${index === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}`}
                                                title="Mover para cima"
                                            >
                                                <ArrowUpward fontSize="small" />
                                            </button>
                                            <button
                                                onClick={() => index < data.slides.length - 1 && moveSlide(index, index + 1)}
                                                disabled={index === data.slides.length - 1}
                                                className={`p-2 rounded-full backdrop-blur text-white tooltip-left transition-colors ${index === data.slides.length - 1 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}`}
                                                title="Mover para baixo"
                                            >
                                                <ArrowDownward fontSize="small" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => duplicateSlide(slide.id)}
                                            className="p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 text-white tooltip-left"
                                            title="Duplicar Slide"
                                        >
                                            <ContentCopy />
                                        </button>
                                        <button
                                            onClick={() => removeSlide(slide.id)}
                                            className="p-3 rounded-full bg-red-500/20 backdrop-blur hover:bg-red-500/40 text-red-200 tooltip-left"
                                            title="Remover Slide"
                                        >
                                            <Delete />
                                        </button>
                                    </div>

                                    <SlideComponent
                                        {...slide.content}
                                        editable={true}
                                        slideId={slide.id}
                                        extraContent={slide.extraContent}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-[#000528] text-white">Carregando editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}
