'use client';

import {
    PlaylistAddCheck,
    Description,
    KeyboardArrowRight
} from '@mui/icons-material';
import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';

interface WorkPlanDrilldownSlideProps {
    className?: string;
    week: any;
    editable?: boolean;
}

export default function WorkPlanDrilldownSlide({
    className,
    week,
    editable = false
}: WorkPlanDrilldownSlideProps) {
    const { data, updateSlideData } = useProposal();

    const handleUpdateWeek = (updates: Partial<typeof week>) => {
        const newWeeklyDetails = data.slides.weeklyDetails.map((w: any) =>
            w.id === week.id ? { ...w, ...updates } : w
        );
        updateSlideData('weeklyDetails', newWeeklyDetails);
    };

    return (
        <div className={`relative w-full h-full overflow-hidden font-poppins bg-[#000528] ${className}`}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
                style={{ backgroundImage: `url('/Semana1_V2.png')` }}
            />

            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center p-4 md:p-12 w-full h-full">
                    <div className="flex flex-col w-full justify-center min-h-full py-4">

                        {/* Header (Figma: top 71px) */}
                        <div className="flex justify-between items-center w-full max-w-[1124px] mx-auto animate-slideDown mb-6 shrink-0 relative z-30">
                            <div className="flex flex-col gap-1 text-white">
                                <EditableText
                                    tagName="h2"
                                    value={week.title}
                                    onChange={(val) => handleUpdateWeek({ title: val })}
                                    className="text-[32px] md:text-[56px] font-bold leading-tight md:leading-[60px] border-b border-white/10"
                                    editable={editable}
                                />
                                <EditableText
                                    tagName="p"
                                    value={week.subtitle}
                                    onChange={(val) => handleUpdateWeek({ subtitle: val })}
                                    className="text-[14px] md:text-[16px] text-gray-200 leading-relaxed md:leading-[28px] border-b border-white/10"
                                    editable={editable}
                                />
                            </div>
                            <div className="hidden md:block px-8 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shrink-0">
                                <span className="text-[20px] font-extrabold text-white tracking-wider uppercase">
                                    Semana {week.id}
                                </span>
                            </div>
                        </div>

                        {/* Content Wrapper */}
                        <div className="flex flex-col xl:flex-row justify-center items-start gap-6 w-full relative z-20 animate-slideUp shrink-0" style={{ animationDelay: '0.2s' }}>

                            {/* Left Column (Ações + Entregável) - 600px fixed max width */}
                            <div className="flex flex-col gap-6 w-full xl:w-[600px] shrink-0 relative z-20">

                                {/* Ações Card */}
                                <div className="relative w-full min-h-[340px] rounded-[24px] bg-[#1d293d]/30 border border-[#314158]/30 overflow-hidden px-[32px] py-[32px] flex flex-col gap-6 box-border">
                                    {/* Header */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shrink-0"
                                            style={{ background: 'linear-gradient(135deg, #ac12e1 0%, #9810fa 100%)' }}>
                                            <PlaylistAddCheck className="text-white text-[24px]" />
                                        </div>
                                        <h3 className="text-[28px] font-bold text-white">Ações</h3>
                                    </div>
                                    {/* List */}
                                    <ul className="flex flex-col gap-3">
                                        {(week.actions || []).map((action: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3 relative">
                                                <KeyboardArrowRight className="text-[#ac12e1] text-[28px] shrink-0 -mt-[1px] -ml-[8px]" />
                                                <EditableText
                                                    value={action}
                                                    onChange={(val) => {
                                                        const newActions = [...week.actions];
                                                        newActions[i] = val;
                                                        handleUpdateWeek({ actions: newActions });
                                                    }}
                                                    className="text-white text-[18px] leading-[26px] font-normal border-b border-white/10 w-full"
                                                    editable={editable}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Entregável Card */}
                                <div className="relative w-full min-h-[160px] rounded-[24px] bg-[#1d293d]/30 border border-[#314158]/30 overflow-hidden px-[32px] py-[32px] flex flex-col gap-6 box-border">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shrink-0"
                                            style={{ background: 'linear-gradient(135deg, #ac12e1 0%, #9810fa 100%)' }}>
                                            <Description className="text-white text-[24px]" />
                                        </div>
                                        <h3 className="text-[28px] font-bold text-white">Entregável</h3>
                                    </div>
                                    <div className="flex items-start gap-4 pl-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#ac12e1] mt-2.5 shrink-0" />
                                        <EditableText
                                            value={week.deliverables?.[0] || ''}
                                            onChange={(val) => {
                                                const newDeliverables = [...(week.deliverables || [])];
                                                newDeliverables[0] = val;
                                                handleUpdateWeek({ deliverables: newDeliverables });
                                            }}
                                            className="text-white text-[18px] leading-[26px] font-normal border-b border-white/10 w-full"
                                            editable={editable}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column (Teams) - 500px fixed max width */}
                            <div className="flex flex-col gap-6 w-full xl:w-[500px] shrink-0 relative z-10">

                                {/* 3CON Team Card (Blue Gradient) */}
                                <div className="relative w-full min-h-[260px] rounded-[24px] px-[32px] py-[32px] flex flex-col gap-6 box-border"
                                    style={{
                                        background: 'linear-gradient(156deg, rgba(0, 184, 219, 0.1) 0%, rgba(21, 93, 252, 0.1) 100%)',
                                        border: '1px solid rgba(0, 184, 219, 0.2)'
                                    }}>
                                    <h3 className="text-[28px] font-bold text-white text-center mb-2">3CON</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(week.team3con || []).map((role: string, i: number) => {
                                            const isLastOdd = i === (week.team3con || []).length - 1 && (week.team3con || []).length % 2 !== 0;
                                            return (
                                                <div key={i} className={`flex items-center justify-center h-[42px] px-[16px] pt-[9px] pb-1 rounded-[12px] bg-white/5 border border-white/10 ${isLastOdd ? 'col-span-2' : ''}`}>
                                                    <EditableText
                                                        value={role}
                                                        onChange={(val) => {
                                                            const newTeam = [...(week.team3con || [])];
                                                            newTeam[i] = val;
                                                            handleUpdateWeek({ team3con: newTeam });
                                                        }}
                                                        className="text-[#cad5e2] text-[16px] leading-[20px] text-center w-full"
                                                        editable={editable}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Tegma Card (Purple Gradient) */}
                                <div className="relative w-full min-h-[160px] rounded-[24px] px-[32px] py-[32px] flex flex-col gap-6 box-border"
                                    style={{
                                        background: 'linear-gradient(164deg, rgba(172, 18, 225, 0.1) 0%, rgba(152, 16, 250, 0.1) 100%)',
                                        border: '1px solid rgba(172, 18, 225, 0.2)'
                                    }}>
                                    <h3 className="text-[28px] font-bold text-white text-center mb-2">Cliente</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(week.teamClient || []).map((role: string, i: number) => (
                                            <div key={i} className="flex items-center justify-center h-[42px] px-[16px] pt-[9px] pb-1 rounded-[12px] bg-white/5 border border-white/10">
                                                <EditableText
                                                    value={role}
                                                    onChange={(val) => {
                                                        const newTeam = [...(week.teamClient || [])];
                                                        newTeam[i] = val;
                                                        handleUpdateWeek({ teamClient: newTeam });
                                                    }}
                                                    className="text-[#cad5e2] text-[16px] leading-[20px] text-center w-full"
                                                    editable={editable}
                                                />
                                            </div>
                                        ))}
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

