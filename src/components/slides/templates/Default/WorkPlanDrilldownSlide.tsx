import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';
import { Rnd } from 'react-rnd';
import { Bolt, Assignment, CheckCircleOutline, PersonOutline } from '@mui/icons-material';

interface WorkPlanDrilldownSlideProps {
    title?: string;
    subtitle?: string; // used for description/focus
    actions?: string[];
    deliverables?: string[];
    team?: any[]; // Simplified team structure
    className?: string;
    editable?: boolean;
    slideId?: string;
    extraContent?: any[];
}

const ASSETS = {
    IMG_TECH: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop', // Placeholder
};

export default function WorkPlanDrilldownSlide({
    title,
    subtitle,
    actions,
    deliverables,
    team,
    className,
    editable = false,
    slideId,
    extraContent
}: WorkPlanDrilldownSlideProps) {
    const { updateSlideData, updateExtraContent } = useProposal();

    // Default data if not provided
    const displayTitle = title || "Detalhamento da Fase";
    const displaySubtitle = subtitle || "Fase 1: Diagnóstico e Planejamento";
    const displayActions = actions || ["Reunião de Kick-off", "Mapeamento de Processos", "Entrevistas com Stakeholders"];
    const displayDeliverables = deliverables || ["Documento de Visão", "Cronograma Geral", "Matriz de Riscos"];
    // Team structure might vary, keeping it simple for now
    const displayTeam = team || [];

    return (
        <div className={`relative w-full h-full bg-[#000528] overflow-hidden font-poppins ${className}`}>
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={ASSETS.IMG_TECH}
                    alt="Background"
                    className="w-full h-full object-cover opacity-20 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#000528] via-[#000528]/90 to-transparent" />
            </div>

            {/* Header */}
            <div className="absolute top-[8%] left-[6%] z-20 max-w-3xl">
                <EditableText
                    tagName="h2"
                    value={displaySubtitle}
                    onChange={(val) => slideId && updateSlideData(slideId, { subtitle: val })}
                    className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2"
                    editable={editable}
                />
                <EditableText
                    tagName="h1"
                    value={displayTitle}
                    onChange={(val) => slideId && updateSlideData(slideId, { title: val })}
                    className="text-[5vh] font-bold text-white leading-tight"
                    editable={editable}
                />
            </div>

            {/* Content Cards */}
            <div className="absolute top-[25%] left-[6%] right-[6%] bottom-[12%] flex gap-8 z-20">

                {/* 3CON Responsibilities Card */}
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col group hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/50">
                            <Bolt />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Atividades (3CON)</h3>
                            <p className="text-white/40 text-sm">O que faremos nesta etapa</p>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {displayActions.map((action, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                                <EditableText
                                    value={action}
                                    onChange={(val) => {
                                        if (!slideId) return;
                                        const newActions = [...displayActions];
                                        newActions[idx] = val;
                                        updateSlideData(slideId, { actions: newActions });
                                    }}
                                    className="text-white/90 text-lg leading-snug"
                                    editable={editable}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Deliverables Card */}
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col group hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-900/50">
                            <Assignment />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Entregáveis</h3>
                            <p className="text-white/40 text-sm">Documentação e resultados</p>
                        </div>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {displayDeliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors">
                                <CheckCircleOutline className="text-purple-400 text-xl mt-0.5" />
                                <EditableText
                                    value={item}
                                    onChange={(val) => {
                                        if (!slideId) return;
                                        const newItems = [...displayDeliverables];
                                        newItems[idx] = val;
                                        updateSlideData(slideId, { deliverables: newItems });
                                    }}
                                    className="text-white/90 text-lg leading-snug"
                                    editable={editable}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team/Client Roles Card (Smaller) */}
                <div className="w-[20%] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-3xl border border-white/5 p-6 flex flex-col">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <PersonOutline className="text-white/60" /> Equipe
                    </h3>

                    <div className="space-y-6">
                        {/* Static placeholder for now, could be dynamic */}
                        <div>
                            <div className="text-blue-400 text-xs uppercase font-bold tracking-wider mb-2">3CON</div>
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#000528] bg-gray-600 flex items-center justify-center text-xs text-white">
                                        U{i}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-purple-400 text-xs uppercase font-bold tracking-wider mb-2">Cliente</div>
                            <div className="text-white/80 text-sm">
                                <div className="mb-1">• Product Owner</div>
                                <div className="mb-1">• Tech Lead</div>
                            </div>
                        </div>
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
