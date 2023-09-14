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
      comments: {
        Row: {
          author: string | null
          comment: string | null
          comment_at: string
          id: string
        }
        Insert: {
          author?: string | null
          comment?: string | null
          comment_at?: string
          id?: string
        }
        Update: {
          author?: string | null
          comment?: string | null
          comment_at?: string
          id?: string
        }
        Relationships: []
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
