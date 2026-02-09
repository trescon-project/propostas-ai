'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Add, Delete, Close } from '@mui/icons-material'
import { inviteUser, deleteUser } from '@/app/actions/manageUsers'

interface Profile {
    id: string
    email: string
    full_name: string | null
    role: string
    created_at: string
}

interface UsersClientProps {
    initialUsers: Profile[]
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
    const [users, setUsers] = useState<Profile[]>(initialUsers)
    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ email: '', fullName: '' })
    const [error, setError] = useState('')
    const router = useRouter()

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        const data = new FormData()
        data.append('email', formData.email)
        data.append('fullName', formData.fullName)

        const result = await inviteUser(data) // Actually we need to pass formData object or better arguments. 
        // My action expects FormData. Perfect.

        if (result?.success) {
            setIsInviteOpen(false)
            setFormData({ email: '', fullName: '' })
            router.refresh()
        } else {
            setError(result?.error || 'Erro ao convidar usuário')
        }
        setIsLoading(false)
    }

    const handleDelete = async (userId: string) => {
        if (!confirm('Tem certeza que deseja remover este usuário?')) return

        const result = await deleteUser(userId)
        if (result?.success) {
            router.refresh()
        } else {
            alert(result?.error || 'Erro ao remover usuário')
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Usuários</h1>
                <button
                    onClick={() => setIsInviteOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
                >
                    <Add fontSize="small" />
                    Adicionar Usuário
                </button>
            </div>

            {/* List */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 border-b border-zinc-800 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    <div>Usuário</div>
                    <div>Função</div>
                    <div>Data de Cadastro</div>
                    <div className="w-8"></div>
                </div>

                {users.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500">
                        Nenhum usuário encontrado.
                    </div>
                ) : (
                    users.map((user) => (
                        <div key={user.id} className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 items-center border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-zinc-900">
                                    {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-200">
                                        {user.full_name || 'Usuário sem nome'}
                                    </span>
                                    <span className="text-xs text-zinc-500">{user.email}</span>
                                </div>
                            </div>

                            <div>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                    {user.role === 'admin' ? 'Administrador' : 'Editor'}
                                </span>
                            </div>

                            <div className="text-sm text-zinc-400">
                                {new Date(user.created_at).toLocaleDateString('pt-BR')}
                            </div>

                            <div className="flex justify-end relative group">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-400/10 rounded transition-colors"
                                    title="Remover usuário"
                                >
                                    <Delete fontSize="small" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Invite Modal */}
            {isInviteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-6 shadow-2xl animate-scaleIn">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Convidar Usuário</h2>
                            <button
                                onClick={() => setIsInviteOpen(false)}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <Close />
                            </button>
                        </div>

                        <form onSubmit={handleInvite} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Nome Completo</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-zinc-600"
                                    placeholder="Ex: João Silva"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">E-mail</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-zinc-600"
                                    placeholder="joao@exemplo.com"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsInviteOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    {isLoading ? 'Enviando...' : 'Enviar Convite'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
