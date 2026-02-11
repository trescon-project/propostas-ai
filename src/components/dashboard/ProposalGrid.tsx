'use client'

import React from 'react'
import { Proposal } from '@/types/proposal'
import { ProposalCard } from './ProposalCard'

interface ProposalGridProps {
    proposals: Proposal[]
}

export function ProposalGrid({ proposals }: ProposalGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {proposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
            {proposals.length === 0 && (
                <div className="col-span-full p-12 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                    Nenhuma proposta encontrada.
                </div>
            )}
        </div>
    )
}
