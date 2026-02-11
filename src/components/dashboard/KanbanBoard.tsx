'use client'

import React, { useState, useEffect } from 'react'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import { Proposal, PROPOSAL_STATUSES, ProposalStatus } from '@/types/proposal'
import { updateProposalStatusAction } from '@/app/actions/updateProposalStatus'

interface KanbanBoardProps {
    initialProposals: Proposal[]
}

export function KanbanBoard({ initialProposals }: KanbanBoardProps) {
    const [proposals, setProposals] = useState<Proposal[]>(initialProposals)
    const [activeProposal, setActiveProposal] = useState<Proposal | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Require 5px movement before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Sync state if initialProposals changes (e.g. from server revalidation)
    useEffect(() => {
        setProposals(initialProposals)
    }, [initialProposals])

    const groupedProposals = PROPOSAL_STATUSES.map((status) => ({
        status,
        proposals: proposals.filter((p) => {
            // Visualize undefined/null status as 'rascunho' or 'todo' based on default, 
            // but effectively filter by exact match or default fallback
            const pStatus = p.status || 'rascunho';
            return pStatus === status.id;
        }),
    }))

    function findContainer(id: string) {
        if (PROPOSAL_STATUSES.find((s) => s.id === id)) {
            return id as ProposalStatus
        }

        const proposal = proposals.find((p) => p.id === id)
        return proposal?.status || 'rascunho'
    }

    function onDragStart(event: DragStartEvent) {
        const { active } = event
        const output = active.data.current?.type === 'Proposal' ? active.data.current.proposal : null
        setActiveProposal(output)
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event
        if (!over) return

        const activeId = active.id.toString()
        const overId = over.id.toString()

        // Find the containers
        const activeContainer = findContainer(activeId)
        const overContainer = findContainer(overId)

        if (!activeContainer || !overContainer || activeContainer === overContainer) {
            return
        }

        // Optimistic update for DragOver (moving between columns visually)
        // setProposals((prev) => {
        //     const activeItems = prev.filter((p) => (p.status || 'rascunho') === activeContainer)
        //     const overItems = prev.filter((p) => (p.status || 'rascunho') === overContainer)
        //     
        //     // Find the indexes for arrayMove
        //     const activeIndex = activeItems.findIndex((p) => p.id === activeId)
        //     const overIndex = overItems.findIndex((p) => p.id === overId)
        //     
        //     // ... logic to simulate the move is complex in a flat list with status property.
        //     // Simplest approach: just update the status of the active item to the overContainer's status
        //     
        //     return prev.map(p => 
        //         p.id === activeId ? { ...p, status: overContainer as ProposalStatus } : p
        //     )
        // })
        // WARNING: Doing this in DragOver can be jittery if not handled perfectly with indices.
        // For simplicity and robustness, we can defer state updates to DragEnd
        // OR implement a more complex strategy if we want real-time reordering previews across columns.
    }

    async function onDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (!over) {
            setActiveProposal(null)
            return
        }

        const activeId = active.id.toString()
        const overId = over.id.toString()

        const activeProposal = proposals.find(p => p.id === activeId)
        if (!activeProposal) {
            setActiveProposal(null)
            return
        }

        const activeContainer = activeProposal.status || 'rascunho'
        // If over is a container (column), use its ID. If over is a card, use its container.
        let overContainer = PROPOSAL_STATUSES.find(s => s.id === overId)?.id

        if (!overContainer) {
            // Over a card
            const overProposal = proposals.find(p => p.id === overId)
            overContainer = overProposal?.status || 'rascunho'
        }

        if (activeContainer !== overContainer) {
            // Move to new column
            const newStatus = overContainer as ProposalStatus

            // Optimistic update
            setProposals((prev) =>
                prev.map(p => p.id === activeId ? { ...p, status: newStatus } : p)
            )

            // Server action
            const result = await updateProposalStatusAction(activeId, newStatus)
            if (!result.success) {
                // Revert on failure
                console.error('Failed to update status:', result.error)
                setProposals((prev) =>
                    prev.map(p => p.id === activeId ? { ...p, status: activeContainer } : p)
                )
                alert('Failed to move proposal. Please try again.')
            }
        }

        // Reordering within same column (if we implemented index logic, we would do it here)
        // For now, we only handle status changes.

        setActiveProposal(null)
    }

    return (
        <DndContext
            id="kanban-board"
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
        >
            <div className="flex h-[calc(100vh-200px)] overflow-x-auto pb-4 gap-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                {groupedProposals.map((group) => (
                    <KanbanColumn
                        key={group.status.id}
                        status={group.status}
                        proposals={group.proposals}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeProposal ? (
                    <div className="opacity-80 rotate-3 cursor-grabbing w-[350px]">
                        <KanbanCard proposal={activeProposal} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
