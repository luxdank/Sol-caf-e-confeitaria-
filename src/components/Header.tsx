import React from 'react';
import { StoreInfo, Category } from '../types';
import { Instagram, Phone, MapPin, CreditCard, Clock } from 'lucide-react';

interface HeaderProps {
  storeInfo: StoreInfo;
  activeTab: 'menu' | 'orders' | 'about';
  onSelectTab: (tab: 'menu' | 'orders' | 'about') => void;
  orderCount: number;
  highlightCategories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  storeInfo,
  highlightCategories,
  onSelectCategory
}) => {
  return (
    <header className="relative bg-gradient-to-b from-[#FCE4EC] via-[#FFF0F4] to-[#FFF5F7] pt-3 sm:pt-5 pb-3 px-3 sm:px-4 border-b border-pink-100 shadow-2xs">
      {/* Top Mobile Bar with Live Status & Direct Action Buttons */}
      <div className="max-w-md mx-auto flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-semibold shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Aberto agora</span>
          <span className="text-emerald-700/60 font-normal hidden xs:inline">· 07:30 - 20:00</span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={storeInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-2.5 rounded-full bg-white shadow-2xs border border-pink-200/80 flex items-center gap-1.5 text-pink-600 hover:bg-pink-50 active:scale-95 transition-all text-xs font-medium"
            title="Siga no Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span className="text-[11px] font-semibold">Instagram</span>
          </a>

          <a
            href={`https://wa.me/${storeInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white shadow-2xs flex items-center gap-1.5 transition-all text-xs font-medium"
            title="Fale no WhatsApp"
            aria-label="WhatsApp"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Brand Identity Card */}
      <div className="max-w-md mx-auto text-center flex flex-col items-center">
        <div className="relative mb-1.5 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white shadow-md border-2 border-pink-200 overflow-hidden flex items-center justify-center transition-transform active:scale-95 duration-200">
            <img
              src={storeInfo.logoUrl}
              alt="Sol Café & Confeitaria Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('bg-pink-100', 'flex', 'items-center', 'justify-center');
                  parent.innerHTML = `<span class="text-3xl">☕🧁</span>`;
                }
              }}
            />
          </div>
          <span className="absolute -bottom-1 -right-0.5 bg-pink-500 text-white p-1 rounded-full text-[10px] shadow-sm ring-2 ring-white">
            🧁
          </span>
        </div>

        <h1 className="font-pacifico text-2xl sm:text-3xl text-[#5D4037] tracking-wide mt-0.5">
          {storeInfo.name}
        </h1>
        <p className="text-[11px] sm:text-xs text-pink-700 font-medium italic mt-0.5 max-w-xs">
          {storeInfo.tagline}
        </p>

        {/* Store Info Pills for Quick Scanning */}
        <div className="mt-2.5 flex flex-wrap justify-center items-center gap-1.5 text-[10px] sm:text-[11px] text-[#5D4037]/80">
          <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-pink-200/80 shadow-2xs">
            <MapPin className="w-3 h-3 text-pink-500 shrink-0" />
            <span className="truncate max-w-[200px]">Estr. Manoel de Sá, 926 Lote XV</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-pink-200/80 shadow-2xs">
            <CreditCard className="w-3 h-3 text-pink-500 shrink-0" />
            <span>PIX, Cartão & Dinheiro</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full border border-pink-200/80 shadow-2xs">
            <Clock className="w-3 h-3 text-pink-500 shrink-0" />
            <span>Delivery & Balcão</span>
          </span>
        </div>
      </div>
    </header>
  );
};
