import React from 'react';
import { formatBRL } from '../data/menu';
import { ShoppingBag, ChevronRight } from 'lucide-react';

interface FloatingCartBarProps {
  totalItems: number;
  totalPrice: number;
  onOpenCart: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  totalItems,
  totalPrice,
  onOpenCart
}) => {
  if (totalItems <= 0) return null;

  return (
    <div className="fixed bottom-20 inset-x-3 max-w-md mx-auto z-30 animate-slideUp">
      <button
        type="button"
        onClick={onOpenCart}
        className="w-full min-h-[50px] bg-gradient-to-r from-[#EC407A] to-[#D81B60] hover:from-[#e03570] hover:to-[#c21453] active:scale-[0.98] text-white py-2.5 px-3.5 rounded-2xl shadow-pink-glow flex items-center justify-between font-semibold transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative bg-white/20 p-1.5 rounded-xl">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1.5 -right-1.5 bg-yellow-300 text-[#5D4037] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
              {totalItems}
            </span>
          </div>

          <div className="text-left">
            <span className="text-[11px] text-pink-100 block font-normal leading-none">
              Ver sacola
            </span>
            <span className="text-xs sm:text-sm font-bold text-white leading-tight">
              {totalItems} {totalItems === 1 ? 'item adicionado' : 'itens adicionados'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-bold bg-white/20 px-2.5 py-1 rounded-xl tabular-nums">
            {formatBRL(totalPrice)}
          </span>
          <ChevronRight className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>
    </div>
  );
};
