'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ProposalStatus } from '@/types/proposal'

export async function updateProposalStatusAction(id: string, status: ProposalStatus) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('proposals')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating proposal status:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
