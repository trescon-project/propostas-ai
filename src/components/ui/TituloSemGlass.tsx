import React from 'react';

interface TituloSemGlassProps {
    text: string;
    className?: string;
}

export function TituloSemGlass({ text, className }: TituloSemGlassProps) {
    return (
        <div className={`font-poppins text-white uppercase tracking-widest text-[2.2vh] font-normal leading-relaxed ${className}`}>
            {text}
        </div>
    );
}
