'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
    const supabase = await createClient()

    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching users:', error)
        return []
    }

    return profiles
}

export async function inviteUser(formData: FormData) {
    const email = formData.get('email') as string
    const fullName = formData.get('fullName') as string

    if (!email) {
        return { success: false, error: 'Email é obrigatório' }
    }

    // 1. Check if profile already exists (optional, but good practice)
    const supabase = await createClient()
    const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single()

    if (existingProfile) {
        return { success: false, error: 'Usuário já cadastrado' }
    }

    // 2. Invite user via Admin API
    const supabaseAdmin = createAdminClient()

    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return { success: false, error: 'Chave de serviço não configurada. Impossível convidar usuários.' }
    }

    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: {
            full_name: fullName
        }
    })

    if (error) {
        console.error('Error inviting user:', error)
        try {
            // Fallback: If invite fails (e.g. rate limit or smtp issue), try create user if allowed? 
            // Actually, usually invite is the way. 
            // Maybe error is "User already registered"? 
            return { success: false, error: error.message }
        } catch (e) {
            return { success: false, error: 'Erro ao convidar usuário' }
        }
    }

    revalidatePath('/dashboard/users')
    return { success: true }
}

export async function deleteUser(userId: string) {
    // Requires admin client usually to delete from Auth, 
    // or just delete from profiles? 
    // Deleting from profiles cascades if FK is set, but usually we want to remove access.
    // Let's use admin to delete user.

    const supabaseAdmin = createAdminClient()

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return { success: false, error: 'Chave de serviço não configurada.' }
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
        console.error('Error deleting user:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/dashboard/users')
    return { success: true }
}
