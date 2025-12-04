export interface User {
  id: string; // uuid
  full_name?: string | null; // text, nullable
  email?: string | null; // text, nullable
  email_verified: boolean; // boolean, default false
  role: string; // public.role enum
  created_at: string; // timestamp with time zone, ISO string
  user_avatar?: string | null; // text, nullable
  last_login?: string | null; // timestamp with time zone, nullable
  phone?: number | null; // numeric, nullable
  is_phone_whatsapp: boolean; // boolean, default false
  last_updated: string; // timestamp with time zone, ISO string
}
