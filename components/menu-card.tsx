"use client"

import Image from "next/image"
import type { MenuItem, CartItem } from "@/types"

interface MenuCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  cartItems: CartItem[]
}

export function MenuCard({ item, onAddToCart, onUpdateQuantity, cartItems }: MenuCardProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id)
  const quantity = cartItem?.quantity || 0

  const handleDecrease = () => {
    if (quantity === 1) {
      // Jika quantity = 1, hapus item dari cart
      onUpdateQuantity(item.id, 0)
    } else {
      // Jika quantity > 1, kurangi 1
      onUpdateQuantity(item.id, quantity - 1)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="relative h-40 w-full bg-gray-200">
        <Image
          src={item.image_url || "/placeholder.svg?height=160&width=300"}
          alt={item.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "/placeholder.svg?height=160&width=300"
          }}
        />

      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
        <p className="text-lg font-bold text-gray-900 mb-3">{formatPrice(item.price)}</p>

        {quantity === 0 ? (
          <button
            onClick={() => onAddToCart(item)}
            className="w-full bg-white border-2 border-pink-600 text-pink-600 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 rounded-full border-2 border-pink-600 flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors"
            >
              −
            </button>
            <span className="font-semibold text-lg min-w-[2rem] text-center">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, quantity + 1)}
              className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
