import React from 'react';

interface WeekLabelProps {
    label: string;
    className?: string;
}

export function WeekLabel({ label, className }: WeekLabelProps) {
    return (
        <div className={`h-[32px] w-[69px] flex items-center justify-center ${className}`}>
            <span className="font-poppins font-semibold text-[1.8vh] text-white tracking-widest uppercase whitespace-nowrap">
                {label}
            </span>
        </div>
    );
}
