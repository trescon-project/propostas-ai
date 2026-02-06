'use client';

const ASSETS = {
    VIDEO: '/assets/challenge-bg-new.mp4',
};

import { useProposal } from '@/contexts/ProposalContext';

interface ChallengeSlideProps {
    proposalTitle?: string;
    className?: string;
}

export default function ChallengeSlide({
    proposalTitle,
    className
}: ChallengeSlideProps) {
    const { data } = useProposal();
    const displayTitle = proposalTitle || data.meta.title;

    return (
        <div className={`relative w-full h-full bg-black overflow-hidden font-poppins ${className}`}>

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                {/* Fallback pattern/color if video fails or isn't present */}
                <div className="absolute inset-0 bg-neutral-900" />

                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src={ASSETS.VIDEO} type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="absolute left-[17%] top-[40%] w-[66%] z-20 flex flex-col items-start">

                <h2 className="text-[5vh] font-semibold text-white leading-tight animate-slideUp">
                    Como entendemos o desafio
                </h2>

                <h2
                    className="text-[5vh] font-semibold leading-tight animate-slideUp"
                    style={{
                        animationDelay: '200ms',
                        background: 'linear-gradient(to bottom, #0b95da, #ac12e1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}
                >
                    {displayTitle}
                </h2>
            </div>
        </div>
    );
}
