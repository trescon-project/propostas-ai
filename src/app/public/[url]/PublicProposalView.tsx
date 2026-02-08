'use client';

import React from 'react';
import { useProposal } from '@/contexts/ProposalContext';
import HomeSlide from '@/components/templates/HomeSlide';
import ChallengeSlide from '@/components/templates/ChallengeSlide';
import SolutionSlide from '@/components/templates/SolutionSlide';
import MethodologySlide from '@/components/templates/MethodologySlide';
import WorkPlanSlide from '@/components/templates/WorkPlanSlide';
import WorkPlanDrilldownSlide from '@/components/templates/WorkPlanDrilldownSlide';
import PricingSlide from '@/components/templates/PricingSlide';

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
            <section className="w-full h-screen relative flex-shrink-0 snap-start">
                <HomeSlide />
            </section>
            <section className="w-full h-screen relative flex-shrink-0 snap-start">
                <ChallengeSlide />
            </section>
            <section className="w-full h-screen relative flex-shrink-0 snap-start">
                <SolutionSlide />
            </section>
            <section className="w-full h-screen relative flex-shrink-0 snap-start">
                <MethodologySlide />
            </section>
            <section className="w-full h-screen relative flex-shrink-0 snap-start">
                <WorkPlanSlide />
            </section>
            {data.slides.weeklyDetails.map((week) => (
                <section key={week.id} className="w-full h-screen relative flex-shrink-0 snap-start">
                    <WorkPlanDrilldownSlide week={week as any} />
                </section>
            ))}
            <section className="w-full h-screen relative flex-shrink-0 snap-start">
                <PricingSlide />
            </section>

            {/* Sticky CTA for Clients? */}
            <div className="fixed bottom-10 right-10 z-50">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] font-bold text-white shadow-2xl hover:scale-105 transition-all border border-white/20">
                    Aprovar Proposta
                </button>
            </div>
        </div>
    );
}
