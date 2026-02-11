'use client'

import React, { useState } from 'react'
import { Proposal } from '@/types/proposal'
import { ViewToggle, ViewMode } from './ViewToggle'
import { KanbanBoard } from './KanbanBoard'
import { ProposalList } from './ProposalList'
import { ProposalGrid } from './ProposalGrid'
import Link from 'next/link'

interface DashboardContentProps {
    proposals: Proposal[]
}

export function DashboardContent({ proposals }: DashboardContentProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('kanban')

    return (
        <div className="relative z-10 w-full mx-auto p-8 pt-12 text-zinc-100 h-screen flex flex-col overflow-hidden">
            <header className="flex items-center justify-between mb-8 animate-slideUp shrink-0">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        Suas Propostas
                    </h1>
                    <p className="text-zinc-500 mt-2 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                        Gerencie e acompanhe o status de todas as suas propostas comerciais.
                    </p>
                </div>

                <div className="flex items-center gap-4 animate-fadeIn" style={{ animationDelay: '400ms' }}>
                    <ViewToggle currentView={viewMode} onViewChange={setViewMode} />

                    <Link
                        href="/editor"
                        className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                    >
                        Nova Proposta
                    </Link>
                </div>
            </header>

            <div className="flex-1 w-full min-h-0">
                {proposals && proposals.length > 0 ? (
                    <div className="h-full w-full">
                        {viewMode === 'kanban' && <KanbanBoard initialProposals={proposals} />}

                        {viewMode === 'list' && (
                            <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                                <ProposalList proposals={proposals} />
                            </div>
                        )}

                        {viewMode === 'grid' && (
                            <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                                <ProposalGrid proposals={proposals} />
                            </div>
                        )}
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
    )
}
