"use client"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categoryDisplayNames: { [key: string]: string } = {
    "MIE TAKE AWAY": "MIE",
    "DIMSUM TAKE AWAY": "DIMSUM",
    "ES BUAH TAKE AWAY": "ES BUAH",
    "BEVERAGES ICE TAKE AWAY": "BEVERAGES",
    "BEVERAGES HOT": "HOT",
  }

  return (
    <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors text-sm ${
            selectedCategory === category ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {categoryDisplayNames[category] || category}
        </button>
      ))}
    </div>
  )
}
