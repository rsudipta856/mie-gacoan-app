"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, type Order, type MenuItem } from "@/lib/supabase"
import { useStoreSettings } from "@/hooks/use-store-settings"

export default function AdminDashboard() {
  const router = useRouter()
  const { settings, updateSettings } = useStoreSettings()
  const [orders, setOrders] = useState<Order[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"orders" | "settings" | "menu">("orders")

  // Menu form state
  const [showMenuForm, setShowMenuForm] = useState(false)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [menuForm, setMenuForm] = useState({
    name: "",
    price: "",
    category: "NOODLE",
    description: "",
    spice_level: "0",
    is_available: true,
  })

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem("isAdmin")
    if (!isAdmin) {
      router.push("/")
      return
    }

    fetchOrders()
    fetchMenuItems()
  }, [router])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error("Error fetching orders:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase.from("menu_items").select("*").order("category", { ascending: true })

      if (error) throw error
      setMenuItems(data || [])
    } catch (err) {
      console.error("Error fetching menu items:", err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.push("/")
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase.from("orders").update({ status }).eq("id", orderId)

      if (error) throw error
      fetchOrders()
    } catch (err) {
      console.error("Error updating order status:", err)
    }
  }

  const toggleStoreStatus = async () => {
    if (settings) {
      await updateSettings({ is_open: !settings.is_open })
    }
  }

  const updateStoreHours = async (opening_hours: string, closing_hours: string) => {
    await updateSettings({ opening_hours, closing_hours })
  }

  // Menu CRUD functions
  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const menuData = {
        name: menuForm.name,
        price: Number.parseInt(menuForm.price),
        category: menuForm.category,
        description: menuForm.description,
        spice_level: Number.parseInt(menuForm.spice_level),
        is_available: menuForm.is_available,
        image_url: menuForm.category === "BEVERAGE" ? "/images/beverages.png" : "/images/food-menu.png",
      }

      if (editingMenu) {
        // Update existing menu
        const { error } = await supabase.from("menu_items").update(menuData).eq("id", editingMenu.id)

        if (error) throw error
      } else {
        // Create new menu
        const { error } = await supabase.from("menu_items").insert([menuData])

        if (error) throw error
      }

      // Reset form and refresh data
      setMenuForm({
        name: "",
        price: "",
        category: "NOODLE",
        description: "",
        spice_level: "0",
        is_available: true,
      })
      setEditingMenu(null)
      setShowMenuForm(false)
      fetchMenuItems()
    } catch (err) {
      console.error("Error saving menu item:", err)
      alert("Error saving menu item")
    }
  }

  const handleEditMenu = (menu: MenuItem) => {
    setEditingMenu(menu)
    setMenuForm({
      name: menu.name,
      price: menu.price.toString(),
      category: menu.category,
      description: menu.description || "",
      spice_level: (menu.spice_level || 0).toString(),
      is_available: menu.is_available,
    })
    setShowMenuForm(true)
  }

  const handleDeleteMenu = async (menuId: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return

    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", menuId)

      if (error) throw error
      fetchMenuItems()
    } catch (err) {
      console.error("Error deleting menu item:", err)
      alert("Error deleting menu item")
    }
  }

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("menu")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "menu"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Menu Management ({menuItems.length})
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "settings"
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Store Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {orders.length === 0 ? (
                  <div className="px-6 py-8 text-center text-gray-500">No orders yet</div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="px-6 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{order.customer_name}</h3>
                          <p className="text-sm text-gray-500">{order.customer_phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total_amount)}</p>
                          <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString("id-ID")}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Items:</p>
                        <ul className="text-sm text-gray-800">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity}x Item (Rp{item.price.toLocaleString("id-ID")})
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>

                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : order.status === "ready"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Menu Management Tab */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Menu Management</h2>
              <button
                onClick={() => {
                  setShowMenuForm(true)
                  setEditingMenu(null)
                  setMenuForm({
                    name: "",
                    price: "",
                    category: "NOODLE",
                    description: "",
                    spice_level: "0",
                    is_available: true,
                  })
                }}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
              >
                Add New Menu
              </button>
            </div>

            {/* Menu Form Modal */}
            {showMenuForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-semibold mb-4">{editingMenu ? "Edit Menu Item" : "Add New Menu Item"}</h3>

                  <form onSubmit={handleMenuSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={menuForm.name}
                        onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                      <input
                        type="number"
                        value={menuForm.price}
                        onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={menuForm.category}
                        onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="NOODLE">NOODLE</option>
                        <option value="DIMSUM">DIMSUM</option>
                        <option value="BEVERAGE">BEVERAGE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={menuForm.description}
                        onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Spice Level</label>
                      <select
                        value={menuForm.spice_level}
                        onChange={(e) => setMenuForm({ ...menuForm, spice_level: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((level) => (
                          <option key={level} value={level}>
                            Level {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_available"
                        checked={menuForm.is_available}
                        onChange={(e) => setMenuForm({ ...menuForm, is_available: e.target.checked })}
                        className="mr-2"
                      />
                      <label htmlFor="is_available" className="text-sm font-medium text-gray-700">
                        Available
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
                      >
                        {editingMenu ? "Update" : "Add"} Menu
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMenuForm(false)
                          setEditingMenu(null)
                        }}
                        className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Menu Items List */}
            <div className="bg-white rounded-lg shadow">
              <div className="divide-y divide-gray-200">
                {menuItems.map((menu) => (
                  <div key={menu.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{menu.name}</h3>
                        <p className="text-sm text-gray-500">
                          {menu.category} • {formatPrice(menu.price)}
                        </p>
                        <p className="text-sm text-gray-400">{menu.description}</p>
                        {menu.spice_level && menu.spice_level > 0 && (
                          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                            🌶️ Level {menu.spice_level}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            menu.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {menu.is_available ? "Available" : "Unavailable"}
                        </span>

                        <button
                          onClick={() => handleEditMenu(menu)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteMenu(menu.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Store Status</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Store is currently {settings?.is_open ? "OPEN" : "CLOSED"}</p>
                  <p className="text-sm text-gray-500">
                    Hours: {settings?.opening_hours} - {settings?.closing_hours}
                  </p>
                </div>
                <button
                  onClick={toggleStoreStatus}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    settings?.is_open
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {settings?.is_open ? "Close Store" : "Open Store"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Operating Hours</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const opening = formData.get("opening") as string
                  const closing = formData.get("closing") as string
                  updateStoreHours(opening, closing)
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                    <input
                      type="time"
                      name="opening"
                      defaultValue={settings?.opening_hours}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                    <input
                      type="time"
                      name="closing"
                      defaultValue={settings?.closing_hours}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button type="submit" className="mt-4 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg">
                  Update Hours
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
