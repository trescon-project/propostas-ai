'use client';

import React, { useState } from 'react';
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

// ... imports
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Download, AutoAwesome } from '@mui/icons-material';

export default function EditorPage() {
    const { data, updateMeta, setAiContext, updateData } = useProposal();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleGenerate = async () => {
        // ... (existing logic)
        if (!data.aiContext) return;
        setIsGenerating(true);
        try {
            const result = await generateProposalAction(data.aiContext);
            if (result) {
                updateData({ slides: result });
            }
        } catch (error) {
            console.error("Error generating proposal:", error);
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            alert(`Erro ao gerar proposta: ${errorMessage}. Verifique o console para mais detalhes.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const slides = document.querySelectorAll('.swiper-slide');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1920, 1080] // Assuming Full HD slides
            });

            for (let i = 0; i < slides.length; i++) {
                const slide = slides[i] as HTMLElement;

                // Temporary style fixes for capture
                // html2canvas sometimes needs help with transforms

                const canvas = await html2canvas(slide, {
                    scale: 2, // Better quality
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#000528', // Ensure bg color
                    width: 1920,
                    height: 1080,
                    windowWidth: 1920,
                    windowHeight: 1080
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.9);

                if (i > 0) {
                    pdf.addPage([1920, 1080], 'landscape');
                }

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
            <div className="w-[400px] h-full border-r border-white/10 bg-white/5 backdrop-blur-xl p-6 flex flex-col gap-6 z-50">
                <div>
                    <h1 className="text-2xl font-bold font-poppins mb-2">Editor de Proposta</h1>
                    <p className="text-sm text-white/60">Personalize o conteúdo com IA</p>
                </div>

                {/* Meta Inputs */}
                <div className="flex flex-col gap-4">
                    {/* ... (existing inputs) ... */}
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
                        <label className="text-xs uppercase tracking-wider text-white/40 font-bold">Contexto para IA</label>
                        <textarea
                            value={data.aiContext}
                            onChange={(e) => setAiContext(e.target.value)}
                            placeholder="Cole aqui o briefing, dores do cliente e solução esperada..."
                            className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm h-40 resize-none focus:outline-none focus:border-[#0B95DA] transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 mt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-4 rounded-xl bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <AutoAwesome />
                            {isGenerating ? 'Gerando...' : 'Gerar Proposta IA'}
                        </button>

                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className={`w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Download />
                            {isExporting ? 'Exportando...' : 'Exportar PDF'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 h-full relative bg-black/20">
                <Swiper
                    // ...
                    direction={'vertical'}
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    pagination={{ clickable: true }}
                    modules={[Mousewheel, Pagination]}
                    className="w-full h-full"
                >
                    <SwiperSlide>
                        <HomeSlide />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ChallengeSlide />
                    </SwiperSlide>
                    <SwiperSlide>
                        <SolutionSlide />
                    </SwiperSlide>

                    {/* New Slides */}
                    <SwiperSlide>
                        <MethodologySlide />
                    </SwiperSlide>
                    <SwiperSlide>
                        <WorkPlanSlide />
                    </SwiperSlide>

                    {/* Weekly Details */}
                    {data.slides.weeklyDetails.map((week) => (
                        <SwiperSlide key={week.id}>
                            <WorkPlanDrilldownSlide week={week as any} />
                        </SwiperSlide>
                    ))}

                    <SwiperSlide>
                        <PricingSlide />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
