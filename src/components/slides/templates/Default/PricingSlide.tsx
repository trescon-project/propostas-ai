import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';
import { Rnd } from 'react-rnd';
import { Check, VerifiedUser } from '@mui/icons-material';

interface PricingSlideProps {
    title?: string; // usually "Investimento"
    totalValue?: string;
    features?: string[];
    deliverables?: string[]; // If we want to override deliverables
    className?: string;
    editable?: boolean;
    slideId?: string;
    extraContent?: any[];
}

export default function PricingSlide({
    title,
    totalValue,
    features,
    deliverables, // Added this prop just in case, though logically it might be Complex
    className,
    editable = false,
    slideId,
    extraContent
}: PricingSlideProps) {
    const { updateSlideData, updateExtraContent } = useProposal();

    const displayTitle = title || "Investimento";
    const displayTotalValue = totalValue || "R$ 0,00";
    const displayFeatures = features || [
        "Gestão completa do projeto",
        "Equipe multidisciplinar",
        "Suporte e garantia de 3 meses"
    ];
    // Deliverables were static in the previous component, let's keep them static or partially editable via features
    // The previous code had a hardcoded list of deliverables. 
    // Let's stick to the structure: Left side (features/deliverables summary), Right side (Value).

    return (
        <div className={`relative w-full h-full bg-white overflow-hidden font-poppins ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }} />
            </div>

            {/* Header */}
            <div className="absolute top-[8%] left-[6%] z-20">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Proposta Comercial</span>
                    <div className="h-[1px] w-20 bg-blue-600/30"></div>
                </div>
                <EditableText
                    tagName="h1"
                    value={displayTitle}
                    onChange={(val) => slideId && updateSlideData(slideId, { title: val })}
                    className="text-[5vh] font-bold text-gray-900 leading-tight"
                    editable={editable}
                />
            </div>

            {/* Content Container */}
            <div className="absolute top-[20%] left-[6%] right-[6%] bottom-[10%] flex gap-12 z-20">
                {/* Left Column: Deliverables & Benefits */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-blue-500/10" />

                        <h3 className="text-[2.5vh] font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            O que está incluso
                        </h3>

                        <div className="space-y-4">
                            {displayFeatures.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-4 group/item">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1 group-hover/item:bg-blue-600 transition-colors">
                                        <Check className="text-blue-600 text-xs group-hover/item:text-white transition-colors" />
                                    </div>
                                    <EditableText
                                        value={feature}
                                        onChange={(val) => {
                                            if (!slideId) return;
                                            const newFeatures = [...displayFeatures];
                                            newFeatures[idx] = val;
                                            updateSlideData(slideId, { features: newFeatures });
                                        }}
                                        className="text-[2vh] text-gray-600 font-medium pt-0.5 border-b border-gray-200"
                                        editable={editable}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Static Deliverables List (Optional or could be part of features) */}
                        <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
                            {['Kick-off', 'Protótipos', 'Desenvolvimento', 'Testes', 'Homologação', 'Deploy'].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Investment Value */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="relative bg-gradient-to-br from-[#000528] to-[#1a237e] rounded-3xl p-10 text-white shadow-2xl overflow-hidden text-center group">
                        {/* Background Effects */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10 animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>

                        <div className="relative z-10 flex flex-col items-center">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium tracking-wider mb-8">
                                INVESTIMENTO TOTAL
                            </span>

                            <div className="relative mb-8">
                                <EditableText
                                    value={displayTotalValue}
                                    onChange={(val) => slideId && updateSlideData(slideId, { totalValue: val })}
                                    className="text-[7vh] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200"
                                    editable={editable}
                                />
                                <div className="text-blue-200/60 text-sm mt-2">Pagamento faturado em 30/60/90 dias</div>
                            </div>

                            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/50 transition-all hover:scale-105 active:scale-95 w-full max-w-xs">
                                Aprovar Proposta
                            </button>

                            <p className="mt-6 text-sm text-white/40 max-w-xs mx-auto text-center">
                                *Valores válidos por 15 dias. Impostos inclusos.
                            </p>
                        </div>
                    </div>

                    {/* Guarantee Badge */}
                    <div className="mt-8 flex items-center justify-center gap-4 text-gray-500">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <VerifiedUser className="text-green-600" />
                        </div>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Garantia de Entrega</div>
                            <div>Compromisso com prazos e qualidade</div>
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
