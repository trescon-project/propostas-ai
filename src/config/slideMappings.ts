import HomeSlide from '@/components/slides/templates/Default/HomeSlide';
import ChallengeSlide from '@/components/slides/templates/Default/ChallengeSlide';
import SolutionSlide from '@/components/slides/templates/Default/SolutionSlide';
import WorkPlanDrilldownSlide from '@/components/slides/templates/Default/WorkPlanDrilldownSlide';
import PricingSlide from '@/components/slides/templates/Default/PricingSlide';
import HistorySlide from '@/components/slides/templates/Default/HistorySlide';
import InitialFlowsSlide from '@/components/slides/templates/Default/InitialFlowsSlide';

export const SLIDE_COMPONENTS: Record<string, React.ComponentType<any>> = {
    home: HomeSlide,
    challenge: ChallengeSlide,
    solution: SolutionSlide,
    work_plan_drilldown: WorkPlanDrilldownSlide,
    pricing: PricingSlide,
    history: HistorySlide,
    initial_flows: InitialFlowsSlide,
};

export const SLIDE_LABELS: Record<string, string> = {
    home: 'Capa',
    history: 'História',
    challenge: 'Desafio',
    solution: 'Solução',
    work_plan_drilldown: 'Plano Detalhado',
    initial_flows: 'Fluxos',
    pricing: 'Investimento',
};

export const SLIDE_DEFAULTS: Record<string, any> = {
    home: {
        title: 'Nome da Proposta',
        subtitle: 'Subtítulo da Proposta',
    },
    history: {
        title: 'Nossa História',
        text: 'Acreditamos que a tecnologia deve servir às pessoas.\n\nFundada com a missão de transformar negócios através da inovação, nossa empresa tem orgulho de entregar resultados expressivos.',
    },
    challenge: {
        title: 'O Desafio',
        description: 'Descreva aqui o cenário atual e os principais desafios enfrentados.',
        points: ['Ponto de dor 1', 'Ponto de dor 2', 'Ponto de dor 3'],
    },
    solution: {
        title: 'Nossa Solução',
        description: 'Apresente a visão geral da solução proposta para resolver os desafios.',
        features: [
            { title: 'Característica 1', description: 'Benefício desta característica.' },
            { title: 'Característica 2', description: 'Benefício desta característica.' },
        ],
    },
    work_plan_drilldown: {
        id: 1,
        title: 'Detalhamento da Fase',
        subtitle: 'Descrição das atividades',
        actions: ['Atividade 1', 'Atividade 2'],
        deliverables: ['Entregável 1'],
        team3con: ['Consultor'],
        teamClient: ['PO'],
    },
    initial_flows: {},
    pricing: {
        totalValue: 'R$ 0,00',
        features: ['Item 1', 'Item 2'],
        deliverables: [
            { title: 'Entregável Principal', description: 'Descrição do valor entregue.' },
        ],
    },
};
