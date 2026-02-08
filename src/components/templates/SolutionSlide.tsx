'use client';

const ASSETS = {
    BG: '/assets/background-4.png',
    SHAPE: '/assets/standard-element.svg'
};

import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';

interface SolutionSlideProps {
    title?: string;
    description?: string;
    className?: string;
    editable?: boolean;
}

export default function SolutionSlide({
    title,
    description,
    className,
    editable = false
}: SolutionSlideProps) {
    const { data, updateSlideData } = useProposal();
    const displayTitle = title || data.slides.solution.title;
    const displayDescription = description || data.slides.solution.description;

    return (
        <div
            className={`relative w-full h-full overflow-hidden font-poppins ${className}`}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center animate-scaleIn z-0"
                style={{ backgroundImage: `url(${ASSETS.BG})` }}
            />

            {/* Glass Box Container */}
            <div className="absolute inset-0 flex items-center justify-center p-16 z-20">
                <div
                    className="relative w-full max-w-[1025px] max-h-[85vh] bg-gradient-to-b from-black/50 to-[#22111d]/50 backdrop-blur-md rounded-[42px] border border-white/5 flex flex-col justify-start p-12"
                    style={{
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 0 20px rgba(255,255,255,0.05)'
                    }}
                >
                    {/* Label/Overline */}
                    <div className="text-[2vh] font-semibold text-blue-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-4 inline-block w-full">
                        <EditableText
                            value="Solução Proposta"
                            onChange={() => { }} // Static label for now or could be editable too
                            editable={editable}
                        />
                    </div>

                    {/* Title/Head */}
                    <div className="mb-4 text-white">
                        <EditableText
                            tagName="h2"
                            value={displayTitle}
                            onChange={(val) => updateSlideData('solution', { title: val })}
                            className="text-[4vh] font-bold leading-tight border-b border-white/10"
                            editable={editable}
                        />
                    </div>

                    {/* Description Text */}
                    <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide text-white/90">
                        <EditableText
                            tagName="p"
                            value={displayDescription}
                            onChange={(val) => updateSlideData('solution', { description: val })}
                            className="text-[2.2vh] leading-relaxed font-light whitespace-pre-wrap border-b border-white/10"
                            editable={editable}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
}
