import React from 'react';
import { Layers, RotateCcw } from 'lucide-react';

export default function CategoryFilter({ categories, activeCategory, onSelectCategory, categoryCounts = {} }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const count = categoryCounts[category];
        const isUsedTab = category === "المنتجات المستعملة";

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              isActive
                ? isUsedTab
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 scale-[1.02]'
                  : 'bg-teal-600 text-white shadow-md shadow-teal-600/25 scale-[1.02]'
                : isUsedTab
                ? 'bg-amber-50/80 text-amber-900 border border-amber-200 hover:bg-amber-100'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-teal-600 border border-gray-200'
            }`}
          >
            {isUsedTab && <RotateCcw className="w-3.5 h-3.5 shrink-0" />}
            <span>{category}</span>
            {count !== undefined && (
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
