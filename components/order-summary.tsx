"use client"

import type { CartItem } from "@/types"
import { ClearCartButton } from "./clear-cart-button"

interface OrderSummaryProps {
  cartItems: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  totalPrice: number
  onBack: () => void
  onProceedToPayment: () => void
  menuItems: any[]
  onClearCart: () => void
}

export function OrderSummary({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onBack,
  onProceedToPayment,
  menuItems,
  onClearCart,
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  const subtotal = totalPrice
  const otherFees = 1000
  const total = subtotal + otherFees

  const handleDecrease = (itemId: string, currentQuantity: number) => {
    if (currentQuantity === 1) {
      // Jika quantity = 1, hapus item dari cart
      onRemoveItem(itemId)
    } else {
      // Jika quantity > 1, kurangi 1
      onUpdateQuantity(itemId, currentQuantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button onClick={onBack} className="text-gray-600 text-xl">
              ←
            </button>
            <h1 className="text-lg font-semibold">Order</h1>
            <ClearCartButton onClearCart={onClearCart} />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Order Type */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-6 flex items-center justify-between">
          <span className="text-sm text-gray-700">Order Type</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Pick Up</span>
            <span className="text-pink-600">⭕</span>
          </div>
        </div>

        {/* Pickup Now */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-xl">🏃</span>
            <span className="font-medium">Pickup Now</span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Ordered Items ({cartItems.length})</h3>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex-1 pr-2">{item.name}</h4>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-pink-500 hover:text-pink-700 text-lg p-1"
                    title="Hapus item"
                  >
                    🗑️
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">📝 No notes yet</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{formatPrice(item.price)}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      className="w-8 h-8 rounded-full border border-pink-600 flex items-center justify-center hover:bg-pink-50 text-pink-600"
                    >
                      −
                    </button>
                    <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-right text-sm text-gray-600">
                  Subtotal: {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {cartItems.length === 0 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Keranjang Kosong</h3>
              <p className="text-gray-600 mb-4">Belum ada item yang dipilih</p>
              <button onClick={onBack} className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg">
                Pilih Menu
              </button>
            </div>
          )}
        </div>

        {/* Payment Details */}
        {cartItems.length > 0 && (
          <>
            <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
              <h3 className="font-semibold mb-3">Payment Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal ({cartItems.length} menu)</span>
                  <span className="text-sm">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Other fees</span>
                  <span className="text-sm">{formatPrice(otherFees)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-pink-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Total Payment */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-xl font-bold">{formatPrice(total)}</p>
                </div>
                <button
                  onClick={onProceedToPayment}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  Payment
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
