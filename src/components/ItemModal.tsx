import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { formatBRL } from '../data/menu';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    option?: string | null,
    notes?: string
  ) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedOption(item.options && item.options.length > 0 ? item.options[0] : null);
      setNotes('');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleConfirm = () => {
    onAddToCart(item, quantity, selectedOption, notes.trim());
    onClose();
  };

  const subtotal = item.price * quantity;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-pink-100">
          <span className="text-xs uppercase tracking-wider text-pink-600 font-semibold">
            Detalhes do Produto
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] rounded-full bg-pink-50 hover:bg-pink-100 active:scale-95 text-pink-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Fechar"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4 hide-scrollbar">
          {/* Product Photo Banner if available */}
          {item.image ? (
            <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-pink-50 relative shadow-inner">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {item.highlight && (
                <span className="absolute top-2.5 left-2.5 bg-pink-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  Favorito da Casa 💗
                </span>
              )}
            </div>
          ) : (
            <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-pink-50 via-pink-100/50 to-pink-50 flex items-center justify-center text-4xl shadow-inner">
              <span>{item.icon || '☕'}</span>
            </div>
          )}

          {/* Product Title & Price */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-[#5D4037] leading-tight">
                {item.name}
              </h2>
              <span className="text-lg sm:text-xl font-extrabold text-pink-600 whitespace-nowrap tabular-nums">
                {formatBRL(item.price)}
              </span>
            </div>
            {item.desc && (
              <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            )}
          </div>

          {/* Flavor / Options Selection */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-gray-800">
                Escolha seu sabor / opção:
              </label>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {item.options.map((option) => {
                  const isSelected = selectedOption === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedOption(option)}
                      className={`text-left p-3 min-h-[44px] rounded-xl border transition-all cursor-pointer flex items-center justify-between active:scale-[0.99] ${
                        isSelected
                          ? 'border-pink-500 bg-pink-50 text-pink-900 font-bold shadow-2xs'
                          : 'border-gray-200 text-gray-700 hover:border-pink-200 bg-white'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{option}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-pink-600 bg-pink-600' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions / Notes */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-medium text-gray-700 flex items-center justify-between">
              <span>Alguma observação especial?</span>
              <span className="text-[10px] text-gray-400">Opcional</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: sem cebola, açúcar separado, bem passado..."
              className="w-full text-sm p-3 min-h-[44px] rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800 placeholder-gray-400 bg-pink-50/30"
            />
          </div>
        </div>

        {/* Sticky Mobile Bottom Action Bar (Thumb Zone) */}
        <div className="p-4 border-t border-pink-100 bg-white/95 backdrop-blur-sm flex items-center gap-2.5 pb-safe">
          {/* Stepper with touch hitboxes $\ge 44\text{px}$ */}
          <div className="flex items-center border border-pink-200 rounded-xl p-1 bg-pink-50/60 shadow-2xs shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="min-w-[40px] min-h-[40px] rounded-lg bg-white active:bg-pink-100 flex items-center justify-center text-pink-600 font-bold shadow-2xs transition-colors cursor-pointer"
              title="Diminuir"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center text-sm font-bold text-gray-800 tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="min-w-[40px] min-h-[40px] rounded-lg bg-white active:bg-pink-100 flex items-center justify-center text-pink-600 font-bold shadow-2xs transition-colors cursor-pointer"
              title="Aumentar"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 min-h-[48px] bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:scale-[0.98] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-pink-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="truncate">Adicionar</span>
            <span className="font-normal opacity-90 tabular-nums shrink-0">
              ({formatBRL(subtotal)})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
