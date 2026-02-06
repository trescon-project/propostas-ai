'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the proposal data
export interface ProposalData {
    meta: {
        title: string;
        customUrl: string;
        companyName: string;
    };
    slides: {
        home: {
            title: string;
            subtitle: string;
        };
        challenge: {
            title: string;
            description: string;
            points: string[];
        };
        solution: {
            title: string;
            description: string;
            features: { title: string; description: string }[];
        };
        pricing: {
            totalValue: string;
            features: string[];
            deliverables: { title: string; description: string }[];
        };
        methodology: {
            title: string;
            steps: { id: string; label: string; description: string }[];
        };
        workPlan: {
            title: string;
            phases: { label: string; start: number; width: number; color: string }[];
            weeks: { label: string; date: string }[];
        };
        weeklyDetails: {
            id: number;
            title: string;
            subtitle: string;
            actions: string[];
            deliverables: string[];
            team3con: string[];
            teamClient: string[];
        }[];
    };
    aiContext: string;
}

// Default initial state
const defaultProposalData: ProposalData = {
    meta: {
        title: 'Transformação Digital 2024',
        customUrl: 'transformacao-digital',
        companyName: 'Acme Corp',
    },
    slides: {
        home: {
            title: 'Transformação Digital',
            subtitle: 'Estratégia para o Futuro',
        },
        challenge: {
            title: 'O Desafio',
            description: 'Descrição do desafio atual...',
            points: ['Ponto de dor 1', 'Ponto de dor 2'],
        },
        solution: {
            title: 'Nossa Solução',
            description: 'Visão geral da solução proposta...',
            features: [
                { title: 'Feature 1', description: 'Detalhes...' },
            ],
        },
        pricing: {
            totalValue: 'R$ 294.102,03',
            features: ['Time Expert', '6 Semanas'],
            deliverables: [
                { title: 'Documento AS IS', description: 'Análise completa' },
                { title: 'Visão TO BE', description: 'Roadmap detalhado' },
                { title: 'Proposta Executiva', description: 'Passos futuros' },
            ],
        },
        methodology: {
            title: 'Nossa Abordagem',
            steps: [
                { id: 'discovery', label: 'Discovery', description: 'Análise aprofundada...' },
                { id: 'definicao', label: 'Definição', description: 'Detalhamento técnico...' },
                { id: 'desenvolvimento', label: 'Desenvolvimento', description: 'Squads de modernização...' },
                { id: 'entrega', label: 'Entrega', description: 'Procedimentos de qualidade...' },
                { id: 'acompanhamento', label: 'Acompanhamento', description: 'Suporte continuado...' },
            ]
        },
        workPlan: {
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
        },
        weeklyDetails: [
            {
                id: 1,
                title: 'Discovery & Imersão',
                subtitle: 'Entendimento do cenário atual e objetivos',
                actions: ['Reunião de Kick-off', 'Análise de documentação'],
                deliverables: ['Plano de Projeto'],
                team3con: ['Gerente de Projeto', 'Arquiteto'],
                teamClient: ['PO', 'Stakeholders']
            },
            // Add more default weeks as needed
        ]
    },
    aiContext: '', // Input from the sidebar
};

interface ProposalContextType {
    data: ProposalData;
    updateData: (newData: Partial<ProposalData>) => void;
    updateSlideData: (slideKey: keyof ProposalData['slides'], newData: any) => void;
    updateMeta: (key: keyof ProposalData['meta'], value: string) => void;
    setAiContext: (context: string) => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export function ProposalProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<ProposalData>(defaultProposalData);

    const updateData = (newData: Partial<ProposalData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const updateSlideData = (slideKey: keyof ProposalData['slides'], newData: any) => {
        setData((prev) => ({
            ...prev,
            slides: {
                ...prev.slides,
                [slideKey]: {
                    ...prev.slides[slideKey],
                    ...newData,
                },
            },
        }));
    };

    const updateMeta = (key: keyof ProposalData['meta'], value: string) => {
        setData((prev) => ({
            ...prev,
            meta: {
                ...prev.meta,
                [key]: value,
            },
        }));
    };

    const setAiContext = (context: string) => {
        setData((prev) => ({ ...prev, aiContext: context }));
    };

    return (
        <ProposalContext.Provider value={{ data, updateData, updateSlideData, updateMeta, setAiContext }}>
            {children}
        </ProposalContext.Provider>
    );
}

export function useProposal() {
    const context = useContext(ProposalContext);
    if (context === undefined) {
        throw new Error('useProposal must be used within a ProposalProvider');
    }
    return context;
}
