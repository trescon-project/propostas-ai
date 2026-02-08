'use client';

import { useSwiperSlide } from 'swiper/react';
import { GlassBox } from '@/components/ui/GlassBox';
import { Titulo } from '@/components/ui/Titulo';
import { WeekLabel } from '@/components/ui/WeekLabel';
import { SystemDot } from '@/components/ui/SystemDot';
import { Tags, TagVariant } from '@/components/ui/Tags';

const ASSETS = {
    BG_IMAGE: '/assets/background-5.png'
};
const PHASES = [
    { label: 'Imersão', start: 0.1, width: 0.8, color: 'purple' },
    { label: 'AS IS Técnico', start: 1.1, width: 1.4, color: 'blue' },
    { label: 'AS IS de Negócio', start: 1.1, width: 2.8, color: 'purple' },
    { label: 'Consolidação', start: 4.1, width: 0.8, color: 'blue' },
    { label: 'Construção TO BE', start: 4.5, width: 1.2, color: 'purple' },
    { label: 'Apresentação Executiva', start: 5.1, width: 0.8, color: 'blue' },
];

const WEEKS = [
    { label: 'SEMANA 1', date: '02/02/2026 - 06/02/2026' },
    { label: 'SEMANA 2', date: '09/02/2026 - 13/02/2026' },
    { label: 'SEMANA 3', date: '16/02/2026 - 20/02/2026' },
    { label: 'SEMANA 4', date: '23/02/2026 - 27/02/2026' },
    { label: 'SEMANA 5', date: '02/03/2026 - 06/03/2026' },
    { label: 'SEMANA 6', date: '09/03/2026 - 13/03/2026' }
];

import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';

interface WorkPlanSlideProps {
    className?: string;
    editable?: boolean;
}

export default function WorkPlanSlide({
    className,
    editable = false
}: WorkPlanSlideProps) {
    const swiperSlide = useSwiperSlide();
    const isActive = swiperSlide ? swiperSlide.isActive : true;
    const { data, updateSlideData } = useProposal();
    const { workPlan } = data.slides;

    return (
        <div
            className={`relative w-full h-full overflow-hidden font-poppins ${className}`}
            style={{ background: '#000528' }}
        >
            {/* ... background could go here if needed ... */}

            {/* Main Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20">

                {/* Title */}
                <div className={`mb-12 ${isActive ? "animate-slideDown" : "opacity-0"}`}>
                    <EditableText
                        tagName="h1"
                        value={workPlan.title || "Plano de Trabalho"}
                        onChange={(val) => updateSlideData('workPlan', { title: val })}
                        className="text-[6vh] font-bold text-white border-b border-white/10"
                        editable={editable}
                    />
                </div>

                {/* Timeline Container */}
                <GlassBox
                    className={`w-full max-w-[1200px] relative p-8 ${isActive ? "animate-slideUp" : "opacity-0"}`}
                >
                    <div style={isActive ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}} className="size-full">

                        {/* Header Row (Weeks & Dots) */}
                        <div className="relative mb-8 pt-8">
                            {/* Connecting Line */}
                            <div className={`absolute bottom-[5px] left-0 right-0 h-[2px] bg-white/10 ${isActive ? "animate-fadeIn" : "opacity-0"}`}
                                style={{ animationDelay: '0.8s' }}
                            />

                            {/* Weeks Grid */}
                            <div className="grid grid-cols-6 relative">
                                {(workPlan.weeks || []).map((week, i) => (
                                    <div key={i} className="flex flex-col items-center relative">
                                        {/* Week Label & Date */}
                                        <div
                                            className={`mb-6 flex flex-col items-center gap-2 ${isActive ? "animate-fadeIn opacity-0" : "opacity-0"}`}
                                            style={isActive ? { animationDelay: `${0.9 + (i * 0.1)}s`, animationFillMode: 'forwards' } : {}}
                                        >
                                            <WeekLabel label={week.label} />
                                            <EditableText
                                                value={week.date}
                                                onChange={(val) => {
                                                    const newWeeks = [...workPlan.weeks];
                                                    newWeeks[i] = { ...newWeeks[i], date: val };
                                                    updateSlideData('workPlan', { weeks: newWeeks });
                                                }}
                                                className="text-[1.2vh] text-gray-400 font-light tracking-wide border-b border-white/10"
                                                editable={editable}
                                            />
                                        </div>

                                        {/* Dot */}
                                        <div
                                            className={`relative z-10 ${isActive ? "animate-scaleIn opacity-0" : "opacity-0"}`}
                                            style={isActive ? { animationDelay: `${1.1 + (i * 0.1)}s`, animationFillMode: 'forwards' } : {}}
                                        >
                                            <SystemDot variant="Azul" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bars Area */}
                        <div className="relative flex flex-col gap-3 min-h-[40vh] py-4">
                            {/* Grid Columns */}
                            <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="border-r border-white/5 last:border-0 h-full" />
                                ))}
                            </div>

                            {(workPlan.phases || []).map((phase: any, index: number) => {
                                const variant: TagVariant = phase.color === 'purple' ? 'Roxo' : 'Azul';

                                // Calculation for positioning
                                const left = `${(phase.start / 6) * 100}%`;
                                const width = `${(phase.width / 6) * 100}%`;

                                return (
                                    <div
                                        key={index}
                                        className={`relative h-[41px] flex items-center ${isActive ? "animate-growRight opacity-0" : "opacity-0"} origin-left`}
                                        style={{
                                            left: left,
                                            width: width,
                                            animationDelay: isActive ? `${1.6 + (index * 0.2)}s` : '0s',
                                            animationFillMode: 'forwards'
                                        }}
                                    >
                                        <div className="w-full h-full relative group/phase">
                                            <Tags
                                                label={phase.label}
                                                variant={variant}
                                                className="w-full h-full shadow-lg"
                                            />
                                            {editable && (
                                                <div className="absolute inset-0 opacity-0 group-hover/phase:opacity-100 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg transition-opacity">
                                                    <EditableText
                                                        value={phase.label}
                                                        onChange={(val) => {
                                                            const newPhases = [...workPlan.phases];
                                                            newPhases[index] = { ...newPhases[index], label: val };
                                                            updateSlideData('workPlan', { phases: newPhases });
                                                        }}
                                                        className="text-white text-xs font-bold"
                                                        editable={editable}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </GlassBox>
            </div>
        </div>
    );
}
