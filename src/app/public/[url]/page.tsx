import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PublicProposalView from './PublicProposalView'
import { ProposalProvider } from '@/contexts/ProposalContext'

export default async function PublicPage({ params }: { params: Promise<{ url: string }> }) {
    const { url } = await params;
    const supabase = await createClient()

    const { data: proposal, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('custom_url', url)
        .single()

    if (error || !proposal) {
        notFound()
    }

    const proposalData = {
        meta: {
            title: proposal.title,
            companyName: proposal.company_name,
            customUrl: proposal.custom_url,
            date: proposal.date,
            status: proposal.status
        },
        slides: proposal.content as any,
        aiContext: proposal.ai_context || ''
    }

    return (
        <ProposalProvider initialData={proposalData}>
            <PublicProposalView />
        </ProposalProvider>
    )
}
