"use client"

import { useState, useEffect } from "react"
import { supabase, type MenuItem } from "@/lib/supabase"

// Realistic menu data based on actual Mie Gacoan menu
const REALISTIC_MENU_ITEMS: MenuItem[] = [
  // MIE TAKE AWAY
  {
    id: "mie-1",
    name: "MIE SUIT",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "mie-2",
    name: "MIE GACOAN LEVEL 0",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "mie-3",
    name: "MIE GACOAN LEVEL 1",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "mie-4",
    name: "MIE GACOAN LEVEL 2",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "mie-5",
    name: "MIE GACOAN LEVEL 3",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "mie-6",
    name: "MIE GACOAN LEVEL 4",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "mie-7",
    name: "MIE GACOAN LEVEL 5",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "MIE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },

  // DIMSUM TAKE AWAY
  {
    id: "dimsum-1",
    name: "PANGSIT GORENG",
    price: 10000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "DIMSUM TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-2",
    name: "LUMPIA UDANG",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "DIMSUM TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-3",
    name: "UDANG KEJU",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "DIMSUM TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-4",
    name: "UDANG RAMBUTAN",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "DIMSUM TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-5",
    name: "SIOMAY",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "DIMSUM TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-6",
    name: "HAKAU",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "DIMSUM TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },

  // ES BUAH TAKE AWAY
  {
    id: "esbuah-1",
    name: "ES TEKLEK",
    price: 6364,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "ES BUAH TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "esbuah-2",
    name: "ES GOBAK SODOR",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "ES BUAH TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "esbuah-3",
    name: "ES PETAK UMPET",
    price: 9091,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "ES BUAH TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "esbuah-4",
    name: "ES SLUKU BATHOK",
    price: 6364,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "ES BUAH TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "esbuah-5",
    name: "ES CINGCAU",
    price: 5455,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "ES BUAH TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "esbuah-6",
    name: "ES KELAPA MUDA",
    price: 8182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "ES BUAH TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },

  // BEVERAGES ICE TAKE AWAY
  {
    id: "beverage-1",
    name: "CHOCOAN - ICE JS",
    price: 8182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-2",
    name: "ORANGE - ICED JS",
    price: 5455,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-3",
    name: "TEH TARIK - ICE JS",
    price: 6819,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-4",
    name: "VANILLA LATTE - ICE JS",
    price: 8182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-5",
    name: "CAPPUCCINO - ICE JS",
    price: 8182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-6",
    name: "AMERICANO - ICE JS",
    price: 7273,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-7",
    name: "LEMON TEA - ICE JS",
    price: 5455,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-8",
    name: "MINERAL WATER",
    price: 4546,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES ICE TAKE AWAY",
    is_available: true,
    created_at: new Date().toISOString(),
  },

  // BEVERAGES HOT
  {
    id: "hot-1",
    name: "TEH TARIK - HOT",
    price: 6819,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES HOT",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "hot-2",
    name: "VANILLA LATTE - HOT",
    price: 8182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES HOT",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "hot-3",
    name: "CAPPUCCINO - HOT",
    price: 8182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES HOT",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "hot-4",
    name: "AMERICANO - HOT",
    price: 7273,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES HOT",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "hot-5",
    name: "LEMON TEA - HOT",
    price: 5455,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "BEVERAGES HOT",
    is_available: true,
    created_at: new Date().toISOString(),
  },
]

export function useSupabaseMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)

      // Check if Supabase is properly configured
      const isSupabaseConfigured =
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"

      if (!isSupabaseConfigured) {
        // Use realistic menu data for development
        console.log("Using realistic menu data - Supabase not configured")
        setMenuItems(REALISTIC_MENU_ITEMS)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: true })

      if (error) throw error
      setMenuItems(data || [])
    } catch (err) {
      console.error("Error fetching menu items:", err)
      // Fallback to realistic menu data on error
      setMenuItems(REALISTIC_MENU_ITEMS)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { menuItems, loading, error, refetch: fetchMenuItems }
}
