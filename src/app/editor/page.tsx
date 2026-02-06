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

export default function EditorPage() {
    const { data, updateMeta, setAiContext, updateData } = useProposal();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!data.aiContext) return;
        setIsGenerating(true);
        try {
            const result = await generateProposalAction(data.aiContext);
            if (result) {
                updateData({ slides: result });
            }
        } catch (error) {
            console.error("Error generating proposal:", error);
            alert("Erro ao gerar proposta. Verifique o console.");
        } finally {
            setIsGenerating(false);
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

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className={`w-full py-4 rounded-xl bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isGenerating ? '✨ Gerando...' : '✨ Gerar Proposta com IA'}
                    </button>
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
