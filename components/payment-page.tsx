"use client"

import type React from "react"

import { useState } from "react"

interface PaymentPageProps {
  onBack: () => void
  totalAmount: number
}

export function PaymentPage({ onBack, totalAmount }: PaymentPageProps) {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  })

  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString("id-ID")}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Payment submitted!")
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
            <h1 className="text-lg font-semibold">Payment</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit}>
          {/* Order Type */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-6 flex items-center justify-between">
            <span className="text-sm text-gray-700">Order Type</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Pick Up</span>
              <span className="text-pink-600">⭕</span>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-semibold mb-4">Customer Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</span>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (for upcoming promos)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📞</span>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerInfo.phoneNumber}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phoneNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Receipt to Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">✉️</span>
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method - Only QRIS */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-semibold mb-4">Payment Method</h3>

            <div className="p-3 border-2 border-pink-600 bg-pink-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">QR</span>
                </div>
                <span className="font-medium">QRIS</span>
              </div>
              <input type="radio" name="payment" className="w-4 h-4 text-pink-600" defaultChecked />
            </div>
          </div>

          {/* Payment Total */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Payment Total</p>
                <p className="text-xl font-bold">{formatPrice(totalAmount + 1000)}</p>
              </div>
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                Payment
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
