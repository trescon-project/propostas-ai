import { ComponentType } from 'react';
import HomeSlide from '@/components/slides/templates/Default/HomeSlide';
import ChallengeSlide from '@/components/slides/templates/Default/ChallengeSlide';
import SolutionSlide from '@/components/slides/templates/Default/SolutionSlide';
import MethodologySlide from '@/components/slides/templates/Default/MethodologySlide';
import WorkPlanSlide from '@/components/slides/templates/Default/WorkPlanSlide';
import WorkPlanDrilldownSlide from '@/components/slides/templates/Default/WorkPlanDrilldownSlide';
import PricingSlide from '@/components/slides/templates/Default/PricingSlide';

export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    thumbnail?: string;
    slides: {
        component: ComponentType<any>;
        name: string; // Internal name for logic/keys if needed
        drilldownKey?: string; // Key in data.slides to map over (e.g., 'weeklyDetails')
    }[];
    defaultContent: any;
}

export const templates: TemplateConfig[] = [
    {
        id: 'default',
        name: 'Padrão',
        description: 'Template corporativo padrão com as seções essenciais.',
        slides: [
            { component: HomeSlide, name: 'home' },
            { component: ChallengeSlide, name: 'challenge' },
            { component: SolutionSlide, name: 'solution' },
            { component: MethodologySlide, name: 'methodology' },
            { component: WorkPlanSlide, name: 'work_plan' },
            { component: WorkPlanDrilldownSlide, name: 'work_plan_drilldown', drilldownKey: 'weeklyDetails' },
            { component: PricingSlide, name: 'pricing' }
        ],
        defaultContent: {} // Values are handled by ProposalContext specific logic for now
    }
];

export const getTemplateFn = (id: string) => templates.find(t => t.id === id) || templates[0];
