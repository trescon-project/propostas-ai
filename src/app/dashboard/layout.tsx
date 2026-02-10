import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/layout/Sidebar'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar user={user} />
            <div className="flex-1 flex flex-col">
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
