'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SLIDE_DEFAULTS } from '@/config/slideMappings';

// Define the shape of a single slide
export interface Slide {
    id: string;
    type: string; // e.g., 'home', 'challenge', 'generic'
    content: any;
    extraContent?: {
        id: string;
        type: 'text' | 'image';
        content: string;
        style?: React.CSSProperties & { x?: number; y?: number };
    }[];
}

// Define the shape of the proposal data
export interface ProposalData {
    id?: string;
    user_id?: string;
    meta: {
        title: string;
        customUrl: string;
        companyName: string;
        date: string;
        status: string;
    };
    slides: Slide[];
    aiContext: string;
}

// Default initial state
const defaultProposalData: ProposalData = {
    meta: {
        title: 'Transformação Digital 2024',
        customUrl: `proposta-${new Date().getTime()}`,
        companyName: 'Acme Corp',
        date: '08/02/2026',
        status: 'rascunho',
    },
    slides: [
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
    aiContext: '',
};

interface ProposalContextType {
    data: ProposalData;
    updateData: (newData: Partial<ProposalData>) => void;
    updateSlideData: (slideId: string, newData: any) => void;
    updateMeta: (key: keyof ProposalData['meta'], value: string) => void;

    addSlide: (type: Slide['type'], index?: number, initialContent?: any) => void;
    removeSlide: (slideId: string) => void;
    duplicateSlide: (slideId: string) => void;
    moveSlide: (dragIndex: number, hoverIndex: number) => void;
    addExtraContent: (slideId: string, type: 'text') => void;
    updateExtraContent: (slideId: string, contentId: string, content: string) => void;
    updateExtraContentPosition: (slideId: string, contentId: string, x: number, y: number) => void;
    removeExtraContent: (slideId: string, contentId: string) => void;

    setAiContext: (context: string) => void;
    saveToSupabase: () => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export function ProposalProvider({
    children,
    initialData
}: {
    children: ReactNode;
    initialData?: ProposalData;
}) {
    const [data, setData] = useState<ProposalData>(() => {
        // Handle migration from old format if initialData is provided but has old structure
        if (initialData && !Array.isArray(initialData.slides)) {
            console.warn("Migrating old proposal data structure...");
            // Use default because migrating logic is complex and best handled by a proper transformation function 
            // or just accepting that old drafts might reset to default structure for this refactor
            return defaultProposalData;
        }
        return initialData || defaultProposalData;
    });
    const [isLoading, setIsLoading] = useState(false);

    const updateData = (newData: Partial<ProposalData>) => {
        setData((prev) => ({ ...prev, ...newData }));
    };

    const updateSlideData = (slideId: string, newData: any) => {
        setData((prev) => ({
            ...prev,
            slides: prev.slides.map(slide =>
                slide.id === slideId
                    ? { ...slide, content: { ...slide.content, ...newData } }
                    : slide
            ),
        }));
    };

    const addSlide = (type: Slide['type'], index?: number, initialContent?: any) => {
        const newSlide: Slide = {
            id: `slide-${type}-${Date.now()}`,
            type,
            content: initialContent || SLIDE_DEFAULTS[type] || {},
        };

        setData(prev => {
            const newSlides = [...prev.slides];
            if (typeof index === 'number') {
                newSlides.splice(index, 0, newSlide);
            } else {
                newSlides.push(newSlide);
            }
            return { ...prev, slides: newSlides };
        });
    };

    const removeSlide = (slideId: string) => {
        setData(prev => ({
            ...prev,
            slides: prev.slides.filter(s => s.id !== slideId)
        }));
    };

    const duplicateSlide = (slideId: string) => {
        setData(prev => {
            const index = prev.slides.findIndex(s => s.id === slideId);
            if (index === -1) return prev;

            const original = prev.slides[index];
            const duplicate: Slide = {
                ...original,
                id: `slide-${original.type}-${Date.now()}`,
                content: JSON.parse(JSON.stringify(original.content)), // Deep copy content
                extraContent: original.extraContent ? JSON.parse(JSON.stringify(original.extraContent)) : undefined
            };

            const newSlides = [...prev.slides];
            newSlides.splice(index + 1, 0, duplicate);
            return { ...prev, slides: newSlides };
        });
    };

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
        setData(prev => {
            const newSlides = [...prev.slides];
            const [draggedItem] = newSlides.splice(dragIndex, 1);
            newSlides.splice(hoverIndex, 0, draggedItem);
            return { ...prev, slides: newSlides };
        });
    };


    const addExtraContent = (slideId: string, type: 'text') => {
        setData(prev => ({
            ...prev,
            slides: prev.slides.map(slide => {
                if (slide.id !== slideId) return slide;

                const newExtra = {
                    id: `extra-${Date.now()}`,
                    type,
                    content: 'Novo texto...',
                    style: { x: 100, y: 100 } // Default position
                };

                return {
                    ...slide,
                    extraContent: [...(slide.extraContent || []), newExtra]
                };
            })
        }));
    };

    const updateExtraContent = (slideId: string, contentId: string, content: string) => {
        setData(prev => ({
            ...prev,
            slides: prev.slides.map(slide => {
                if (slide.id !== slideId) return slide;

                return {
                    ...slide,
                    extraContent: (slide.extraContent || []).map(item =>
                        item.id === contentId ? { ...item, content } : item
                    )
                };
            })
        }));
    };

    const updateExtraContentPosition = (slideId: string, contentId: string, x: number, y: number) => {
        setData(prev => ({
            ...prev,
            slides: prev.slides.map(slide => {
                if (slide.id !== slideId) return slide;

                return {
                    ...slide,
                    extraContent: (slide.extraContent || []).map(item =>
                        item.id === contentId ? { ...item, style: { ...item.style, x, y } } : item
                    )
                };
            })
        }));
    };

    const removeExtraContent = (slideId: string, contentId: string) => {
        setData(prev => ({
            ...prev,
            slides: prev.slides.map(slide => {
                if (slide.id !== slideId) return slide;

                return {
                    ...slide,
                    extraContent: (slide.extraContent || []).filter(item => item.id !== contentId)
                };
            })
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

    const saveToSupabase = async () => {
        setIsLoading(true);
        try {
            // This would be a server action or direct client call
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Falha ao salvar' };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProposalContext.Provider value={{
            data,
            updateData,
            updateSlideData,
            updateMeta,
            setAiContext,
            saveToSupabase,
            isLoading,
            addSlide,
            removeSlide,
            duplicateSlide,
            moveSlide,
            addExtraContent,
            updateExtraContent,
            updateExtraContentPosition,
            removeExtraContent
        }}>
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
