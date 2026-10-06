import React from 'react';
import { Category } from '../types';
import { Search, X } from 'lucide-react';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  itemsCountByCategory: Record<string, number>;
  totalItems: number;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  itemsCountByCategory,
  totalItems
}) => {
  return (
    <section className="sticky top-0 z-30 bg-[#FFF5F7]/95 backdrop-blur-md pt-2 pb-2 px-3 border-b border-pink-100 shadow-2xs">
      <div className="max-w-md mx-auto space-y-2">
        {/* Search Bar with Touch ergonomics */}
        <div className="relative">
          <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar no cardápio (bolo, tapioca, café)..."
            className="w-full pl-9 pr-9 py-2 rounded-2xl bg-white border border-pink-200/90 text-sm text-gray-800 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-2xs transition-all"
            inputMode="search"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95 cursor-pointer"
              title="Limpar pesquisa"
              aria-label="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Bar (Horizontal Thumb Scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-0.5 touch-pan-x">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap px-3.5 py-1.5 min-h-[38px] rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1 active:scale-95 ${
              selectedCategory === 'all'
                ? 'bg-[#EC407A] text-white shadow-pink-glow'
                : 'bg-white text-gray-700 border border-pink-100/90 hover:bg-pink-50'
            }`}
          >
            <span>Todos</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-pink-50 text-pink-600'
            }`}>
              {totalItems}
            </span>
          </button>

          {categories.map((cat) => {
            const count = itemsCountByCategory[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-3 py-1.5 min-h-[38px] rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#EC407A] text-white shadow-pink-glow'
                    : 'bg-white text-gray-700 border border-pink-100/90 hover:bg-pink-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-pink-50 text-pink-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
