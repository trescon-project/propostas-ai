'use client';

const ASSETS = {
    VIDEO: '/assets/home-bg.mp4',
    LOGO: '/assets/logo-3con.svg',
};

import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';
import DraggableBlock from '@/components/slides/DraggableBlock';
// import { Rnd } from 'react-rnd'; // No longer needed directly

interface HomeSlideProps {
    title?: string;
    subtitle?: string; // Added subtitle support if needed, though previously mapped to meta.title
    className?: string;
    editable?: boolean;
    slideId?: string;
    extraContent?: any[];
}

export default function HomeSlide({
    title,
    subtitle,
    className,
    editable = false,
    slideId,
    extraContent
}: HomeSlideProps) {
    const { data, updateMeta, updateSlideData, updateExtraContent } = useProposal();

    // Home slide might still want to bind to global meta title/date or local properties?
    // The previous implementation bound to `data.meta.title` and `data.meta.date`.
    // If we want multiple "Home" slides, they should probably have their own titles.
    // For now, let's allow override via props but default to meta for the main one?
    // Actually, distinct slides should have distinct content.
    // Let's assume `title` prop comes from `slide.content.title`.

    const displayTitle = title || "Transformação Digital";
    const displayCompanyName = data.meta.companyName; // Company name is likely global
    const displayDate = data.meta.date; // Date is likely global

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
            <img
                src={ASSETS.LOGO}
                alt="Logo 3CON"
                className="absolute left-[5.5%] top-[27%] w-[31%] h-auto object-contain z-20 animate-fadeIn"
            />

            {/* Content Group */}
            <div className="absolute left-[5.5%] bottom-[15%] w-[89%] flex items-end justify-between z-20">
                {/* Left Side: Label + Title */}
                <div className="flex flex-col justify-start animate-slideUp">
                    <div className="flex items-center gap-2 text-[2.2vh] font-normal text-white uppercase tracking-[1px] leading-tight mb-2">
                        <span>Proposta para</span>
                        <EditableText
                            value={displayCompanyName}
                            onChange={(val) => updateMeta('companyName', val)}
                            className="text-white border-b border-white/20"
                            editable={editable}
                        />
                    </div>
                    <EditableText
                        tagName="h1"
                        value={displayTitle}
                        onChange={(val) => slideId && updateSlideData(slideId, { title: val })}
                        className="text-[5vh] font-bold text-white leading-tight mt-0 border-b border-white/20"
                        editable={editable}
                    />
                </div>

                {/* Right Side: Date with Delay */}
                <div className="animate-slideUpDelay hidden md:block">
                    <EditableText
                        value={displayDate}
                        onChange={(val) => updateMeta('date', val)}
                        className="text-[2.2vh] font-normal text-white uppercase tracking-[1px] leading-tight mb-1 border-b border-white/10"
                        editable={editable}
                    />
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
