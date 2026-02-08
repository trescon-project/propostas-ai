import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { ProposalCard } from '@/components/dashboard/ProposalCard'
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: proposals, error } = await supabase
        .from('proposals')
        .select('*')
        .order('updated_at', { ascending: false })

    if (error) {
        console.error('Error fetching proposals:', error)
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
            <div className="relative z-10 max-w-7xl mx-auto p-8 pt-12 text-zinc-100">

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

                {proposals && proposals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {proposals.map((proposal, idx) => (
                            <div key={proposal.id} className="animate-popIn opacity-0" style={{ animationDelay: `${(idx * 100) + 300}ms` }}>
                                <ProposalCard proposal={proposal} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-24 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                        <p className="text-zinc-400 text-lg">Nenhuma proposta encontrada.</p>
                        <Link href="/editor" className="mt-4 text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors">
                            Comece criando sua primeira proposta
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
