"use client"

import { useState, useMemo } from "react"
import { useSupabaseMenu } from "@/hooks/use-supabase-menu"
import { useStoreSettings } from "@/hooks/use-store-settings"
import { useCart } from "@/hooks/use-cart"
import { MenuCard } from "@/components/menu-card"
import { CategoryFilter } from "@/components/category-filter"
import { UserMenu } from "@/components/user-menu"
import { OrderSummary } from "@/components/order-summary"
import { PaymentPage } from "@/components/payment-page"
import { SetupNotice } from "@/components/setup-notice"

export default function Home() {
  const { menuItems, loading } = useSupabaseMenu()
  const { settings: storeSettings } = useStoreSettings()
  const { cartItems, addToCart, updateQuantity, getTotalItems, getTotalPrice, isLoaded } = useCart()

  const [selectedCategory, setSelectedCategory] = useState("MIE TAKE AWAY")
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<"menu" | "order" | "payment">("menu")

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(menuItems.map((item) => item.category)))
    return uniqueCategories.sort()
  }, [menuItems])

  // Filter menu items by category
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => item.category === selectedCategory)
  }, [menuItems, selectedCategory])

  const handleCheckout = () => {
    setCurrentPage("order")
  }

  const handleProceedToPayment = () => {
    setCurrentPage("payment")
  }

  const handleBackToMenu = () => {
    setCurrentPage("menu")
  }

  const handleBackToOrder = () => {
    setCurrentPage("order")
  }

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat menu...</p>
        </div>
      </div>
    )
  }

  // Check if store is closed
  if (!storeSettings?.is_open) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Maaf, Kami Sedang Tutup</h1>
          <p className="text-gray-600 mb-2">Jam Operasional:</p>
          <p className="text-gray-800 font-semibold">
            {storeSettings?.opening_hours} - {storeSettings?.closing_hours}
          </p>
        </div>
      </div>
    )
  }

  if (currentPage === "payment") {
    return <PaymentPage onBack={handleBackToOrder} totalAmount={getTotalPrice()} />
  }

  if (currentPage === "order") {
    return (
      <OrderSummary
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
        onBack={handleBackToMenu}
        onProceedToPayment={handleProceedToPayment}
        menuItems={menuItems}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button onClick={handleBackToMenu} className="mr-3 text-gray-600 text-xl">
                ←
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Mie Gacoan - Bangkalan</h1>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-600 text-xl">🔍</button>
              <button onClick={() => setIsUserMenuOpen(true)} className="text-gray-600 text-xl">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Setup Notice */}
        <SetupNotice />

        {/* Store Info */}
        <div className="mb-4">
          <h2 className="text-sm text-gray-600">{selectedCategory}</h2>
          <h3 className="font-semibold text-gray-900">{filteredItems.length} menu tersedia</h3>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4 mb-20">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              cartItems={cartItems}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍜</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Menu Tidak Tersedia</h3>
            <p className="text-gray-600">Silakan pilih kategori lain</p>
          </div>
        )}
      </main>

      {/* Fixed Checkout Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {getTotalItems()}
              </span>
              <span className="font-semibold">Total</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              CHECK OUT ({getTotalItems()})
            </button>
          </div>
        </div>
      )}

      {/* User Menu Sidebar */}
      <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
    </div>
  )
}
