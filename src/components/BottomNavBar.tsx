import React from 'react';
import { UtensilsCrossed, ShoppingBag, Info } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'menu' | 'orders' | 'about';
  onSelectTab: (tab: 'menu' | 'orders' | 'about') => void;
  cartCount: number;
  orderCount: number;
  onOpenCart?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  orderCount,
  onOpenCart
}) => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-pink-200/80 shadow-[0_-4px_20px_rgba(236,64,122,0.08)] pb-safe transition-all"
      aria-label="Navegação Principal Mobile"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 items-center h-16 px-2">
        {/* Tab 1: Cardápio */}
        <button
          type="button"
          onClick={() => onSelectTab('menu')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-2 transition-colors cursor-pointer relative ${
            activeTab === 'menu'
              ? 'text-pink-600 font-bold'
              : 'text-gray-500 hover:text-pink-500 font-medium'
          }`}
        >
          <div className="relative">
            <UtensilsCrossed
              className={`w-5 h-5 transition-transform ${
                activeTab === 'menu' ? 'scale-110 text-pink-600 stroke-[2.4]' : 'text-gray-500'
              }`}
            />
          </div>
          <span className="text-[11px] tracking-tight mt-1 leading-none">
            Cardápio
          </span>
          {activeTab === 'menu' && (
            <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mt-0.5"></span>
          )}
        </button>

        {/* Tab 2: Pedidos / Sacola */}
        <button
          type="button"
          onClick={() => {
            if (cartCount > 0 && onOpenCart) {
              onOpenCart();
            } else {
              onSelectTab('orders');
            }
          }}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-2 transition-colors cursor-pointer relative ${
            activeTab === 'orders'
              ? 'text-pink-600 font-bold'
              : 'text-gray-500 hover:text-pink-500 font-medium'
          }`}
        >
          <div className="relative">
            <ShoppingBag
              className={`w-5 h-5 transition-transform ${
                activeTab === 'orders' ? 'scale-110 text-pink-600 stroke-[2.4]' : 'text-gray-500'
              }`}
            />
            {cartCount > 0 ? (
              <span className="absolute -top-1.5 -right-2.5 bg-[#EC407A] text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                {cartCount}
              </span>
            ) : orderCount > 0 ? (
              <span className="absolute -top-1.5 -right-2.5 bg-pink-100 text-pink-700 text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border border-pink-200">
                {orderCount}
              </span>
            ) : null}
          </div>
          <span className="text-[11px] tracking-tight mt-1 leading-none">
            {cartCount > 0 ? 'Sacola' : 'Pedidos'}
          </span>
          {activeTab === 'orders' && (
            <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mt-0.5"></span>
          )}
        </button>

        {/* Tab 3: Sobre / Confeitaria */}
        <button
          type="button"
          onClick={() => onSelectTab('about')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-2 transition-colors cursor-pointer relative ${
            activeTab === 'about'
              ? 'text-pink-600 font-bold'
              : 'text-gray-500 hover:text-pink-500 font-medium'
          }`}
        >
          <div className="relative">
            <Info
              className={`w-5 h-5 transition-transform ${
                activeTab === 'about' ? 'scale-110 text-pink-600 stroke-[2.4]' : 'text-gray-500'
              }`}
            />
          </div>
          <span className="text-[11px] tracking-tight mt-1 leading-none">
            Confeitaria
          </span>
          {activeTab === 'about' && (
            <span className="w-1.5 h-1.5 bg-pink-600 rounded-full mt-0.5"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
