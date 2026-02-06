import React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

interface SetasProps {
    onPrev?: () => void;
    onNext?: () => void;
    className?: string;
    visible?: boolean;
}

export function Setas({ onPrev, onNext, className, visible = true }: SetasProps) {
    if (!visible) return null;

    return (
        <div className={`flex items-center justify-between w-full pointer-events-none ${className}`}>
            {/* Left Arrow */}
            <button
                onClick={onPrev}
                className="pointer-events-auto p-2 rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
                <KeyboardArrowLeft sx={{ fontSize: 40 }} />
            </button>

            {/* Right Arrow */}
            <button
                onClick={onNext}
                className="pointer-events-auto p-2 rounded-full border border-white/20 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
                <KeyboardArrowRight sx={{ fontSize: 40 }} />
            </button>
        </div>
    );
}
