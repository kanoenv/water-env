export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          address: string
          admin_notes: string | null
          applicant_type: Database["public"]["Enums"]["applicant_type"]
          applicant_user_id: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          lga: string
          organization_id: string | null
          phone: string
          planting_site: string
          preferred_species: string | null
          purpose: string
          reviewed_at: string | null
          reviewed_by: string | null
          seeds_requested: number
          site_size_hectares: number | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
        }
        Insert: {
          address: string
          admin_notes?: string | null
          applicant_type: Database["public"]["Enums"]["applicant_type"]
          applicant_user_id?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          lga: string
          organization_id?: string | null
          phone: string
          planting_site: string
          preferred_species?: string | null
          purpose: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          seeds_requested: number
          site_size_hectares?: number | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Update: {
          address?: string
          admin_notes?: string | null
          applicant_type?: Database["public"]["Enums"]["applicant_type"]
          applicant_user_id?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          lga?: string
          organization_id?: string | null
          phone?: string
          planting_site?: string
          preferred_species?: string | null
          purpose?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          seeds_requested?: number
          site_size_hectares?: number | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          lga: string | null
          name: string
          org_type: string
          owner_id: string | null
          registration_number: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          lga?: string | null
          name: string
          org_type: string
          owner_id?: string | null
          registration_number?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          lga?: string | null
          name?: string
          org_type?: string
          owner_id?: string | null
          registration_number?: string | null
        }
        Relationships: []
      }
      planting_reports: {
        Row: {
          assignment_id: string
          id: string
          latitude: number | null
          location_name: string | null
          longitude: number | null
          notes: string | null
          photo_url: string | null
          reported_at: string
          reporter_user_id: string
          status: Database["public"]["Enums"]["report_status"]
          survival_rate: number | null
          trees_planted: number
        }
        Insert: {
          assignment_id: string
          id?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          reported_at?: string
          reporter_user_id: string
          status?: Database["public"]["Enums"]["report_status"]
          survival_rate?: number | null
          trees_planted: number
        }
        Update: {
          assignment_id?: string
          id?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          reported_at?: string
          reporter_user_id?: string
          status?: Database["public"]["Enums"]["report_status"]
          survival_rate?: number | null
          trees_planted?: number
        }
        Relationships: [
          {
            foreignKeyName: "planting_reports_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "seed_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      seed_assignments: {
        Row: {
          application_id: string | null
          assigned_by: string
          created_at: string
          id: string
          notes: string | null
          organization_id: string | null
          quantity: number
          recipient_user_id: string | null
          species: string
        }
        Insert: {
          application_id?: string | null
          assigned_by: string
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          quantity: number
          recipient_user_id?: string | null
          species: string
        }
        Update: {
          application_id?: string | null
          assigned_by?: string
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string | null
          quantity?: number
          recipient_user_id?: string | null
          species?: string
        }
        Relationships: [
          {
            foreignKeyName: "seed_assignments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seed_assignments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      tree_campaign_applications: {
        Row: {
          address: string
          admin_notes: string | null
          applicant_user_id: string | null
          campaign: Database["public"]["Enums"]["tree_campaign"]
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_position: string | null
          coordinator_commitment: boolean
          created_at: string
          date_established: string | null
          id: string
          locations: string
          organization_name: string
          organization_type: string
          other_type: string | null
          planting_sites: number
          previous_experience: string | null
          representative_name: string | null
          representative_position: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          seedlings_requested: number
          status: Database["public"]["Enums"]["tree_app_status"]
          submission_date: string
          survival_rate_commitment: string | null
          tracking_tool_commitment: boolean
          training_commitment: boolean
          updated_at: string
          volunteers: number
        }
        Insert: {
          address: string
          admin_notes?: string | null
          applicant_user_id?: string | null
          campaign?: Database["public"]["Enums"]["tree_campaign"]
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_position?: string | null
          coordinator_commitment?: boolean
          created_at?: string
          date_established?: string | null
          id?: string
          locations: string
          organization_name: string
          organization_type: string
          other_type?: string | null
          planting_sites?: number
          previous_experience?: string | null
          representative_name?: string | null
          representative_position?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          seedlings_requested: number
          status?: Database["public"]["Enums"]["tree_app_status"]
          submission_date?: string
          survival_rate_commitment?: string | null
          tracking_tool_commitment?: boolean
          training_commitment?: boolean
          updated_at?: string
          volunteers?: number
        }
        Update: {
          address?: string
          admin_notes?: string | null
          applicant_user_id?: string | null
          campaign?: Database["public"]["Enums"]["tree_campaign"]
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_position?: string | null
          coordinator_commitment?: boolean
          created_at?: string
          date_established?: string | null
          id?: string
          locations?: string
          organization_name?: string
          organization_type?: string
          other_type?: string | null
          planting_sites?: number
          previous_experience?: string | null
          representative_name?: string | null
          representative_position?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          seedlings_requested?: number
          status?: Database["public"]["Enums"]["tree_app_status"]
          submission_date?: string
          survival_rate_commitment?: string | null
          tracking_tool_commitment?: boolean
          training_commitment?: boolean
          updated_at?: string
          volunteers?: number
        }
        Relationships: []
      }
      tree_planting_logs: {
        Row: {
          application_id: string
          created_at: string
          distribution_id: string | null
          id: string
          latitude: number | null
          location_name: string | null
          logged_by: string | null
          longitude: number | null
          notes: string | null
          photo_url: string | null
          planting_date: string
          species: string | null
          survival_rate: number | null
          trees_planted: number
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          distribution_id?: string | null
          id?: string
          latitude?: number | null
          location_name?: string | null
          logged_by?: string | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          planting_date?: string
          species?: string | null
          survival_rate?: number | null
          trees_planted: number
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          distribution_id?: string | null
          id?: string
          latitude?: number | null
          location_name?: string | null
          logged_by?: string | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          planting_date?: string
          species?: string | null
          survival_rate?: number | null
          trees_planted?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tree_planting_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "tree_campaign_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tree_planting_logs_distribution_id_fkey"
            columns: ["distribution_id"]
            isOneToOne: false
            referencedRelation: "tree_seed_distributions"
            referencedColumns: ["id"]
          },
        ]
      }
      tree_seed_distributions: {
        Row: {
          application_id: string
          batch_code: string | null
          created_at: string
          distributed_by: string | null
          distribution_date: string
          id: string
          notes: string | null
          quantity: number
          species: string
          updated_at: string
        }
        Insert: {
          application_id: string
          batch_code?: string | null
          created_at?: string
          distributed_by?: string | null
          distribution_date?: string
          id?: string
          notes?: string | null
          quantity: number
          species: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          batch_code?: string | null
          created_at?: string
          distributed_by?: string | null
          distribution_date?: string
          id?: string
          notes?: string | null
          quantity?: number
          species?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tree_seed_distributions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "tree_campaign_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      applicant_type: "individual" | "organization"
      application_status: "pending" | "approved" | "rejected"
      report_status: "planted" | "growing" | "mature" | "failed"
      tree_app_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "seeds_distributed"
        | "completed"
      tree_campaign: "5_million_2025" | "10_million_2026"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      applicant_type: ["individual", "organization"],
      application_status: ["pending", "approved", "rejected"],
      report_status: ["planted", "growing", "mature", "failed"],
      tree_app_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "seeds_distributed",
        "completed",
      ],
      tree_campaign: ["5_million_2025", "10_million_2026"],
    },
  },
} as const
