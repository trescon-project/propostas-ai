'use client';

import { ProposalProvider } from '@/contexts/ProposalContext';

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProposalProvider>
            {children}
        </ProposalProvider>
    );
}
