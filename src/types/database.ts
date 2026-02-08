export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            proposals: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    title: string
                    company_name: string
                    custom_url: string
                    content: Json
                    ai_context: string | null
                    date: string
                    status: string
                    last_edited_by_name: string | null
                    last_edited_at: string | null
                    last_accessed_by_name: string | null
                    last_accessed_at: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    title: string
                    company_name: string
                    custom_url: string
                    content: Json
                    ai_context?: string | null
                    date: string
                    status?: string
                    last_edited_by_name?: string | null
                    last_edited_at?: string | null
                    last_accessed_by_name?: string | null
                    last_accessed_at?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    title?: string
                    company_name?: string
                    custom_url?: string
                    content?: Json
                    ai_context?: string | null
                    date?: string
                    status?: string
                    last_edited_by_name?: string | null
                    last_edited_at?: string | null
                    last_accessed_by_name?: string | null
                    last_accessed_at?: string | null
                }
                relationships: [
                    {
                        foreignKeyName: "proposals_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            templates: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    user_id: string
                    title: string
                    description: string | null
                    content: Json
                    is_public: boolean | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    user_id: string
                    title: string
                    description?: string | null
                    content: Json
                    is_public?: boolean | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    user_id?: string
                    title?: string
                    description?: string | null
                    content?: Json
                    is_public?: boolean | null
                }
                Relationships: [
                    {
                        foreignKeyName: "templates_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
