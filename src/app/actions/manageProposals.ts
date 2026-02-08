'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteProposalAction(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting proposal:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function duplicateProposalAction(id: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'User not authenticated' }
    }

    // 1. Fetch original proposal
    const { data: original, error: fetchError } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single()

    if (fetchError || !original) {
        return { success: false, error: 'Proposal not found' }
    }

    // 2. Create new proposal object
    const newProposal = {
        user_id: user.id,
        title: `${original.title} (Cópia)`,
        company_name: original.company_name,
        custom_url: `${original.custom_url}-copy-${Date.now()}`, // Ensure uniqueness
        content: original.content,
        ai_context: original.ai_context,
        date: original.date,
        status: 'rascunho', // Always draft
        last_edited_by_name: user.email || user.id,
        last_edited_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }

    // 3. Insert new proposal
    const { data: inserted, error: insertError } = await supabase
        .from('proposals')
        .insert(newProposal)
        .select()
        .single()

    if (insertError) {
        console.error('Error duplicating proposal:', insertError)
        return { success: false, error: insertError.message }
    }

    revalidatePath('/dashboard')
    return { success: true, data: inserted }
}
