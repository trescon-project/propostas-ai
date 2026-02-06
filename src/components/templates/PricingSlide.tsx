'use client';

import { useSwiperSlide } from 'swiper/react';
import {
    Description,
    Timeline,
    Assignment,
    VerifiedUser,
    Groups,
    AccessTime,
    Star
} from '@mui/icons-material';
import { useProposal } from '@/contexts/ProposalContext';

const ASSETS = {
    PATTERN_CAMADA: '/assets/pattern-camada.svg'
};

interface PricingSlideProps {
    className?: string;
}

export default function PricingSlide({ className }: PricingSlideProps) {
    const swiperSlide = useSwiperSlide();
    const isActive = swiperSlide ? swiperSlide.isActive : true;
    const { data } = useProposal();
    const { pricing } = data.slides;

    return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#000528] from-[58%] via-[rgba(0,20,54,0.8)] via-[44%] to-[#0b95da] to-[166%] ${className}`}>

            {/* Background Patterns */}
            <div className={`absolute top-0 left-0 w-[509px] h-[718px] overflow-hidden rounded-[19px] opacity-60 mix-blend-screen transition-opacity duration-1000 ${isActive ? 'opacity-60' : 'opacity-0'}`}>
                <div className="absolute -top-[140%] -left-[40%] text-[#0B95DA]/20">
                    <img
                        src={ASSETS.PATTERN_CAMADA}
                        className="w-[1431px] max-w-none h-[903px] rotate-75 -scale-y-100 opacity-20"
                        alt=""
                    />
                </div>
            </div>

            <div className={`absolute top-[34px] left-[508px] w-[878px] h-[718px] overflow-hidden rounded-[19px] opacity-60 mix-blend-screen transition-opacity duration-1000 ${isActive ? 'opacity-60' : 'opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
                <div className="absolute -top-[100%] -left-[45%] text-[#0B95DA]/20">
                    <img
                        src={ASSETS.PATTERN_CAMADA}
                        className="w-[1431px] max-w-none h-[903px] -rotate-45 -scale-y-100 opacity-20"
                        alt=""
                    />
                </div>
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className={`flex flex-col gap-6 w-full max-w-[1400px] px-8 ${isActive ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>

                    {/* Title Section */}
                    <div className="flex justify-start">
                        {/* Title Pill */}
                        <div className="px-10 h-[80px] flex items-center justify-center rounded-[50px] bg-white/[0.08] backdrop-blur-[25px] border border-white/10">
                            <h2 className="text-[40px] font-extrabold text-white tracking-[1px] font-poppins">
                                Investimento
                            </h2>
                        </div>
                    </div>

                    {/* Main Cards Row */}
                    <div className="flex gap-6 items-stretch justify-center w-full">

                        {/* Investment Card (Left) */}
                        <div className="relative w-full max-w-[580px] flex-1 min-w-0 h-auto min-h-[500px] rounded-[24px] overflow-hidden">
                            {/* Blur Background Layer (Moved Outside) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0B95DA] to-[#9810FA] opacity-50 blur-[24px] pointer-events-none" />

                            {/* Card Content Layer */}
                            <div className="relative w-full h-full border border-white/10 bg-gradient-to-br from-[#0B95DA]/60 to-[#9810FA]/60 p-8 flex flex-col justify-start gap-6">
                                {/* Texture Overlay */}
                                <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.png')] mix-blend-overlay" />

                                {/* Top Section Group */}
                                <div className="flex flex-col gap-4 w-full">
                                    {/* Header */}
                                    <div className="relative z-10 flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                                            <Star className="text-yellow-400" sx={{ fontSize: 28 }} />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[12px] uppercase tracking-wider text-white/80 font-poppins font-semibold truncate">Investimento Total</span>
                                            <div className="flex gap-2 items-center">
                                                <span className="text-[12px] font-bold text-yellow-300 truncate">Melhor Custo-Benefício</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Value */}
                                    <div className="relative z-10">
                                        <h3 className="text-[56px] font-bold text-white tracking-tight -ml-1 leading-none break-words">
                                            {pricing.totalValue}
                                        </h3>
                                        <div className="mt-3 inline-flex items-center px-3 py-1.5 rounded-full bg-white/20 border border-white/10 max-w-full">
                                            <span className="text-[12px] font-bold text-white truncate">Parcelamento disponível</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Grid - Moved Up */}
                                <div className="relative z-10 grid grid-cols-2 gap-3 w-full mt-2">
                                    {pricing.features.map((feature: string, index: number) => (
                                        <div key={index} className="bg-white/10 rounded-xl p-4 flex flex-col gap-2 min-w-0">
                                            {index === 0 ? <Groups className="text-white" sx={{ fontSize: 24 }} /> : <AccessTime className="text-white" sx={{ fontSize: 24 }} />}
                                            <div className="min-w-0">
                                                <p className="text-[18px] font-bold text-white leading-tight truncate">{feature}</p>
                                                <p className="text-[12px] text-white/70 truncate">{index === 0 ? 'Especialistas' : 'Entrega Ágil'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Deliverables Card (Right) */}
                        <div className="relative w-full max-w-[640px] flex-1 min-w-0 h-auto min-h-[500px] rounded-[24px] overflow-hidden">
                            {/* Blur Background Layer (Moved Outside) */}
                            <div className="absolute inset-0 bg-[#1D293D] opacity-80 blur-[24px] pointer-events-none" />

                            {/* Card Content */}
                            <div className="relative w-full h-full border border-white/10 bg-[#1D293D]/90 shadow-2xl p-10 flex flex-col">

                                {/* Header */}
                                <div className="flex gap-5 items-center mb-8 border-b border-white/10 pb-6 shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B95DA] to-[#AC12E1] flex items-center justify-center shadow-lg">
                                        <Assignment className="text-white" sx={{ fontSize: 32 }} />
                                    </div>
                                    <div>
                                        <h3 className="text-[28px] font-bold text-white">Entregáveis</h3>
                                        <p className="text-[16px] text-white/60">Tudo que você vai receber</p>
                                    </div>
                                </div>

                                {/* List */}
                                <div className="flex flex-col gap-5 w-full pr-2">
                                    {pricing.deliverables.map((item: { title: string; description: string }, index: number) => (
                                        <div key={index} className="flex gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 items-center hover:bg-white/10 transition-colors w-full">
                                            <div className="w-10 h-10 rounded-xl bg-[#0B95DA]/20 flex items-center justify-center text-[#0B95DA] shrink-0">
                                                {index === 0 ? <Description sx={{ fontSize: 24 }} /> : index === 1 ? <Timeline sx={{ fontSize: 24 }} /> : <Assignment sx={{ fontSize: 24 }} />}
                                            </div>
                                            <div className="flex-1 min-w-0 pr-2">
                                                <p className="text-[18px] font-bold text-white break-words">{item.title}</p>
                                                <p className="text-[14px] text-white/50 break-words">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer Guarantee */}
                                <div className="mt-8 pt-6 border-t border-white/10 flex gap-5 items-center bg-[#0B95DA]/10 p-5 rounded-2xl shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <VerifiedUser className="text-[#0B95DA]" sx={{ fontSize: 28 }} />
                                    </div>
                                    <div>
                                        <p className="text-[18px] font-bold text-white">Garantia de Qualidade</p>
                                        <p className="text-[14px] text-white/50">100% de satisfação garantida</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
