"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function UserMenu({ isOpen, onClose }: UserMenuProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: "", password: "" })
  const router = useRouter()

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple admin check (in production, use proper authentication)
    if (adminCredentials.username === "admin" && adminCredentials.password === "admin123") {
      localStorage.setItem("isAdmin", "true")
      router.push("/admin")
      onClose()
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-xl">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            {!showAdminLogin ? (
              <div className="space-y-4">
                {/* User Profile */}
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="font-semibold mb-2">Log in as Guest</h3>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">Sign In</button>
                </div>

                {/* Menu Items */}
                <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <span className="text-xl">📋</span>
                    <span>Order History</span>
                  </button>

                  {/* Admin Login Button */}
                  <button
                    onClick={() => setShowAdminLogin(true)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-red-600"
                  >
                    <span className="text-xl">⚙️</span>
                    <span>Admin Login</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <button onClick={() => setShowAdminLogin(false)} className="flex items-center gap-2 text-gray-600 mb-4">
                  ← Back
                </button>

                <h3 className="text-lg font-semibold mb-4">Admin Login</h3>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="text"
                      value={adminCredentials.username}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-medium"
                  >
                    Login
                  </button>
                </form>

                <div className="text-xs text-gray-500 mt-4">
                  <p>Demo credentials:</p>
                  <p>Username: admin</p>
                  <p>Password: admin123</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
