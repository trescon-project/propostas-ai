'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveProposalAction(proposalData: any) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Usuário não autenticado' }
    }

    const { data, error } = await supabase
        .from('proposals')
        .upsert({
            user_id: user.id,
            title: proposalData.meta.title,
            company_name: proposalData.meta.companyName,
            custom_url: proposalData.meta.customUrl,
            date: proposalData.meta.date,
            content: proposalData.slides,
            ai_context: proposalData.aiContext,
            status: proposalData.meta.status || 'rascunho',
            last_edited_by_name: user.email || user.id,
            last_edited_by: user.id,
            last_edited_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }, {
            onConflict: 'custom_url'
        })
        .select()

    if (error) {
        console.error('Error saving proposal:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/editor')
    return { success: true, data }
}
