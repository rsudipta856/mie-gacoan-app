"use client"

import { useState } from "react"
import type { MenuItem } from "@/types"

// Updated menu items - hapus yang lama, pakai yang baru
const DEMO_ITEMS: MenuItem[] = [
  // NOODLE CATEGORY
  {
    id: "noodle-1",
    name: "MIE SUIT",
    price: 10500,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-2",
    name: "MIE GACOAN LV 1",
    price: 10500,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-3",
    name: "MIE GACOAN LV 2",
    price: 10500,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-4",
    name: "MIE GACOAN LV 3",
    price: 10500,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-5",
    name: "MIE GACOAN LV 4",
    price: 10500,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-6",
    name: "MIE GACOAN LV 6",
    price: 11400,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-7",
    name: "MIE GACOAN LV 7",
    price: 11400,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },
  {
    id: "noodle-8",
    name: "MIE GACOAN LV 8",
    price: 11400,
    image_url: "/images/food-menu.png",
    category: "NOODLE",
    created_at: new Date().toISOString(),
  },

  // DIMSUM CATEGORY
  {
    id: "dimsum-1",
    name: "SIOMAY",
    price: 9500,
    image_url: "/images/food-menu.png",
    category: "DIMSUM",
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-2",
    name: "UDANG RAMBUTAN",
    price: 9500,
    image_url: "/images/food-menu.png",
    category: "DIMSUM",
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-3",
    name: "UDANG KEJU",
    price: 9500,
    image_url: "/images/food-menu.png",
    category: "DIMSUM",
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-4",
    name: "LUMPIA UDANG",
    price: 9500,
    image_url: "/images/food-menu.png",
    category: "DIMSUM",
    created_at: new Date().toISOString(),
  },
  {
    id: "dimsum-5",
    name: "PANGSIT GORENG",
    price: 10500,
    image_url: "/images/food-menu.png",
    category: "DIMSUM",
    created_at: new Date().toISOString(),
  },

  // BEVERAGE CATEGORY
  {
    id: "beverage-1",
    name: "ES GOBAK SODOR",
    price: 9500,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-2",
    name: "ES TEKLEK",
    price: 6400,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-3",
    name: "ES SLUKU BATHOK",
    price: 6400,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-4",
    name: "ES PETAK UMPET",
    price: 9500,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-5",
    name: "AIR MINERAL",
    price: 4500,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-6",
    name: "LEMON TEA",
    price: 6800,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-7",
    name: "MILO",
    price: 8600,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-8",
    name: "ORANGE",
    price: 5400,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-9",
    name: "TEH",
    price: 4500,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-10",
    name: "TEH TARIK",
    price: 6800,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-11",
    name: "VANILLA LATTE",
    price: 8600,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-12",
    name: "THAI TEA",
    price: 8600,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-13",
    name: "GREEN THAI TEA",
    price: 8600,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
  {
    id: "beverage-14",
    name: "COKELAT",
    price: 8600,
    image_url: "/images/beverages.png",
    category: "BEVERAGE",
    created_at: new Date().toISOString(),
  },
]

export function useMenuItems() {
  const [menuItems] = useState<MenuItem[]>(DEMO_ITEMS)
  const [loading] = useState(false)

  return { menuItems, loading }
}
