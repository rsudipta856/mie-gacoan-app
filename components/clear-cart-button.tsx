"use client"

interface ClearCartButtonProps {
  onClearCart: () => void
}

export function ClearCartButton({ onClearCart }: ClearCartButtonProps) {
  const handleClearCart = () => {
    if (confirm("Hapus semua item dari keranjang?")) {
      onClearCart()
      // Also clear localStorage directly
      if (typeof window !== "undefined") {
        localStorage.removeItem("mie-gacoan-cart")
      }
    }
  }

  return (
    <button onClick={handleClearCart} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm">
      🗑️ Clear Cart
    </button>
  )
}
