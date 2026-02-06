import React from 'react';

export type DotVariant = 'Azul' | 'Rosa';

interface SystemDotProps {
    variant?: DotVariant;
    className?: string;
}

export function SystemDot({ variant = 'Azul', className }: SystemDotProps) {
    const isRosa = variant === 'Rosa';
    const colorClass = isRosa ? 'bg-[#ac12e1] shadow-[0_0_10px_#ac12e1]' : 'bg-[#0b95da] shadow-[0_0_10px_#0b95da]';

    return (
        <div className={`w-3 h-3 rounded-full relative z-10 ${colorClass} ${className}`} />
    );
}
