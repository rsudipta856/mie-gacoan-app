import { createClient } from "@supabase/supabase-js"

// Check if we're in development and provide fallback values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

// Only create client if we have valid credentials
let supabase: any = null

if (supabaseUrl !== "https://your-project.supabase.co" && supabaseAnonKey !== "your-anon-key") {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Mock client for development
  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ order: () => ({ data: [], error: null }) }) }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ eq: () => ({ data: null, error: null }) }),
      single: () => ({ data: null, error: null }),
    }),
  }
}

export { supabase }

// Updated types for our database
export interface MenuItem {
  id: string
  name: string
  price: number
  image_url: string
  category: string
  is_available: boolean
  description?: string
  spice_level?: number
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  items: OrderItem[]
  total_amount: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
  order_type: "pickup" | "delivery"
  payment_method?: string
  notes?: string
  created_at: string
}

export interface OrderItem {
  menu_item_id: string
  quantity: number
  price: number
  notes?: string
}

export interface StoreSettings {
  id: string
  is_open: boolean
  opening_hours: string
  closing_hours: string
  updated_at: string
}
