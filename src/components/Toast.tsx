import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform flex items-center gap-2 bg-[#5D4037] text-white px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-medium border border-pink-300/40 animate-slideDown">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
