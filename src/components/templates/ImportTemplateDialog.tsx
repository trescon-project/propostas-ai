'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function ImportTemplateDialog({ onClose, onImport }: { onClose: () => void, onImport: () => void }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleImport = async () => {
        setLoading(true)
        setError(null)

        try {
            // Validate JSON
            let parsedContent;
            try {
                parsedContent = JSON.parse(content)
            } catch (e) {
                throw new Error('JSON inválido')
            }

            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('Usuário não autenticado')

            const { error: insertError } = await supabase
                .from('templates')
                .insert({
                    user_id: user.id,
                    title,
                    description,
                    content: parsedContent,
                    is_public: isPublic
                })

            if (insertError) throw insertError

            onImport()
            onClose()
            router.refresh()

        } catch (err: any) {
            setError(err.message || 'Erro ao importar template')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                    <h2 className="text-xl font-bold text-white">Importar Template</h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">✕</button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Título do Template <span className="text-rose-500">*</span></label>
                        <input
                            type="text"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                            placeholder="Ex: Proposta SaaS"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Descrição</label>
                        <textarea
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 resize-none h-20"
                            placeholder="Breve descrição do template..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* JSON Content */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Conteúdo JSON <span className="text-rose-500">*</span></label>
                        <textarea
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600 resize-none h-40"
                            placeholder='{ "slides": [...] }'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    {/* Public Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isPublic"
                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        <label htmlFor="isPublic" className="text-sm text-zinc-300 select-none cursor-pointer">
                            Tornar este template público pra equipe
                        </label>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-800 bg-zinc-900/50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={loading || !title || !content}
                        className="px-6 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-white/10 text-sm"
                    >
                        {loading ? 'Importando...' : 'Importar Template'}
                    </button>
                </div>
            </div>
        </div>
    )
}
