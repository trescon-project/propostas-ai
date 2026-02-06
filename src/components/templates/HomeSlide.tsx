'use client';

const ASSETS = {
    VIDEO: '/assets/home-bg.mp4',
    LOGO: '/assets/logo-3con.svg',
};

import { useProposal } from '@/contexts/ProposalContext';

interface HomeSlideProps {
    title?: string;
    date?: string;
    className?: string;
}

export default function HomeSlide({
    title,
    date = "DD/MM/YYYY",
    className
}: HomeSlideProps) {
    const { data } = useProposal();
    const displayTitle = title || data.meta.title;

    return (
        <div className={`relative w-full h-full bg-[#bfbfbf] overflow-hidden font-poppins ${className}`}>

            {/* Background Video */}
            <video
                className="absolute inset-0 w-full h-full object-cover animate-scaleIn z-0"
                src={ASSETS.VIDEO}
                autoPlay
                loop
                muted
                playsInline
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent opacity-80 z-10" />

            {/* Logo */}
            {/* Positioned at ~5.5% left and ~27% top */}
            <img
                src={ASSETS.LOGO}
                alt="Logo 3CON"
                className="absolute left-[5.5%] top-[27%] w-[31%] h-auto object-contain z-20 animate-fadeIn"
            />

            {/* Content Group */}
            {/* Positioned at ~5.5% left and ~15% from bottom */}
            <div className="absolute left-[5.5%] bottom-[15%] w-[89%] flex items-end justify-between z-20">
                {/* Left Side: Label + Title */}
                <div className="flex flex-col justify-start animate-slideUp">
                    <p className="text-[2.2vh] font-normal text-white uppercase tracking-[1px] leading-tight mb-2">
                        Proposta para {data.meta.companyName}
                    </p>
                    <h1 className="text-[5vh] font-bold text-white leading-tight mt-0">
                        {displayTitle}
                    </h1>
                </div>

                {/* Right Side: Date with Delay */}
                <p className="text-[2.2vh] font-normal text-white uppercase tracking-[1px] leading-tight mb-1 animate-slideUpDelay hidden md:block">
                    {date}
                </p>
            </div>
        </div>
    );
}
