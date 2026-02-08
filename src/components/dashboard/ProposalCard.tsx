'use client'

import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MoreVert, Edit, ContentCopy, Delete } from '@mui/icons-material'
import { deleteProposalAction, duplicateProposalAction } from '@/app/actions/manageProposals'

interface ProposalCardProps {
    proposal: {
        id: string
        title: string
        company_name: string
        custom_url: string
        status: string
        last_accessed_by_name: string | null
        last_accessed_at: string | null
        updated_at: string
    }
}

const statusColors: Record<string, string> = {
    'rascunho': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    'aprovada': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'reprovada': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    'em análise': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [isDuplicating, setIsDuplicating] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null)

    const lastAccess = proposal.last_accessed_at
        ? format(new Date(proposal.last_accessed_at), "dd/MM 'às' HH'h'mm", { locale: ptBR })
        : null

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (confirm('Tem certeza que deseja excluir esta proposta?')) {
            setIsDeleting(true)
            await deleteProposalAction(proposal.id)
            setIsDeleting(false)
            setIsMenuOpen(false) // Close menu after action
        }
    }

    const handleDuplicate = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDuplicating(true)
        await duplicateProposalAction(proposal.id)
        setIsDuplicating(false)
        setIsMenuOpen(false)
    }

    const toggleMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className="group relative flex flex-col p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.02] hover:-translate-y-1">
            <Link href={`/editor?id=${proposal.id}`} className="absolute inset-0 z-0" />

            <div className="flex justify-between items-start relative z-20 pointer-events-none">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[proposal.status || 'rascunho'] || statusColors['rascunho']}`}>
                    {(proposal.status || 'rascunho').charAt(0).toUpperCase() + (proposal.status || 'rascunho').slice(1)}
                </span>

                <div className="relative pointer-events-auto" ref={menuRef}>
                    <button
                        onClick={toggleMenu}
                        className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                        <MoreVert sx={{ fontSize: 20 }} />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 top-8 w-48 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50 flex flex-col py-1 animate-fadeIn">
                            <Link
                                href={`/editor?id=${proposal.id}`}
                                className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 w-full text-left"
                                onClick={(e) => {
                                    // This onClick is to prevent the menu from closing immediately if the link is clicked
                                    // The Link itself will handle navigation, but we want to ensure the menu closes
                                    // after navigation, or if the user decides not to navigate.
                                    // For a Link, e.preventDefault() would stop navigation, which we don't want here.
                                    // So, we just stop propagation to prevent the document click handler from firing.
                                    e.stopPropagation()
                                    setIsMenuOpen(false) // Close menu after clicking edit
                                }}
                            >
                                <Edit sx={{ fontSize: 16 }} />
                                Editar
                            </Link>
                            <button
                                onClick={handleDuplicate}
                                disabled={isDuplicating}
                                className="px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 w-full text-left disabled:opacity-50"
                            >
                                <ContentCopy sx={{ fontSize: 16 }} />
                                {isDuplicating ? 'Duplicando...' : 'Duplicar'}
                            </button>
                            <div className="h-px bg-zinc-800 my-1" />
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 w-full text-left disabled:opacity-50"
                            >
                                <Delete sx={{ fontSize: 16 }} />
                                {isDeleting ? 'Excluindo...' : 'Excluir'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 pointer-events-none relative z-10">
                <div className="text-zinc-500 text-xs font-medium tracking-wider uppercase">
                    {proposal.company_name}
                </div>

                <h3 className="mt-1 text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {proposal.title}
                </h3>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/50 flex flex-col gap-2 pointer-events-none relative z-10">
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span>Última edição</span>
                    <span className="text-zinc-400">
                        {format(new Date(proposal.updated_at), "dd MMM, yyyy", { locale: ptBR })}
                    </span>
                </div>

                {proposal.last_accessed_by_name && (
                    <div className="flex flex-col gap-0.5 mt-2">
                        <span className="text-[10px] text-zinc-600 uppercase tracking-tighter font-bold">Último acesso por</span>
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-300 truncate max-w-[120px]">
                                {proposal.last_accessed_by_name}
                            </span>
                            <span className="text-zinc-500 shrink-0">
                                {lastAccess}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative gradient background hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        </div>
    )
}
