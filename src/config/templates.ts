import { ComponentType } from 'react';
import HomeSlide from '@/components/slides/templates/Default/HomeSlide';
import ChallengeSlide from '@/components/slides/templates/Default/ChallengeSlide';
import SolutionSlide from '@/components/slides/templates/Default/SolutionSlide';
import MethodologySlide from '@/components/slides/templates/Default/MethodologySlide';
import WorkPlanSlide from '@/components/slides/templates/Default/WorkPlanSlide';
import WorkPlanDrilldownSlide from '@/components/slides/templates/Default/WorkPlanDrilldownSlide';
import PricingSlide from '@/components/slides/templates/Default/PricingSlide';

// Define the shape of a single slide (matches ProposalContext)
export interface Slide {
    id: string;
    type: string;
    content: any;
    extraContent?: {
        id: string;
        type: 'text' | 'image';
        content: string;
        style?: React.CSSProperties;
    }[];
}

export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
    content: Slide[]; // New structure
    defaultContent: any; // Kept for backward compatibility but likely unused
}

export const templates: TemplateConfig[] = [
    {
        id: 'default',
        name: 'Padrão',
        description: 'Template corporativo padrão com as seções essenciais.',
        content: [
            {
                id: 'slide-home',
                type: 'home',
                content: {
                    title: 'Transformação Digital',
                    subtitle: 'Estratégia para o Futuro',
                }
            },
            {
                id: 'slide-challenge',
                type: 'challenge',
                content: {
                    title: 'O Desafio',
                    description: 'Descrição do desafio atual...',
                    points: ['Ponto de dor 1', 'Ponto de dor 2'],
                }
            },
            {
                id: 'slide-solution',
                type: 'solution',
                content: {
                    title: 'Nossa Solução',
                    description: 'Visão geral da solução proposta...',
                    features: [
                        { title: 'Feature 1', description: 'Detalhes...' },
                    ],
                }
            },
            {
                id: 'slide-methodology',
                type: 'methodology',
                content: {
                    title: 'Nossa Abordagem',
                    steps: [
                        { id: 'discovery', label: 'Discovery', description: 'Análise aprofundada...' },
                        { id: 'definicao', label: 'Definição', description: 'Detalhamento técnico...' },
                        { id: 'desenvolvimento', label: 'Desenvolvimento', description: 'Squads de modernização...' },
                        { id: 'entrega', label: 'Entrega', description: 'Procedimentos de qualidade...' },
                        { id: 'acompanhamento', label: 'Acompanhamento', description: 'Suporte continuado...' },
                    ]
                }
            },
            {
                id: 'slide-workplan',
                type: 'work_plan',
                content: {
                    title: 'Plano de Trabalho',
                    weeks: [
                        { label: 'SEMANA 1', date: '02/02 - 06/02' },
                        { label: 'SEMANA 2', date: '09/02 - 13/02' },
                        { label: 'SEMANA 3', date: '16/02 - 20/02' },
                        { label: 'SEMANA 4', date: '23/02 - 27/02' },
                        { label: 'SEMANA 5', date: '02/03 - 06/03' },
                        { label: 'SEMANA 6', date: '09/03 - 13/03' }
                    ],
                    phases: [
                        { label: 'Imersão', start: 0.1, width: 0.8, color: 'purple' },
                        { label: 'AS IS Técnico', start: 1.1, width: 1.4, color: 'blue' },
                        { label: 'AS IS de Negócio', start: 1.1, width: 2.8, color: 'purple' },
                    ]
                }
            },
            {
                id: 'slide-weekly-1',
                type: 'work_plan_drilldown',
                content: {
                    id: 1,
                    title: 'Discovery & Imersão',
                    subtitle: 'Entendimento do cenário atual e objetivos',
                    actions: ['Reunião de Kick-off', 'Análise de documentação'],
                    deliverables: ['Plano de Projeto'],
                    team3con: ['Gerente de Projeto', 'Arquiteto'],
                    teamClient: ['PO', 'Stakeholders']
                }
            },
            {
                id: 'slide-pricing',
                type: 'pricing',
                content: {
                    totalValue: 'R$ 294.102,03',
                    features: ['Time Expert', '6 Semanas'],
                    deliverables: [
                        { title: 'Documento AS IS', description: 'Análise completa' },
                        { title: 'Visão TO BE', description: 'Roadmap detalhado' },
                        { title: 'Proposta Executiva', description: 'Passos futuros' },
                    ],
                }
            }
        ],
        defaultContent: {}
    }
];

export const getTemplateFn = (id: string) => templates.find(t => t.id === id) || templates[0];
