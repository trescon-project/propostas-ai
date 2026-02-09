import { createClient } from '@/lib/supabase/server'
import UsersClient from './UsersClient'

export default async function UsersPage() {
    const supabase = await createClient()
    const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto p-8 pt-12">
            <UsersClient initialUsers={users || []} />
        </div>
    )
}
