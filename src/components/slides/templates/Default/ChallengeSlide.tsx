'use client';

const ASSETS = {
    VIDEO: '/assets/challenge-bg-new.mp4',
};

import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';
import DraggableBlock from '@/components/slides/DraggableBlock';
// import { Rnd } from 'react-rnd'; // No longer needed directly

interface ChallengeSlideProps {
    title?: string;
    description?: string;
    points?: string[];
    className?: string;
    editable?: boolean;
    slideId?: string;
    extraContent?: any[];
}

export default function ChallengeSlide({
    title,
    description,
    points,
    className,
    editable = false,
    slideId,
    extraContent
}: ChallengeSlideProps) {
    const { updateSlideData, updateExtraContent } = useProposal();

    // Fallback content if props are missing (e.g. during initial load or transition)
    const displayTitle = title || "O Desafio";
    const displayDescription = description || "Descrição do desafio atual...";
    const displayPoints = points || ['Ponto de dor 1', 'Ponto de dor 2'];

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
                    value={displayTitle}
                    onChange={(val) => slideId && updateSlideData(slideId, { title: val })}
                    className="text-[6vh] font-bold text-white leading-tight animate-slideUp border-b border-white/10"
                    editable={editable}
                />

                <EditableText
                    tagName="p"
                    value={displayDescription}
                    onChange={(val) => slideId && updateSlideData(slideId, { description: val })}
                    className="text-[2.5vh] text-white/80 max-w-2xl animate-fadeIn border-b border-white/10"
                    editable={editable}
                />

                <div className="flex flex-col gap-2 mt-4">
                    {displayPoints.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[2vh] text-white animate-slideRight" style={{ animationDelay: `${idx * 100}ms` }}>
                            <span className="w-2 h-2 rounded-full bg-[#0b95da]" />
                            <EditableText
                                value={point}
                                onChange={(val) => {
                                    if (!slideId) return;
                                    const newPoints = [...displayPoints];
                                    newPoints[idx] = val;
                                    updateSlideData(slideId, { points: newPoints });
                                }}
                                className="border-b border-white/10"
                                editable={editable}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Render Extra Content (Draggable Texts) */}
            {extraContent?.map((item) => (
                <DraggableBlock
                    key={item.id}
                    slideId={slideId || ''}
                    item={item}
                    editable={editable}
                />
            ))}
        </div>
    );
}
