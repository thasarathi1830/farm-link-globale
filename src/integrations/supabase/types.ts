export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contracts: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: number
          lease_id: number | null
          party_one: number | null
          party_two: number | null
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: never
          lease_id?: number | null
          party_one?: number | null
          party_two?: number | null
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: never
          lease_id?: number | null
          party_one?: number | null
          party_two?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "mnc_leases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_party_one_fkey"
            columns: ["party_one"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_party_two_fkey"
            columns: ["party_two"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      farmer_profiles: {
        Row: {
          available_from: string | null
          available_to: string | null
          experience_years: number | null
          geo_location: unknown | null
          id: number
          land_size: number | null
          user_id: number | null
        }
        Insert: {
          available_from?: string | null
          available_to?: string | null
          experience_years?: number | null
          geo_location?: unknown | null
          id?: never
          land_size?: number | null
          user_id?: number | null
        }
        Update: {
          available_from?: string | null
          available_to?: string | null
          experience_years?: number | null
          geo_location?: unknown | null
          id?: never
          land_size?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "farmer_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      land_listings: {
        Row: {
          available_from: string | null
          available_to: string | null
          crop_type: string | null
          id: number
          job_type: string | null
          land_size: number | null
          location: unknown | null
          salary_offer: number | null
          user_id: number | null
        }
        Insert: {
          available_from?: string | null
          available_to?: string | null
          crop_type?: string | null
          id?: never
          job_type?: string | null
          land_size?: number | null
          location?: unknown | null
          salary_offer?: number | null
          user_id?: number | null
        }
        Update: {
          available_from?: string | null
          available_to?: string | null
          crop_type?: string | null
          id?: never
          job_type?: string | null
          land_size?: number | null
          location?: unknown | null
          salary_offer?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "land_listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mnc_leases: {
        Row: {
          end_date: string | null
          farmer_id: number | null
          id: number
          land_listing_id: number | null
          mnc_id: number | null
          salary: number | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          end_date?: string | null
          farmer_id?: number | null
          id?: never
          land_listing_id?: number | null
          mnc_id?: number | null
          salary?: number | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          end_date?: string | null
          farmer_id?: number | null
          id?: never
          land_listing_id?: number | null
          mnc_id?: number | null
          salary?: number | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mnc_leases_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mnc_leases_land_listing_id_fkey"
            columns: ["land_listing_id"]
            isOneToOne: false
            referencedRelation: "land_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mnc_leases_mnc_id_fkey"
            columns: ["mnc_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          language_preference: string | null
          name: string | null
          password: string | null
          phone: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: never
          language_preference?: string | null
          name?: string | null
          password?: string | null
          phone: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: never
          language_preference?: string | null
          name?: string | null
          password?: string | null
          phone?: string
          role?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
