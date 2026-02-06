'use client';

import { useState } from 'react';
import { useSwiperSlide } from 'swiper/react';
import { Close } from '@mui/icons-material';

const ASSETS = {
    FLOW_PLACEHOLDER: '/assets/flow-placeholder.png',
    PATTERN_CAMADA: '/assets/pattern-camada.svg',
    ICON_ANGLE_UP: '/assets/icon-angle-up.svg'
};

interface InitialFlowsSlideProps {
    className?: string;
}

export default function InitialFlowsSlide({ className }: InitialFlowsSlideProps) {
    const swiperSlide = useSwiperSlide();
    const isActive = swiperSlide ? swiperSlide.isActive : true;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-[#000528] from-[58%] via-[rgba(0,20,54,0.8)] via-[44%] to-[#0b95da] to-[166%] ${className}`}>

            {/* Background Patterns - "Minhocão" */}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">

                {/* Title Pill */}
                <div
                    className={`absolute top-[71px] left-[127px] px-8 h-[66px] flex items-center justify-center rounded-[50px] bg-white/[0.08] backdrop-blur-[25px] border border-white/10 ${isActive ? 'animate-slideDown' : 'opacity-0'}`}
                >
                    <h2 className="text-[32px] font-extrabold text-white tracking-[1px] font-poppins">
                        Fluxos iniciais
                    </h2>
                </div>

                {/* Grid of Flows */}
                <div className={`absolute top-[169px] left-[127px] flex flex-col gap-6 ${isActive ? 'animate-slideUp' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>

                    {/* Row 1 */}
                    <div className="flex gap-6">
                        <div
                            onClick={() => setSelectedImage(ASSETS.FLOW_PLACEHOLDER)}
                            className="w-[501px] h-[212px] relative rounded-[9px] overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-[#ac12e1]/50 transition-all hover:scale-[1.02]"
                        >
                            <img src={ASSETS.FLOW_PLACEHOLDER} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Flow 1" />
                        </div>
                        <div
                            onClick={() => setSelectedImage(ASSETS.FLOW_PLACEHOLDER)}
                            className="w-[501px] h-[212px] relative rounded-[9px] overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-[#ac12e1]/50 transition-all hover:scale-[1.02]"
                        >
                            <img src={ASSETS.FLOW_PLACEHOLDER} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Flow 2" />
                        </div>
                        <div
                            onClick={() => setSelectedImage(ASSETS.FLOW_PLACEHOLDER)}
                            className="w-[501px] h-[212px] relative rounded-[9px] overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-[#ac12e1]/50 transition-all hover:scale-[1.02]"
                        >
                            <img src={ASSETS.FLOW_PLACEHOLDER} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Flow 3" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex gap-6">
                        <div
                            onClick={() => setSelectedImage(ASSETS.FLOW_PLACEHOLDER)}
                            className="w-[501px] h-[212px] relative rounded-[9px] overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-[#ac12e1]/50 transition-all hover:scale-[1.02]"
                        >
                            <img src={ASSETS.FLOW_PLACEHOLDER} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Flow 4" />
                        </div>
                        <div
                            onClick={() => setSelectedImage(ASSETS.FLOW_PLACEHOLDER)}
                            className="w-[501px] h-[212px] relative rounded-[9px] overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-[#ac12e1]/50 transition-all hover:scale-[1.02]"
                        >
                            <img src={ASSETS.FLOW_PLACEHOLDER} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Flow 5" />
                        </div>
                        <div
                            onClick={() => setSelectedImage(ASSETS.FLOW_PLACEHOLDER)}
                            className="w-[501px] h-[212px] relative rounded-[9px] overflow-hidden bg-white/5 border border-white/10 group cursor-pointer hover:border-[#ac12e1]/50 transition-all hover:scale-[1.02]"
                        >
                            <img src={ASSETS.FLOW_PLACEHOLDER} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Flow 6" />
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows (Visual only per Figma) */}
                <div className={`absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-full flex justify-between px-[120px] pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
                    {/* These are mostly decorative or layout placeholders in the Figma node provided, usually Swiper handles real nav */}
                </div>
            </div>

            {/* Fullscreen Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn p-8"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative w-full max-w-5xl h-auto max-h-[90vh] flex items-center justify-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-[#ac12e1] transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <Close sx={{ fontSize: 40 }} />
                        </button>
                        <img
                            src={selectedImage}
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/20"
                            alt="Fullscreen Flow"
                            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
