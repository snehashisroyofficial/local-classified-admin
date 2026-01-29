export type userType = {
  email: string;
  full_name: string;
};

type Role = "user" | "admin" | "moderator";

export interface UserInfoType {
  id: string; // uuid
  full_name?: string | null; // text, nullable
  email?: string | null; // text, nullable
  email_verified: boolean; // boolean, default false
  role: Role; // public.role, default 'user'
  created_at: string; // timestamp with time zone (ISO string in JS)
  user_avatar?: string | null; // text, nullable
  last_login?: string | null; // timestamp with time zone (ISO string in JS), nullable
  phone?: number | null;
  is_phone_whatsapp: boolean;
}
