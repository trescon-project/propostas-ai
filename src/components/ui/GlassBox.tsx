import React from 'react';

interface GlassBoxProps {
    className?: string;
    children?: React.ReactNode;
}

export function GlassBox({ className, children }: GlassBoxProps) {
    return (
        <div
            className={`bg-gradient-to-b from-black/50 to-[#22111d]/50 backdrop-blur-md rounded-[45px] overflow-hidden ${className}`}
            style={{
                border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            {children}
        </div>
    );
}
