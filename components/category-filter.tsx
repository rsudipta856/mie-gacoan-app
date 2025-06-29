"use client"

import { useState } from "react"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const categoryDisplayNames: { [key: string]: string } = {
    MIE: "🍜 MIE",
    DIMSUM: "🥟 DIMSUM",
    "MINUMAN DINGIN": "🧊 MINUMAN DINGIN",
    "MINUMAN PANAS": "☕ MINUMAN PANAS",
  }

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{categoryDisplayNames[selectedCategory] || selectedCategory}</span>
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  selectedCategory === category ? "bg-pink-50 text-pink-600 font-medium" : "text-gray-700"
                }`}
              >
                {categoryDisplayNames[category] || category}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
