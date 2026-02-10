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
    { id: 'todo', label: 'To Do', color: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30' },
    { id: 'rascunho', label: 'Rascunho', color: 'bg-gray-500/20 text-gray-300 border-gray-500/30' },
    { id: 'em análise', label: 'Em Análise', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'aprovado', label: 'Aprovado', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'reprovado', label: 'Reprovado', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
];
