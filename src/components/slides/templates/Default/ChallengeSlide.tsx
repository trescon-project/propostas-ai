'use client';

const ASSETS = {
    VIDEO: '/assets/challenge-bg-new.mp4',
};

import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';

interface ChallengeSlideProps {
    proposalTitle?: string;
    className?: string;
    editable?: boolean;
}

export default function ChallengeSlide({
    proposalTitle,
    className,
    editable = false
}: ChallengeSlideProps) {
    const { data, updateMeta, updateSlideData } = useProposal();
    const displayTitle = proposalTitle || data.meta.title;

    return (
        <div className={`relative w-full h-full bg-black overflow-hidden font-poppins ${className}`}>

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
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
            <div className="absolute left-[10%] top-[30%] w-[80%] z-20 flex flex-col items-start gap-4">

                <EditableText
                    tagName="h1"
                    value={data.slides.challenge.title}
                    onChange={(val) => updateSlideData('challenge', { title: val })}
                    className="text-[6vh] font-bold text-white leading-tight animate-slideUp border-b border-white/10"
                    editable={editable}
                />

                <EditableText
                    tagName="p"
                    value={data.slides.challenge.description}
                    onChange={(val) => updateSlideData('challenge', { description: val })}
                    className="text-[2.5vh] text-white/80 max-w-2xl animate-fadeIn border-b border-white/10"
                    editable={editable}
                />

                <div className="flex flex-col gap-2 mt-4">
                    {(data.slides.challenge.points || []).map((point, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[2vh] text-white animate-slideRight" style={{ animationDelay: `${idx * 100}ms` }}>
                            <span className="w-2 h-2 rounded-full bg-[#0b95da]" />
                            <EditableText
                                value={point}
                                onChange={(val) => {
                                    const newPoints = [...data.slides.challenge.points];
                                    newPoints[idx] = val;
                                    updateSlideData('challenge', { points: newPoints });
                                }}
                                className="border-b border-white/10"
                                editable={editable}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
