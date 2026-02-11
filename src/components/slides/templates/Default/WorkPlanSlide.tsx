import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';
import { Rnd } from 'react-rnd';
import { CalendarToday } from '@mui/icons-material';

interface WorkPlanSlideProps {
    title?: string;
    weeks?: any[];
    className?: string;
    editable?: boolean;
    slideId?: string;
    extraContent?: any[];
}

const WEEKS_DATA = [
    { id: '1', title: 'Fase 1: Diagnóstico', mainActivity: 'Entendimento do cenário' },
    { id: '2', title: 'Fase 2: Planejamento', mainActivity: 'Definição de estratégias' },
    { id: '3', title: 'Fase 3: Execução', mainActivity: 'Implementação das soluções' },
    // ... more sample data
];

export default function WorkPlanSlide({
    title,
    weeks,
    className,
    editable = false,
    slideId,
    extraContent
}: WorkPlanSlideProps) {
    const { updateSlideData, updateExtraContent } = useProposal();

    const displayTitle = title || "Plano de Trabalho";
    const displayWeeks = weeks || WEEKS_DATA;

    // Helper to calculate total duration in days (approx)
    const getTotalDuration = () => {
        const lastWeek = displayWeeks[displayWeeks.length - 1];
        if (!lastWeek) return 0;
        // Simple logic assuming sequential weeks
        return displayWeeks.length * 5; // 5 days per week
    };

    return (
        <div className={`relative w-full h-full bg-white overflow-hidden font-poppins ${className}`}>
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gray-50 skew-x-[-10deg] translate-x-[20%] z-0" />

            {/* Header */}
            <div className="absolute top-[8%] left-[6%] z-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full mb-4">
                    <CalendarToday className="text-blue-600 text-sm" />
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">Cronograma Executivo</span>
                </div>
                <EditableText
                    tagName="h1"
                    value={displayTitle}
                    onChange={(val) => slideId && updateSlideData(slideId, { title: val })}
                    className="text-[5vh] font-bold text-gray-900 leading-tight"
                    editable={editable}
                />
            </div>

            {/* Timeline Container */}
            <div className="absolute top-[25%] left-[6%] right-[6%] bottom-[10%] z-20 flex flex-col">
                {/* Timeline Header (Months/Weeks) */}
                <div className="flex border-b border-gray-200 pb-4 mb-4">
                    <div className="w-[20%] text-gray-400 text-sm font-medium uppercase tracking-wider">Fases do Projeto</div>
                    <div className="flex-1 grid grid-cols-12 gap-1 text-center">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="text-xs text-gray-400 font-mono">
                                Sem {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weeks/Phases Rows */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {displayWeeks.map((week, index) => {
                        // Calculate start/width based on index (simplified logic for visual demo)
                        // In a real app this would come from date ranges
                        const startCol = index * 2 + 1;
                        const span = 2; // e.g. 2 weeks duration

                        return (
                            <div key={week.id || index} className="group flex items-center py-3 hover:bg-gray-50 rounded-xl transition-colors px-2">
                                {/* Phase Info */}
                                <div className="w-[20%] pr-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index % 2 === 0 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <EditableText
                                            value={week.title}
                                            onChange={(val) => {
                                                if (!slideId) return;
                                                const newWeeks = [...displayWeeks];
                                                newWeeks[index] = { ...newWeeks[index], title: val };
                                                updateSlideData(slideId, { weeks: newWeeks });
                                            }}
                                            className="font-bold text-gray-900 text-[1.8vh]"
                                            editable={editable}
                                        />
                                    </div>
                                    <EditableText
                                        value={week.mainActivity || "Atividade Principal"}
                                        onChange={(val) => {
                                            if (!slideId) return;
                                            const newWeeks = [...displayWeeks];
                                            newWeeks[index] = { ...newWeeks[index], mainActivity: val };
                                            updateSlideData(slideId, { weeks: newWeeks });
                                        }}
                                        className="text-xs text-gray-500 line-clamp-2 pl-11"
                                        editable={editable}
                                    />
                                </div>

                                {/* Timeline Bar */}
                                <div className="flex-1 relative h-12 bg-gray-100/50 rounded-lg overflow-hidden border border-gray-100">
                                    <div className="absolute inset-0 grid grid-cols-12 gap-1 pointer-events-none">
                                        {Array.from({ length: 12 }).map((_, i) => (
                                            <div key={i} className="border-r border-gray-200/50 h-full" />
                                        ))}
                                    </div>

                                    {/* Simple Bar Visualization */}
                                    {/* This is a visual approximation. Real impl needs real dates */}
                                    <div
                                        className={`absolute top-2 bottom-2 rounded-md shadow-sm flex items-center px-3 text-xs font-medium text-white transition-all hover:scale-[1.02]`}
                                        style={{
                                            left: `${(index * (100 / 6))}%`, // roughly 6 phases max visible? Or just mapping index to %
                                            width: '25%', // fixed width 
                                            background: index % 2 === 0 ? 'linear-gradient(90deg, #2563eb, #3b82f6)' : 'linear-gradient(90deg, #9333ea, #a855f7)'
                                        }}
                                    >
                                        <span className="truncate drop-shadow-md">Execução</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Footer Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-blue-500" /> Planejamento
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-purple-500" /> Execução
                        </div>
                    </div>
                    <div>
                        Estimativa Total: <span className="font-bold text-gray-900">~12 Semanas</span>
                    </div>
                </div>
            </div>

            {/* Render Extra Content (Draggable Texts) */}
            {extraContent?.map((item) => (
                <Rnd
                    key={item.id}
                    default={{
                        x: 0,
                        y: 0,
                        width: 300,
                        height: 50
                    }}
                    position={item.style?.position || { x: 100, y: 100 }}
                    onDragStop={(e, d) => {
                        // Update position logic would go here if we stored x/y in structure
                    }}
                    bounds="parent"
                    enableResizing={false}
                    className="z-50"
                >
                    <div className="relative group">
                        <EditableText
                            value={item.content}
                            onChange={(val) => slideId && updateExtraContent(slideId, item.id, val)}
                            className="text-white text-xl font-bold bg-black/50 p-2 rounded backdrop-blur-sm border border-white/10"
                            editable={editable}
                        />
                    </div>
                </Rnd>
            ))}
        </div>
    );
}
