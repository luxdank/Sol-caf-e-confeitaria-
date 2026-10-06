import React, { useState } from 'react';
import { CartItem, Order, StoreInfo } from '../types';
import { formatBRL } from '../data/menu';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  UserCheck,
  MapPin,
  Bike,
  Store,
  Copy,
  Check
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
  storeInfo: StoreInfo;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
  storeInfo
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [troco, setTroco] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [formError, setFormError] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  if (!isOpen) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(storeInfo.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      setCustomerPhone(digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim());
    } else {
      setCustomerPhone(digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim());
    }
  };

  const handleFinalizeOrder = () => {
    setFormError('');

    if (items.length === 0) {
      setFormError('Sua sacola está vazia.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Por favor, informe seu Nome Completo.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 8) {
      setFormError('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }

    if (deliveryType === 'delivery' && !customerAddress.trim()) {
      setFormError('Por favor, informe o Endereço para entrega.');
      return;
    }

    const orderId = `SOL-${Date.now().toString().slice(-5)}`;
    const finalAddress =
      deliveryType === 'pickup'
        ? 'Retirada no Balcão da Confeitaria'
        : customerAddress.trim();

    // Construct structured WhatsApp message
    let msg = `*🛒 NOVO PEDIDO — Sol Café & Confeitaria*\n`;
    msg += `*🏷️ Pedido:* #${orderId}\n`;
    msg += `*👤 Nome:* ${customerName.trim()}\n`;
    msg += `*📞 Telefone:* ${customerPhone.trim()}\n`;
    msg += `*📍 Tipo:* ${deliveryType === 'delivery' ? '🛵 Entrega Delivery' : '🛍️ Retirada no Local'}\n`;
    msg += `*🏠 Endereço:* ${finalAddress}\n`;
    msg += `*💳 Pagamento:* ${paymentMethod}${paymentMethod === 'Dinheiro' && troco ? ` (Troco para ${troco})` : ''}\n`;
    if (generalNotes.trim()) {
      msg += `*📝 Observações:* ${generalNotes.trim()}\n`;
    }
    msg += `*━━━━━━━━━━━━━━━━━━*\n`;
    msg += `*📋 ITENS DO PEDIDO:*\n`;
    msg += `*━━━━━━━━━━━━━━━━━━*\n`;

    items.forEach((item) => {
      const itemSubtotal = item.price * item.quantity;
      const optText = item.option ? ` (${item.option})` : '';
      msg += `• ${item.quantity}x ${item.name}${optText} — ${formatBRL(itemSubtotal)}\n`;
      if (item.notes) {
        msg += `   _Obs: ${item.notes}_\n`;
      }
    });

    msg += `*━━━━━━━━━━━━━━━━━━*\n`;
    msg += `*Subtotal:* ${formatBRL(subtotal)}\n`;
    msg += `*Taxa de entrega:* ${deliveryType === 'delivery' ? '[a combinar]' : 'Grátis (Retirada)'}\n`;
    msg += `*💰 TOTAL:* ${formatBRL(total)}\n`;
    msg += `*━━━━━━━━━━━━━━━━━━*\n`;
    msg += `_Pedido gerado pelo cardápio digital Sol Café & Confeitaria 💗_`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryType,
      address: finalAddress,
      paymentMethod,
      troco: paymentMethod === 'Dinheiro' ? troco : undefined,
      notes: generalNotes.trim() || undefined,
      items: [...items],
      subtotal,
      total,
      status: 'recebido'
    };

    onOrderPlaced(newOrder);

    // Open WhatsApp URL
    const whatsappUrl = `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl animate-slideUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Cart Header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-pink-100 text-pink-600 rounded-xl">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#5D4037]">Sua Sacola</h2>
              <span className="text-[11px] text-gray-500 block leading-none">
                {items.length} {items.length === 1 ? 'item' : 'itens'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Deseja realmente esvaziar a sacola?')) {
                    onClearCart();
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 font-medium py-1 px-2 cursor-pointer"
              >
                Esvaziar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] rounded-full bg-pink-50 hover:bg-pink-100 active:scale-95 text-pink-600 flex items-center justify-center transition-colors cursor-pointer"
              title="Fechar"
              aria-label="Fechar sacola"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4 hide-scrollbar">
          {items.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-2">
              <span className="text-4xl block">🧺</span>
              <h3 className="text-sm font-semibold text-gray-700">
                Sua sacola está vazia
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explore nosso cardápio e adicione cafés, doces finos e tapiocas quentinhas.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 min-h-[44px] px-5 py-2.5 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 active:scale-95 transition-all shadow-xs cursor-pointer inline-flex items-center justify-center"
              >
                Ver cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-2">
                {items.map((item) => {
                  const itemSubtotal = item.price * item.quantity;
                  return (
                    <div
                      key={item.cartItemId}
                      className="bg-pink-50/40 p-3 rounded-2xl border border-pink-100 flex items-center justify-between gap-2.5 text-xs"
                    >
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="font-bold text-[#5D4037] flex items-center gap-1.5">
                          <span>{item.icon || '☕'}</span>
                          <span className="truncate">{item.name}</span>
                        </div>
                        {item.option && (
                          <div className="text-[11px] text-pink-600 font-medium">
                            Sabor: {item.option}
                          </div>
                        )}
                        {item.notes && (
                          <div className="text-[10px] text-gray-500 italic truncate">
                            Obs: &quot;{item.notes}&quot;
                          </div>
                        )}
                        <div className="text-pink-600 font-bold mt-0.5 tabular-nums">
                          {formatBRL(itemSubtotal)}
                        </div>
                      </div>

                      {/* Quantity Stepper with thumb targets */}
                      <div className="flex items-center gap-0.5 bg-white px-1.5 py-1 rounded-xl border border-pink-200 shadow-2xs shrink-0">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="min-w-[32px] min-h-[32px] rounded-lg bg-pink-50 hover:bg-pink-100 active:scale-95 flex items-center justify-center text-pink-600 font-bold transition-colors cursor-pointer"
                          title="Diminuir"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-gray-800 text-xs tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="min-w-[32px] min-h-[32px] rounded-lg bg-pink-50 hover:bg-pink-100 active:scale-95 flex items-center justify-center text-pink-600 font-bold transition-colors cursor-pointer"
                          title="Aumentar"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center text-gray-400 hover:text-red-500 active:scale-95 transition-colors cursor-pointer"
                        title="Remover item"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Delivery or Pickup Toggle */}
              <div className="pt-2 border-t border-pink-100 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-pink-700">
                  Forma de Atendimento
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`min-h-[44px] p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-semibold transition-all cursor-pointer active:scale-95 ${
                      deliveryType === 'delivery'
                        ? 'border-pink-500 bg-pink-500 text-white shadow-pink-glow'
                        : 'border-pink-200 bg-white text-gray-700 hover:bg-pink-50'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Entrega Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`min-h-[44px] p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-semibold transition-all cursor-pointer active:scale-95 ${
                      deliveryType === 'pickup'
                        ? 'border-pink-500 bg-pink-500 text-white shadow-pink-glow'
                        : 'border-pink-200 bg-white text-gray-700 hover:bg-pink-50'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Retirar no Balcão</span>
                  </button>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="pt-2 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pink-700 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  Seus Dados
                </h3>

                {formError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    ⚠️ {formError}
                  </div>
                )}

                <div className="space-y-2.5 text-xs">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Maria Eduarda"
                      className="w-full p-3 min-h-[44px] rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20 text-gray-800 text-sm"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="Ex: (21) 98696-4717"
                      className="w-full p-3 min-h-[44px] rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20 text-gray-800 text-sm"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  {deliveryType === 'delivery' ? (
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 flex items-center justify-between">
                        <span>Endereço de Entrega *</span>
                        <span className="text-[10px] text-pink-600 font-normal">Rua, número e bairro</span>
                      </label>
                      <textarea
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Ex: Estrada Manoel de Sá, 926 Lote XV, Casa 2"
                        className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20 text-gray-800 text-sm"
                      />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Ponto de Retirada:</strong>
                        <p>{storeInfo.address}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Forma de Pagamento
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-3 min-h-[44px] rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800 text-sm"
                      >
                        <option value="PIX">PIX (Chave WhatsApp)</option>
                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                        <option value="Cartão de Débito">Cartão de Débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                      </select>
                    </div>

                    {paymentMethod === 'Dinheiro' && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Troco para quanto?
                        </label>
                        <input
                          type="text"
                          value={troco}
                          onChange={(e) => setTroco(e.target.value)}
                          placeholder="Ex: R$ 50,00"
                          className="w-full p-3 min-h-[44px] rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white text-gray-800 text-sm"
                        />
                      </div>
                    )}
                  </div>

                  {paymentMethod === 'PIX' && (
                    <div className="p-2.5 rounded-xl bg-pink-50 border border-pink-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-pink-700 font-semibold uppercase block">
                          Chave PIX da Loja
                        </span>
                        <span className="font-mono text-xs text-gray-800">{storeInfo.pixKey}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="min-h-[38px] px-3 py-1 rounded-lg bg-white border border-pink-200 text-pink-600 text-xs font-semibold hover:bg-pink-100 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 font-medium mb-1 flex items-center justify-between">
                      <span>Observações ou Recado</span>
                      <span className="text-[10px] text-gray-400">Opcional</span>
                    </label>
                    <input
                      type="text"
                      value={generalNotes}
                      onChange={(e) => setGeneralNotes(e.target.value)}
                      placeholder="Ex: Tocar o interfone 201, caprichar na canela 💗"
                      className="w-full p-3 min-h-[44px] rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-pink-50/20 text-gray-800 text-sm"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Fixed Mobile Bottom Action (Thumb Zone) */}
        {items.length > 0 && (
          <div className="p-4 border-t border-pink-100 bg-white/95 backdrop-blur-sm space-y-2 pb-safe">
            <div className="space-y-0.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal dos itens</span>
                <span className="font-semibold tabular-nums">{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Taxa de Entrega</span>
                <span className="text-pink-600 font-medium">
                  {deliveryType === 'delivery' ? 'A combinar' : 'Grátis no balcão'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#5D4037] pt-0.5">
                <span>Total Estimado</span>
                <span className="text-pink-600 text-base tabular-nums">
                  {formatBRL(total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinalizeOrder}
              className="w-full min-h-[48px] bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Finalizar Pedido no WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-gray-400 leading-tight">
              Abre diretamente o WhatsApp oficial da Sol Café & Confeitaria 💗
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
