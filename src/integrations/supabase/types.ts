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
      borehole_applicants: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          role: string | null
          source_user_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          phone?: string | null
          role?: string | null
          source_user_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: string | null
          source_user_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      borehole_applications: {
        Row: {
          admin_remark: string | null
          beneficiaries_range: string
          community_leader: string | null
          community_name: string
          created_at: string
          declaration: boolean
          full_name: string
          id: string
          lga: string
          location_photo: string | null
          phone_number: string
          source_user_id: string | null
          status: string
          tracking_number: string
          updated_at: string
          ward: string
          working_borehole: boolean
        }
        Insert: {
          admin_remark?: string | null
          beneficiaries_range: string
          community_leader?: string | null
          community_name: string
          created_at?: string
          declaration?: boolean
          full_name: string
          id?: string
          lga: string
          location_photo?: string | null
          phone_number: string
          source_user_id?: string | null
          status?: string
          tracking_number: string
          updated_at?: string
          ward: string
          working_borehole?: boolean
        }
        Update: {
          admin_remark?: string | null
          beneficiaries_range?: string
          community_leader?: string | null
          community_name?: string
          created_at?: string
          declaration?: boolean
          full_name?: string
          id?: string
          lga?: string
          location_photo?: string | null
          phone_number?: string
          source_user_id?: string | null
          status?: string
          tracking_number?: string
          updated_at?: string
          ward?: string
          working_borehole?: boolean
        }
        Relationships: []
      }
      borehole_audit_logs: {
        Row: {
          action: string
          application_id: string | null
          created_at: string
          details: string | null
          id: string
          source_admin_id: string | null
        }
        Insert: {
          action: string
          application_id?: string | null
          created_at?: string
          details?: string | null
          id?: string
          source_admin_id?: string | null
        }
        Update: {
          action?: string
          application_id?: string | null
          created_at?: string
          details?: string | null
          id?: string
          source_admin_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "borehole_audit_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "borehole_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      borehole_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          source_user_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          source_user_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          source_user_id?: string | null
          title?: string
        }
        Relationships: []
      }
      climate_actors: {
        Row: {
          actor_type: string
          approved_at: string | null
          approved_by: string | null
          contact_email: string
          contact_name: string
          contact_phone: string | null
          created_at: string
          description: string | null
          focus_areas: string[]
          id: string
          lga_operations: string[]
          logo_url: string | null
          organization_name: string
          password_hash: string | null
          rejection_reason: string | null
          status: string
          updated_at: string
          website_url: string | null
          year_established: number | null
        }
        Insert: {
          actor_type: string
          approved_at?: string | null
          approved_by?: string | null
          contact_email: string
          contact_name: string
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          focus_areas?: string[]
          id?: string
          lga_operations?: string[]
          logo_url?: string | null
          organization_name: string
          password_hash?: string | null
          rejection_reason?: string | null
          status?: string
          updated_at?: string
          website_url?: string | null
          year_established?: number | null
        }
        Update: {
          actor_type?: string
          approved_at?: string | null
          approved_by?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          focus_areas?: string[]
          id?: string
          lga_operations?: string[]
          logo_url?: string | null
          organization_name?: string
          password_hash?: string | null
          rejection_reason?: string | null
          status?: string
          updated_at?: string
          website_url?: string | null
          year_established?: number | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          handled_at: string | null
          handled_by: string | null
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
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
      planters: {
        Row: {
          active: boolean
          application_id: string
          assigned_district: string | null
          assigned_site: string | null
          created_at: string
          full_name: string
          id: string
          phone: string
          pin_hash: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          application_id: string
          assigned_district?: string | null
          assigned_site?: string | null
          created_at?: string
          full_name: string
          id?: string
          phone: string
          pin_hash: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          application_id?: string
          assigned_district?: string | null
          assigned_site?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string
          pin_hash?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "planters_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "tree_campaign_applications"
            referencedColumns: ["id"]
          },
        ]
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
      reports: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          photos: string[]
          reporter_email: string | null
          reporter_name: string | null
          reporter_phone: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          photos?: string[]
          reporter_email?: string | null
          reporter_name?: string | null
          reporter_phone?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          photos?: string[]
          reporter_email?: string | null
          reporter_name?: string | null
          reporter_phone?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          type?: string
          updated_at?: string
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
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
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
          district: string | null
          id: string
          latitude: number | null
          location_name: string | null
          logged_by: string | null
          longitude: number | null
          notes: string | null
          photo_url: string | null
          planter_id: string | null
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
          district?: string | null
          id?: string
          latitude?: number | null
          location_name?: string | null
          logged_by?: string | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          planter_id?: string | null
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
          district?: string | null
          id?: string
          latitude?: number | null
          location_name?: string | null
          logged_by?: string | null
          longitude?: number | null
          notes?: string | null
          photo_url?: string | null
          planter_id?: string | null
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
          {
            foreignKeyName: "tree_planting_logs_planter_id_fkey"
            columns: ["planter_id"]
            isOneToOne: false
            referencedRelation: "planters"
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
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_tree_campaign_directory:
        | {
            Args: {
              _limit?: number
              _offset?: number
              _search?: string
              _status?: string
            }
            Returns: {
              address: string
              organization_name: string
              organization_type: string
              status: string
            }[]
          }
        | {
            Args: {
              _limit?: number
              _location?: string
              _offset?: number
              _search?: string
              _status?: string
              _type?: string
            }
            Returns: {
              address: string
              organization_name: string
              organization_type: string
              status: string
            }[]
          }
      get_tree_campaign_directory_count:
        | { Args: { _search?: string; _status?: string }; Returns: number }
        | {
            Args: {
              _location?: string
              _search?: string
              _status?: string
              _type?: string
            }
            Returns: number
          }
      get_tree_campaign_directory_facets: {
        Args: { _status?: string }
        Returns: Json
      }
      get_tree_campaign_public_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_10m_application: { Args: { _app_id: string }; Returns: boolean }
      is_org_for_application: { Args: { _app_id: string }; Returns: boolean }
      is_tree_admin: { Args: { _user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user" | "org" | "tree_admin"
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
      app_role: ["admin", "user", "org", "tree_admin"],
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
