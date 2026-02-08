import React, { useRef, useEffect, useState } from 'react';
import { refineTextAction } from '@/app/actions/refineText';
import { useProposal } from '@/contexts/ProposalContext';

interface EditableTextProps {
    value: string;
    onChange: (newValue: string) => void;
    tagName?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    className?: string;
    style?: React.CSSProperties;
    editable?: boolean;
}

export default function EditableText({
    value,
    onChange,
    tagName = 'p',
    className = '',
    style,
    editable = false
}: EditableTextProps) {
    const Tag = tagName;
    const contentRef = useRef<HTMLElement>(null);
    const [isRefining, setIsRefining] = useState(false);
    const { data } = useProposal();

    // Update internal content only if external value changes (and not from internal edit)
    useEffect(() => {
        if (contentRef.current && contentRef.current.innerText !== value) {
            contentRef.current.innerText = value;
        }
    }, [value]);

    const handleBlur = () => {
        if (contentRef.current && editable) {
            const newValue = contentRef.current.innerText;
            if (newValue !== value) {
                onChange(newValue);
            }
        }
    };

    const handleAIFix = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsRefining(true);
        try {
            const result = await refineTextAction(value, data.aiContext);
            if (result.success && result.text) {
                onChange(result.text);
            } else {
                alert("Erro ao melhorar texto: " + result.error);
            }
        } catch (error) {
            alert("Erro na conexão com a IA.");
        } finally {
            setIsRefining(false);
        }
    };

    if (!editable) {
        return <Tag className={className} style={style}>{value}</Tag>;
    }

    return (
        <div className="group relative inline-block w-full">
            <Tag
                ref={contentRef as any}
                contentEditable={!isRefining}
                suppressContentEditableWarning
                onBlur={handleBlur}
                className={`outline-none focus:ring-1 focus:ring-[#0B95DA]/50 rounded px-1 transition-all w-full ${isRefining ? 'opacity-50 animate-pulse' : ''} ${className}`}
                style={style}
            >
                {value}
            </Tag>

            {!isRefining && (
                <button
                    onClick={handleAIFix}
                    className="absolute -right-2 top-0 translate-x-full opacity-0 group-hover:opacity-100 p-1 bg-gradient-to-r from-[#0B95DA] to-[#AC12E1] rounded-full text-[10px] text-white transition-opacity z-10"
                    title="Melhorar com IA"
                >
                    ✨
                </button>
            )}
        </div>
    );
}
