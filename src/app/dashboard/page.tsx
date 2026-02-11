import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { DashboardContent } from '@/components/dashboard/DashboardContent'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: proposals, error } = await supabase
        .from('proposals')
        .select(`
            *,
            editor_profile:profiles!last_edited_by(full_name, avatar_url, email),
            accessor_profile:profiles!last_accessed_by(full_name, avatar_url, email)
        `)
        .order('updated_at', { ascending: false })

    if (error) {
        console.error('Error fetching proposals:', JSON.stringify(error, null, 2))
    }

    return (
        <div className="relative h-screen bg-black overflow-hidden">
            {/* Background Video Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-neutral-900/50" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="/assets/challenge-bg-new.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* Client Content Layer */}
            <DashboardContent proposals={proposals as any || []} />
        </div>
    )
}
