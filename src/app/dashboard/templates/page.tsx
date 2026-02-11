'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TemplateCard } from '@/components/templates/TemplateCard'
import { templates, TemplateConfig } from '@/config/templates'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

export default function TemplatesPage() {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)

    const handleUseTemplate = async (template: TemplateConfig) => {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Usuário não autenticado')

            // Generate a unique slug
            const uniqueId = Math.random().toString(36).substring(2, 8)
            const slug = `${template.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${uniqueId}`

            // Store slides directly
            const initialContent = template.content || [];

            const { data: newProposal, error } = await supabase
                .from('proposals')
                .insert({
                    user_id: user.id,
                    title: `Nova: ${template.name}`,
                    company_name: 'Empresa Cliente',
                    custom_url: slug,
                    content: initialContent,
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


                </header>

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
            </div>
        </div>
    )
}
