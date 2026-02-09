'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    Search,
    Architecture,
    Code,
    RocketLaunch,
    TrendingUp,
    ArrowBackIosNew,
    ArrowForwardIos
} from '@mui/icons-material';
import { Titulo } from '@/components/ui/Titulo';
import { Tags, TagVariant } from '@/components/ui/Tags';

const STEPS = [
    {
        id: 'discovery',
        label: 'Discovery',
        tag: 'Definição de Estratégia',
        tagVariant: 'Roxo' as TagVariant,
        description: 'Análise aprofundada no ecossistema atual do projeto, mapeamento do AS IS funcional e operacional, identificar pontos de fricção e definir um roadmap estruturado.',
        icon: Search,
        steps: [
            ['Pesquisa', 'Analytics', 'Jornadas'],
            ['Entrevistas', 'Personas', 'Roadmap']
        ],
        color: '#ac12e1'
    },
    {
        id: 'definicao',
        label: 'Definição',
        tag: 'Arquitetura & Planejamento',
        tagVariant: 'Azul' as TagVariant,
        description: 'Detalhamento técnico e visual da solução. Criação de protótipos de alta fidelidade e especificação da arquitetura de sistemas para garantir viabilidade e alinhamento.',
        icon: Architecture,
        steps: [
            ['Wireframes', 'UI Design', 'Prototipagem'],
            ['Modelo de Dados', 'API Specs', 'Tech Stack']
        ],
        color: '#0b95da'
    },
    {
        id: 'desenvolvimento',
        label: 'Desenvolvimento',
        tag: 'Construção de Solução',
        tagVariant: 'Azul' as TagVariant,
        description: 'Squads de modernização atuando em ciclos curtos de entrega e implementação para o negócio, garantindo agilidade e qualidade.',
        icon: Code,
        steps: [
            ['Arquitetura', 'Sprints', 'Testes'],
            ['Feedbacks', 'Deploy', 'Entregas']
        ],
        color: '#0b95da'
    },
    {
        id: 'entrega',
        label: 'Entrega',
        tag: 'Homologação & Go-Live',
        tagVariant: 'Roxo' as TagVariant,
        description: 'Procedimentos de qualidade (QA), validação final com usuários chave (UAT) e execução do plano de deploy para produção com minimização de riscos.',
        icon: RocketLaunch,
        steps: [
            ['QA', 'UAT', 'Treinamento'],
            ['Cutover', 'Monitoramento', 'Documentação']
        ],
        color: '#ac12e1'
    },
    {
        id: 'acompanhamento',
        label: 'Acompanhamento',
        tag: 'Evolução Contínua',
        tagVariant: 'Azul' as TagVariant,
        description: 'Suporte continuado, análise de performance e planejamento de melhorias futuras para maximizar o ROI e a satisfação do usuário.',
        icon: TrendingUp,
        steps: [
            ['Suporte N2/N3', 'SLAs', 'Performance'],
            ['Analytics', 'Novos Recursos', 'Atualizações']
        ],
        color: '#0b95da'
    }
];

const ASSETS = {
    BG_VIDEO: '/assets/methodology-bg.mp4'
};

import { useProposal } from '@/contexts/ProposalContext';
import EditableText from '@/components/ui/EditableText';

interface MethodologySlideProps {
    className?: string;
    editable?: boolean;
}

export default function MethodologySlide({
    className,
    editable = false
}: MethodologySlideProps) {
    const { data, updateSlideData } = useProposal();
    const { methodology } = data.slides;

    return (
        <div className={`relative w-full h-full overflow-hidden font-poppins bg-[#000528] ${className}`}>
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                >
                    <source src={ASSETS.BG_VIDEO} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#000528] via-transparent to-[#000528]" />
            </div>

            {/* Header */}
            <div className="absolute top-[8%] left-[6%] z-20">
                <EditableText
                    tagName="h1"
                    value={methodology.title}
                    onChange={(val) => updateSlideData('methodology', { title: val })}
                    className="text-[6vh] font-bold text-white border-b border-white/10"
                    editable={editable}
                />
            </div>

            {/* Content Swiper */}
            <div className="absolute top-[25%] bottom-[15%] left-[5%] right-[5%] z-20">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    centeredSlides={true}
                    onBeforeInit={(swiper) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        swiper.params.navigation.prevEl = '.swiper-button-prev-custom';
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        swiper.params.navigation.nextEl = '.swiper-button-next-custom';
                    }}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    pagination={false}
                    breakpoints={{
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                            centeredSlides: false
                        }
                    }}
                    className="w-full h-full !overflow-visible"
                >
                    {(methodology.steps || []).map((stepData, index) => {
                        // Merge with static config to keep icons/colors
                        const staticStep = STEPS[index] || STEPS[0];
                        const StepIcon = staticStep.icon;
                        const isPurple = staticStep.tagVariant === 'Roxo';

                        // Use dynamic data if available, fallback to static
                        const label = stepData.label || staticStep.label;
                        const description = stepData.description || staticStep.description;
                        const color = staticStep.color;

                        return (
                            <SwiperSlide key={stepData.id || index} className="h-full">
                                <div className="relative h-full bg-[#131525]/80 backdrop-blur-md rounded-[32px] overflow-hidden border border-white/10 group hover:border-white/20 transition-all p-10 flex flex-col">
                                    {/* Top Glow/Line */}
                                    <div
                                        className="absolute top-0 left-0 w-full h-1"
                                        style={{
                                            background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
                                            boxShadow: `0 0 20px 2px ${color}`
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 w-full h-[2px]"
                                        style={{ background: color }}
                                    />

                                    {/* Header Section */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}
                                                style={{
                                                    background: isPurple ? 'linear-gradient(135deg, #ac12e1 0%, #7f279d 100%)' : 'linear-gradient(135deg, #0b95da 0%, #5dc9ff 100%)',
                                                    boxShadow: `0 4px 20px ${color}60`
                                                }}
                                            >
                                                <StepIcon className="text-white text-[3vh]" />
                                            </div>
                                            <EditableText
                                                tagName="h3"
                                                value={label}
                                                onChange={(val) => {
                                                    const newSteps = [...methodology.steps];
                                                    newSteps[index] = { ...newSteps[index], label: val };
                                                    updateSlideData('methodology', { steps: newSteps });
                                                }}
                                                className="text-[4vh] font-bold text-white border-b border-white/10"
                                                editable={editable}
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 font-mono text-sm">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Tag */}
                                    <div className="mb-8">
                                        <Tags label={staticStep.tag} variant={staticStep.tagVariant} className="inline-flex" />
                                    </div>

                                    {/* Description */}
                                    <div className="text-[2vh] text-gray-300 leading-relaxed mb-6">
                                        <EditableText
                                            tagName="p"
                                            value={description}
                                            onChange={(val) => {
                                                const newSteps = [...methodology.steps];
                                                newSteps[index] = { ...newSteps[index], description: val };
                                                updateSlideData('methodology', { steps: newSteps });
                                            }}
                                            className="border-b border-white/10"
                                            editable={editable}
                                        />
                                    </div>

                                    {/* Bullets - Using static sub-steps for now as structure might differ */}
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/5 pt-6">
                                        {staticStep.steps[0].map((item, i) => (
                                            <div key={`col1-${i}`} className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                                                <span className="text-gray-300 text-[2vh] font-medium">{item}</span>
                                            </div>
                                        ))}
                                        {staticStep.steps[1].map((item, i) => (
                                            <div key={`col2-${i}`} className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                                                <span className="text-gray-300 text-[2vh] font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            {/* Navigation Buttons (Custom) - Top Right */}
            <div className="absolute top-[8%] right-[6%] z-30 flex items-center gap-4">
                <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer">
                    <ArrowBackIosNew sx={{ fontSize: 20 }} />
                </button>
                <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer">
                    <ArrowForwardIos sx={{ fontSize: 20 }} />
                </button>
            </div>
        </div>
    );
}
