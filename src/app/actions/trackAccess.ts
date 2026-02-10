'use server'

import { createClient } from '@/lib/supabase/server'

export async function trackAccessAction(proposalId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Usuário não autenticado' }
    }

    const { error } = await supabase
        .from('proposals')
        .update({
            last_accessed_by_name: user.email || user.id,
            last_accessed_by: user.id,
            last_accessed_at: new Date().toISOString()
        })
        .eq('id', proposalId)

    if (error) {
        console.error('Error tracking access:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}
