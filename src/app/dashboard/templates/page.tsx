'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TemplateCard } from '@/components/templates/TemplateCard'
import { ImportTemplateDialog } from '@/components/templates/ImportTemplateDialog'
import Link from 'next/link'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isImportOpen, setIsImportOpen] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        fetchTemplates()
    }, [])

    const fetchTemplates = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('templates')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            setTemplates(data)
        }
        setLoading(false)
    }

    const handleUseTemplate = async (template: any) => {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Usuário não autenticado')

            // Generate a unique slug
            const uniqueId = Math.random().toString(36).substring(2, 8)
            const slug = `${template.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uniqueId}`

            const { data: newProposal, error } = await supabase
                .from('proposals')
                .insert({
                    user_id: user.id,
                    title: `Nova: ${template.title}`,
                    company_name: 'Empresa Cliente',
                    custom_url: slug,
                    content: template.content,
                    status: 'rascunho',
                    date: new Date().toLocaleDateString('pt-BR')
                })
                .select()
                .single()

            if (error) throw error

            if (newProposal) {
                // Redirect to editor with the new proposal ID
                window.location.href = `/editor?id=${newProposal.id}`
            }

        } catch (err: any) {
            console.error('Erro ao usar template:', err)
            console.error('Error details:', {
                message: err.message,
                code: err.code,
                details: err.details,
                hint: err.hint
            })
            alert(`Erro ao criar proposta: ${err.message || 'Erro desconhecido'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen">
            {/* Background Video Layer - Consistent with Dashboard */}
            <div className="fixed inset-0 z-0 bg-black pointer-events-none">
                <div className="absolute inset-0 bg-neutral-900/50" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/assets/challenge-bg-new.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto p-8 pt-12">
                <header className="flex items-center justify-between mb-12 animate-slideUp">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                            Templates
                        </h1>
                        <p className="text-zinc-500 mt-2 animate-fadeIn" style={{ animationDelay: '200ms' }}>
                            Gerencie seus modelos de proposta.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsImportOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 animate-fadeIn group"
                        style={{ animationDelay: '400ms' }}
                    >
                        <AddBoxOutlinedIcon className="text-black group-hover:scale-110 transition-transform" />
                        Importar Template
                    </button>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
                        ))}
                    </div>
                ) : templates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template, idx) => (
                            <div key={template.id} className="animate-slideUp" style={{ animationDelay: `${(idx * 100) + 500}ms` }}>
                                <TemplateCard
                                    template={template}
                                    onUseTemplate={handleUseTemplate}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-24 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20 animate-fadeIn">
                        <p className="text-zinc-400 text-lg">Nenhum template encontrado.</p>
                        <button
                            onClick={() => setIsImportOpen(true)}
                            className="mt-4 text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors"
                        >
                            Importe seu primeiro template
                        </button>
                    </div>
                )}
            </div>

            {isImportOpen && (
                <ImportTemplateDialog
                    onClose={() => setIsImportOpen(false)}
                    onImport={fetchTemplates}
                />
            )}
        </div>
    )
}
