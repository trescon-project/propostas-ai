'use client'

import React from 'react'

interface TemplateCardProps {
    template: {
        id: string;
        name: string;
        description: string;
    }
    onUseTemplate?: (template: any) => void
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onUseTemplate }) => {
    return (
        <div className="group relative flex flex-col p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 h-full">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                        {template.id === 'default' ? 'Padrão' : 'Personalizado'}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors mb-2">
                    {template.name}
                </h3>

                {template.description && (
                    <p className="text-sm text-zinc-400 line-clamp-3 mb-4">
                        {template.description}
                    </p>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/50">
                {onUseTemplate ? (
                    <button
                        onClick={() => onUseTemplate(template)}
                        className="w-full py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
                    >
                        Usar Template
                    </button>
                ) : (
                    <div className="text-xs text-zinc-500 text-center">
                        Para edição apenas
                    </div>
                )}
            </div>

            {/* Decorative gradient background hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        </div>
    )
}
