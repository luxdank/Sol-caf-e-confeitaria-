import React from 'react';
import { MenuItem } from '../types';
import { formatBRL } from '../data/menu';
import { Plus, Check } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onOpenModal: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  quantityInCart?: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onOpenModal,
  onQuickAdd,
  quantityInCart = 0
}) => {
  const isAvailable = item.isAvailable !== false;

  return (
    <div
      onClick={() => onOpenModal(item)}
      className={`bg-white rounded-2xl border p-3 sm:p-3.5 transition-all duration-150 cursor-pointer flex items-center justify-between gap-3 relative group active:scale-[0.985] ${
        isAvailable
          ? 'border-pink-100 hover:border-pink-300 shadow-2xs hover:shadow-xs'
          : 'border-gray-200 opacity-60'
      }`}
    >
      {/* Left Text & Details Content */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm shrink-0">{item.icon || '☕'}</span>
          <h3 className="text-sm font-semibold text-[#5D4037] leading-snug group-hover:text-pink-600 transition-colors">
            {item.name}
          </h3>
          {quantityInCart > 0 && (
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full inline-flex items-center gap-0.5">
              <Check className="w-2.5 h-2.5" />
              {quantityInCart}x
            </span>
          )}
        </div>

        {item.desc && item.desc !== '—' && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {item.desc}
          </p>
        )}

        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-sm font-bold text-pink-600 tabular-nums">
            {formatBRL(item.price)}
          </span>

          {item.options && item.options.length > 0 && (
            <span className="text-[10px] text-pink-600/90 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200/60 font-medium">
              {item.options.length} opções
            </span>
          )}
        </div>
      </div>

      {/* Right Slot: Image and Touch-Friendly Quick Add Button */}
      <div className="relative shrink-0 flex items-center justify-center">
        {item.image ? (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 relative shadow-2xs">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-pink-50 text-pink-300 text-2xl">${item.icon || '🧁'}</div>`;
                }
              }}
            />
            {item.highlight && (
              <span className="absolute top-1 left-1 bg-pink-600/95 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md shadow-xs">
                Favorito
              </span>
            )}
          </div>
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-pink-50/80 border border-pink-100 flex items-center justify-center text-2xl shadow-2xs">
            <span>{item.icon || '☕'}</span>
          </div>
        )}

        {/* Quick Add Action Button with $\ge 44 \times 44\text{px}$ touch target */}
        {isAvailable ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(item);
            }}
            className="absolute -bottom-2 -right-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-pink-600 group-hover:text-white cursor-pointer active:scale-90 transition-transform"
            title={item.options ? 'Escolher sabor' : 'Adicionar rápido'}
            aria-label={`Adicionar ${item.name}`}
          >
            <div className="w-8 h-8 rounded-xl bg-pink-50 group-hover:bg-[#EC407A] text-pink-600 group-hover:text-white flex items-center justify-center shadow-xs border border-pink-200/80 group-hover:border-transparent transition-colors">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        ) : (
          <span className="absolute -bottom-1 -right-1 text-[9px] text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
            Esgotado
          </span>
        )}
      </div>
    </div>
  );
};
