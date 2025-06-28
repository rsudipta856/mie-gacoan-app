"use client"

import { useState } from "react"
import type { MenuItem } from "@/types"

const DEMO_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "GACOAN COMBAT NP F",
    price: 48182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "PAKET",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "GACOAN COMBAT NP E",
    price: 48182,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "PAKET",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "GACOAN COMBAT TAKE AWAY SPECIAL",
    price: 52000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "GACOAN COMBAT TAKE AWAY",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "PAKET FEST COMBO",
    price: 65000,
    image_url: "/placeholder.svg?height=200&width=200",
    category: "PAKET FEST",
    created_at: new Date().toISOString(),
  },
]

export function useMenuItems() {
  const [menuItems] = useState<MenuItem[]>(DEMO_ITEMS)
  const [loading] = useState(false)

  return { menuItems, loading }
}
