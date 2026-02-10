'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ProposalCard } from './ProposalCard'
import { Proposal } from '@/types/proposal'

interface KanbanCardProps {
    proposal: Proposal
}

export function KanbanCard({ proposal }: KanbanCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: proposal.id,
        data: {
            type: 'Proposal',
            proposal,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="touch-none" // Recommended for touch devices
        >
            <ProposalCard proposal={proposal as any} />
        </div>
    )
}
