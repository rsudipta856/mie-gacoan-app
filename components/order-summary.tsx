"use client"

import type { CartItem, MenuItem } from "@/types"

interface OrderSummaryProps {
  cartItems: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onAddItem: (item: MenuItem) => void
  totalPrice: number
  onBack: () => void
  onProceedToPayment: () => void
  menuItems: MenuItem[]
}

export function OrderSummary({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onAddItem,
  totalPrice,
  onBack,
  onProceedToPayment,
  menuItems,
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  const subtotal = totalPrice
  const otherFees = 1000
  const total = subtotal + otherFees

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
            <div></div>
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

        {/* Related Menu */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Related Menu</h3>
          <div className="grid grid-cols-2 gap-3">
            {menuItems.slice(0, 2).map((item) => (
              <div key={`related-${item.id}`} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
                <h4 className="text-sm font-medium mb-1">{item.name}</h4>
                <p className="text-sm text-gray-900 font-semibold">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ordered Items */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Ordered Items ({cartItems.length})</h3>
            <button className="text-pink-600 text-sm">+ Add Item</button>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <button className="text-gray-400">✏️ Edit</button>
                </div>
                <p className="text-sm text-gray-500 mb-2">📝 No notes yet</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{formatPrice(item.price)}</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <button className="text-pink-600 text-sm">📝 Add another notes</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="font-semibold mb-3">Payment Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Subtotal ({cartItems.length} menu)</span>
              <span className="text-sm">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Other fees ▼</span>
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
      </main>
    </div>
  )
}
