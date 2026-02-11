'use client'

import React from 'react'
import { Proposal, PROPOSAL_STATUSES } from '@/types/proposal'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { Avatar, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'

interface ProposalListProps {
    proposals: Proposal[]
}

export function ProposalList({ proposals }: ProposalListProps) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/20">
            <table className="w-full text-left text-sm text-zinc-400">
                <thead className="text-xs uppercase bg-zinc-900/50 text-zinc-500 border-b border-zinc-800">
                    <tr>
                        <th className="px-6 py-4 font-medium">Proposta</th>
                        <th className="px-6 py-4 font-medium">Cliente</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Última Edição</th>
                        <th className="px-6 py-4 font-medium">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                    {proposals.map((proposal) => {
                        const statusColor = PROPOSAL_STATUSES.find(s => s.id === (proposal.status || 'rascunho'))?.color || '#ccc'

                        return (
                            <tr key={proposal.id} className="group hover:bg-zinc-900/40 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="font-medium text-zinc-200">{proposal.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-zinc-300">{proposal.company_name}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
                                        <span className="capitalize text-zinc-300">
                                            {(proposal.status || 'rascunho')}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-zinc-300">
                                            {proposal.updated_at && format(new Date(proposal.updated_at), "dd MMM, yyyy", { locale: ptBR })}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            por {proposal.last_edited_by_name || 'Desconhecido'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={`/editor?id=${proposal.id}`}
                                        className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                                        title="Editar"
                                    >
                                        <Edit sx={{ fontSize: 18 }} />
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {proposals.length === 0 && (
                <div className="p-12 text-center text-zinc-500">
                    Nenhuma proposta encontrada.
                </div>
            )}
        </div>
    )
}
