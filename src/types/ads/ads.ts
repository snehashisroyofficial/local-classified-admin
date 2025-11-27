interface User {
  id: string;
  role: string;
  email: string;
  full_name: string;
  created_at: string; // ISO date string
  email_verified: boolean;
  user_avatar: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string; // ISO date string
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string; // ISO date string
  category_id: string;
}

interface Condition {
  id: string;
  key: string;
  type: string;
  label: string;
  description: string;
}

interface AdImage {
  id: string;
  image_url: string;
}

interface ContactPreferences {
  id: string;
  ad_id: string;
  email: boolean;
  phone: boolean;
  whatsapp: boolean;
  email_contact: string | null;
  phone_contact: number | null;
  whatsapp_contact: number | null;
}

interface AdTags {
  id: string;
  ad_id: string;
  tag: string;
  slug: string;
}

export interface Location {
  id: string; // uuid, primary key
  ad_id: string | null; // uuid, foreign key to ads.id
  latitude: number; // double precision
  longitude: number; // double precision
  geo: unknown | null; // geography (PostGIS) - usually handled as unknown or custom type
  address: string | null; // text
  city: string | null; // text
  state: string | null; // text
  country: string | null; // text
  created_at: string; // timestamptz (ISO string in JS)
}

export interface NearbyAd {
  ad_id: string;
  distance: number;
}
export interface AdvertisementType {
  id: string;
  user_id: User;
  category_id: Category;
  sub_category_id: SubCategory;
  title: string;
  description: string;
  price: number;
  condition: Condition;
  status: string;
  reject_reason: string | null;
  approved_by: User | null;
  approved_at: string | null; // ISO date string
  published_at: string | null; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  sold: boolean | null;
  ad_images: AdImage[];
  location: Location | null;
  distance?: number;
  contact_preferences?: ContactPreferences;
  ad_tags?: AdTags[];
  resubmit: boolean;
}
