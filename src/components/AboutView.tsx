import React, { useState } from 'react';
import { StoreInfo } from '../types';
import { ASSET_IMAGES } from '../assets/imagesMap';
import {
  MapPin,
  Clock,
  CreditCard,
  Phone,
  Instagram,
  Heart,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

interface AboutViewProps {
  storeInfo: StoreInfo;
}

export const AboutView: React.FC<AboutViewProps> = ({ storeInfo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(storeInfo.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-3 py-4 space-y-4">
      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm bg-pink-100 h-44 sm:h-56">
        <img
          src={ASSET_IMAGES.heroBanner}
          alt="Vitrine Sol Café & Confeitaria"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] uppercase tracking-wider text-pink-300 font-bold block">
            Confeitaria Artesanal
          </span>
          <h2 className="font-pacifico text-2xl text-white mt-0.5">
            {storeInfo.name}
          </h2>
          <p className="text-[11px] text-pink-100 italic mt-0.5 line-clamp-2">
            {storeInfo.tagline}
          </p>
        </div>
      </div>

      {/* About Description Card */}
      <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <h3 className="text-sm font-bold text-[#5D4037]">
            Nossa Confeitaria & Amor aos Detalhes
          </h3>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Na <strong>Sol Café & Confeitaria</strong>, preparamos tudo com ingredientes frescos e amor.
          Aqui você encontra tapiocas doces e salgadas quentinhas, bolos confeitados, copos da felicidade,
          salgados crocantes, empadões e cafés especiais para transformar seu dia!
        </p>
      </div>

      {/* Info Stack */}
      <div className="space-y-3">
        {/* Address Card */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5 text-pink-600 font-bold text-xs">
            <MapPin className="w-4 h-4" />
            <span>Localização</span>
          </div>
          <p className="text-xs text-gray-700 font-medium">
            {storeInfo.address}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              storeInfo.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] inline-flex items-center gap-1 text-xs text-pink-600 font-semibold hover:underline"
          >
            <span>Abrir no Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Hours Card */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5 text-pink-600 font-bold text-xs">
            <Clock className="w-4 h-4" />
            <span>Horário de Funcionamento</span>
          </div>
          <p className="text-xs text-gray-700 font-medium">
            {storeInfo.hours}
          </p>
          <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Aberto agora para pedidos</span>
          </div>
        </div>

        {/* Payments Card */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-1.5 text-pink-600 font-bold text-xs">
            <CreditCard className="w-4 h-4" />
            <span>Pagamentos Aceitos</span>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px]">
            {storeInfo.paymentMethods.map((pm) => (
              <span
                key={pm}
                className="bg-pink-50 text-pink-800 px-2 py-0.5 rounded-lg border border-pink-200/60 font-medium"
              >
                {pm}
              </span>
            ))}
          </div>
          <div className="pt-2 border-t border-pink-50 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-gray-400 block">Chave PIX (WhatsApp):</span>
              <span className="font-mono text-xs text-gray-800 font-bold">{storeInfo.pixKey}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyPix}
              className="min-h-[38px] px-3 py-1 rounded-xl bg-pink-100 text-pink-700 font-bold text-xs hover:bg-pink-200 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Channels */}
        <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-2xs space-y-2">
          <div className="flex items-center gap-1.5 text-pink-600 font-bold text-xs">
            <Phone className="w-4 h-4" />
            <span>Contato & Redes</span>
          </div>
          <div className="space-y-2 text-xs">
            <a
              href={`https://wa.me/${storeInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-98 text-emerald-800 transition-colors font-semibold"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: (21) 98696-4717</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={storeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-center justify-between p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 active:scale-98 text-pink-800 transition-colors font-semibold"
            >
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram: @solcafeconfeitaria</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
