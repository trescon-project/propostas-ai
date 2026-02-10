'use client'

import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { KanbanCard } from './KanbanCard'
import { Proposal, PROPOSAL_STATUSES } from '@/types/proposal'

interface KanbanColumnProps {
    status: typeof PROPOSAL_STATUSES[number]
    proposals: Proposal[]
}

export function KanbanColumn({ status, proposals }: KanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: status.id,
    })

    return (
        <div className="flex flex-col h-full min-w-[350px] bg-zinc-900/10 rounded-xl border border-zinc-800/50">
            {/* Header */}
            <div className={`p-4 border-b border-zinc-800/50 flex items-center justify-between rounded-t-xl ${status.color.split(' ')[0]} bg-opacity-10`}>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${status.color.replace('bg-', 'bg-').split(' ')[0].replace('/20', '')}`} />
                    <h3 className="font-semibold text-zinc-100">{status.label}</h3>
                </div>
                <span className="text-xs font-medium text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                    {proposals.length}
                </span>
            </div>

            {/* Content */}
            <div ref={setNodeRef} className="flex-1 p-3 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <SortableContext items={proposals.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                    {proposals.map((proposal) => (
                        <KanbanCard key={proposal.id} proposal={proposal} />
                    ))}
                </SortableContext>

                {proposals.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-600 text-sm">
                        Arraste aqui
                    </div>
                )}
            </div>
        </div>
    )
}
