import React from 'react';

interface TituloProps {
    text?: string;
    className?: string;
}

export function Titulo({ text = "Plano de Trabalho", className }: TituloProps) {
    return (
        <div className={`backdrop-blur-[25px] bg-white/10 flex items-center justify-center px-8 py-3 rounded-full border border-white/10 ${className}`}>
            <h2 className="font-poppins font-extrabold text-[3vh] text-white tracking-widest uppercase leading-none">
                {text}
            </h2>
        </div>
    );
}
