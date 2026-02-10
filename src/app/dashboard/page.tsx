import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { ProposalCard } from '@/components/dashboard/ProposalCard'
import { KanbanBoard } from '@/components/dashboard/KanbanBoard'
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: proposals, error } = await supabase
        .from('proposals')
        .select(`
            *,
            editor_profile:profiles!last_edited_by(full_name, avatar_url, email),
            accessor_profile:profiles!last_accessed_by(full_name, avatar_url, email)
        `)
        .order('updated_at', { ascending: false })

    if (error) {
        console.error('Error fetching proposals:', JSON.stringify(error, null, 2))
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Background Video Layer */}
            <div className="fixed inset-0 z-0 bg-black pointer-events-none">
                <div className="absolute inset-0 bg-neutral-900/50" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/assets/challenge-bg-new.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full mx-auto p-8 pt-12 text-zinc-100">

                <header className="flex items-center justify-between mb-12 animate-slideUp">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                            Suas Propostas
                        </h1>
                        <p className="text-zinc-500 mt-2 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                            Gerencie e acompanhe o status de todas as suas propostas comerciais.
                        </p>
                    </div>

                    <Link
                        href="/editor"
                        className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 animate-fadeIn"
                        style={{ animationDelay: '400ms' }}
                    >
                        Nova Proposta
                    </Link>
                </header>

                <div className="flex-1 w-full h-[calc(100vh-200px)]">
                    {proposals && proposals.length > 0 ? (
                        <div className="h-full w-full">
                            <KanbanBoard initialProposals={proposals as any} />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-24 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                            <p className="text-zinc-400 text-lg">Nenhuma proposta encontrada.</p>
                            <Link href="/editor" className="mt-4 text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors">
                                Comece criando sua primeira proposta
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
