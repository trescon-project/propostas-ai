export type ProposalStatus = 'todo' | 'rascunho' | 'em análise' | 'aprovado' | 'reprovado';

export interface Proposal {
    id: string;
    title: string;
    company_name: string;
    custom_url: string;
    status: ProposalStatus;
    content: any; // JSONB
    ai_context?: string;
    date: string;
    last_edited_by_name?: string | null;
    last_edited_at?: string | null;
    last_edited_by?: string | null;
    last_accessed_by_name?: string | null;
    last_accessed_at?: string | null;
    last_accessed_by?: string | null;

    // Joined profiles
    editor_profile?: { full_name: string | null; avatar_url: string | null; email: string | null };
    accessor_profile?: { full_name: string | null; avatar_url: string | null; email: string | null };
    created_at: string;
    updated_at: string;
    user_id: string;
}

export const PROPOSAL_STATUSES: { id: ProposalStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: '#BA55D3' },
    { id: 'rascunho', label: 'Rascunho', color: '#4682B4' },
    { id: 'em análise', label: 'Em Análise', color: '#FFA500' },
    { id: 'aprovado', label: 'Aprovado', color: '#3CB371' },
    { id: 'reprovado', label: 'Reprovado', color: '#B22222' },
];
