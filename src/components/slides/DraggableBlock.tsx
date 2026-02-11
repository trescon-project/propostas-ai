'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import EditableText from '@/components/ui/EditableText';
import { useProposal } from '@/contexts/ProposalContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface DraggableBlockProps {
    slideId: string;
    item: {
        id: string;
        type: 'text' | 'image';
        content: string;
        style?: React.CSSProperties & { x?: number; y?: number };
    };
    editable: boolean;
}

export default function DraggableBlock({ slideId, item, editable }: DraggableBlockProps) {
    const { updateExtraContent, updateExtraContentPosition, removeExtraContent } = useProposal();

    if (!editable) {
        // Render static content if not editable, respecting position
        return (
            <div
                style={{
                    position: 'absolute',
                    top: item.style?.y || 0,
                    left: item.style?.x || 0,
                    width: 'auto', // Allow auto width for static text
                    pointerEvents: 'none', // Pass clicks through
                    zIndex: 50,
                }}
            >
                <div className="relative group">
                    {/* Apply same styling as editable version for consistency */}
                    <div className="text-white text-xl font-bold bg-black/50 p-2 rounded backdrop-blur-sm border border-transparent">
                        {item.content}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Rnd
            key={item.id}
            default={{
                x: item.style?.x || 100,
                y: item.style?.y || 100,
                width: 300,
                height: 50
            }}
            position={{ x: item.style?.x || 100, y: item.style?.y || 100 }}
            onDragStop={(e, d) => {
                updateExtraContentPosition(slideId, item.id, d.x, d.y);
            }}
            bounds="parent"
            enableResizing={false} // Simplify for now, can enable later
            className="z-50"
        // dragHandleClassName="drag-handle" // Optional: if we want a specific handle
        >
            <div className="relative group cursor-move">
                <EditableText
                    value={item.content}
                    onChange={(val) => updateExtraContent(slideId, item.id, val)}
                    className="text-white text-xl font-bold bg-black/50 p-2 rounded backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-colors pl-8"
                    editable={true}
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent drag start if possible, though Rnd handles handle classes
                        // Actually Rnd wraps this, so click should work.
                        if (confirm('Excluir texto?')) {
                            removeExtraContent(slideId, item.id);
                        }
                    }}
                    className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-50 pointer-events-auto"
                    title="Excluir texto"
                >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                </button>
            </div>
        </Rnd>
    );
}
