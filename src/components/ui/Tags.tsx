import React from 'react';

export type TagVariant = 'Roxo' | 'Azul';

interface TagsProps {
    label: string;
    variant?: TagVariant;
    className?: string;
}

export function Tags({ label, variant = 'Roxo', className }: TagsProps) {
    const isAzul = variant === 'Azul';
    const colorClass = isAzul
        ? 'bg-[#0b95da]/20 border-[#0b95da]/30 text-[#0b95da]'
        : 'bg-[#ac12e1]/20 border-[#ac12e1]/30 text-[#ac12e1]';

    return (
        <div className={`flex items-center justify-center px-4 py-1 h-[34px] rounded-full backdrop-blur-md border ${colorClass} ${className}`}>
            <span className="font-poppins font-semibold text-[1.4vh] tracking-widest uppercase whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}
