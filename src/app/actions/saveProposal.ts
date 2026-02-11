'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveProposalAction(proposalData: any) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, error: 'Usuário não autenticado' }
    }

    // Verificar se já existe uma proposta com este custom_url pertencente a outro usuário
    if (proposalData.meta.customUrl) {
        const { data: existingProposal } = await supabase
            .from('proposals')
            .select('user_id')
            .eq('custom_url', proposalData.meta.customUrl)
            .single()

        if (existingProposal && existingProposal.user_id !== user.id) {
            return {
                success: false,
                error: 'Uma proposta com este link personalizado já existe e pertence a outro usuário. Por favor, escolha outro link.'
            }
        }
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
        // Melhorar mensagem de erro para RLS
        if (error.code === '42501') {
            return { success: false, error: 'Erro de permissão (RLS). Verifique se você é o dono desta proposta.' }
        }
        return { success: false, error: error.message }
    }

    revalidatePath('/editor')
    return { success: true, data }
}
