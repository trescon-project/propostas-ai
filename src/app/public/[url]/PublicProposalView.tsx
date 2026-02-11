'use client';

import React from 'react';
import { useProposal } from '@/contexts/ProposalContext';
import { SLIDE_COMPONENTS } from '@/config/slideMappings';

export default function PublicProposalView() {
    const { data } = useProposal();

    return (
        <div className="w-full h-screen bg-[#000528] overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
            {/* Navigation / Header for Public View */}
            <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
                <div className="text-xl font-bold bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] bg-clip-text text-transparent">
                    {data.meta.companyName}
                </div>
            </div>

            {/* Slides rendered vertically */}
            {data.slides.map((slide) => {
                const SlideComponent = SLIDE_COMPONENTS[slide.type];

                if (!SlideComponent) return null;

                return (
                    <section key={slide.id} className="w-full h-screen relative flex-shrink-0 snap-start">
                        <SlideComponent
                            {...slide.content}
                            editable={false}
                            slideId={slide.id}
                            extraContent={slide.extraContent}
                        />
                    </section>
                );
            })}

            {/* Sticky CTA for Clients? */}
            <div className="fixed bottom-10 right-10 z-50">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] font-bold text-white shadow-2xl hover:scale-105 transition-all border border-white/20">
                    Aprovar Proposta
                </button>
            </div>
        </div>
    );
}
