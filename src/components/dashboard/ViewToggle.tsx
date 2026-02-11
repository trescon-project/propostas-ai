'use client'

import React from 'react'
import { ViewKanban, TableRows, GridView } from '@mui/icons-material'

export type ViewMode = 'kanban' | 'list' | 'grid'

interface ViewToggleProps {
    currentView: ViewMode
    onViewChange: (view: ViewMode) => void
}

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <button
                onClick={() => onViewChange('kanban')}
                className={`p-2 rounded-md transition-all ${currentView === 'kanban'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                title="Kanban View"
            >
                <ViewKanban sx={{ fontSize: 20 }} />
            </button>
            <button
                onClick={() => onViewChange('list')}
                className={`p-2 rounded-md transition-all ${currentView === 'list'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                title="List View"
            >
                <TableRows sx={{ fontSize: 20 }} />
            </button>
            <button
                onClick={() => onViewChange('grid')}
                className={`p-2 rounded-md transition-all ${currentView === 'grid'
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                title="Grid View"
            >
                <GridView sx={{ fontSize: 20 }} />
            </button>
        </div>
    )
}
