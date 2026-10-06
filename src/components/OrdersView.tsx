import React from 'react';
import { Order, StoreInfo } from '../types';
import { formatBRL } from '../data/menu';
import { ShoppingBag, Bike, Store, Phone, ArrowLeft } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onBackToMenu: () => void;
  storeInfo: StoreInfo;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onBackToMenu,
  storeInfo
}) => {
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'recebido':
        return { label: 'Enviado', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'preparando':
        return { label: 'Em Preparo 👩‍🍳', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'pronto':
        return { label: 'Pronto no Balcão 🎉', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'saiu':
        return { label: 'A Caminho 🛵', color: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'entregue':
        return { label: 'Concluído 💗', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Recebido', color: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  return (
    <div className="max-w-md mx-auto px-3 py-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-pink-100">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToMenu}
            className="min-w-[40px] min-h-[40px] rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center active:scale-95 cursor-pointer"
            aria-label="Voltar ao cardápio"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#5D4037]">Meus Pedidos</h2>
            <p className="text-[11px] text-gray-500">Histórico de pedidos recentes</p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-pink-100 shadow-2xs space-y-3">
          <span className="text-4xl block">🧁</span>
          <h3 className="text-sm font-bold text-[#5D4037]">Nenhum pedido realizado ainda</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Quando você enviar um pedido para o WhatsApp da Sol Café & Confeitaria, ele ficará salvo aqui.
          </p>
          <button
            type="button"
            onClick={onBackToMenu}
            className="mt-2 min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold rounded-xl shadow-pink-glow active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center"
          >
            Ver Cardápio
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            const dateStr = new Date(order.createdAt).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-pink-100/90 p-3.5 shadow-2xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-pink-50">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-[#5D4037]">
                        Pedido #{order.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      {dateStr}
                    </span>
                  </div>

                  <span className="text-xs sm:text-sm font-extrabold text-pink-600 tabular-nums">
                    {formatBRL(order.total)}
                  </span>
                </div>

                {/* Items Summary */}
                <div className="space-y-1 text-xs text-gray-700 bg-pink-50/30 p-2.5 rounded-xl border border-pink-100/50">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-1">
                      <div className="truncate pr-1">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        {item.option && (
                          <span className="text-[11px] text-pink-600 font-medium ml-1">
                            ({item.option})
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-gray-600 tabular-nums shrink-0">
                        {formatBRL(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery & Payment Info */}
                <div className="flex flex-col gap-1 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1.5 truncate">
                    {order.deliveryType === 'delivery' ? (
                      <Bike className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    ) : (
                      <Store className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    )}
                    <span className="truncate">{order.address}</span>
                  </div>

                  <div className="text-[11px] text-gray-500">
                    <strong>Pagamento:</strong> {order.paymentMethod}
                  </div>
                </div>

                {/* Contact button */}
                <div className="pt-1">
                  <a
                    href={`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(
                      `Olá! Gostaria de falar sobre o pedido #${order.id} feito por ${order.customerName}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[40px] flex items-center justify-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:scale-95 px-3 py-2 rounded-xl font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Acompanhar no WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
