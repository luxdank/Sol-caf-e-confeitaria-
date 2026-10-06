export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: string;
  options?: string[];
  icon?: string;
  image?: string;
  isAvailable?: boolean;
  highlight?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  badge: string;
  image?: string;
}

export interface CartItem {
  cartItemId: string; // unique per combination of id + option + notes
  id: string;
  name: string;
  price: number;
  quantity: number;
  option?: string | null;
  notes?: string;
  icon?: string;
  image?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  address: string;
  paymentMethod: string;
  troco?: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: 'recebido' | 'preparando' | 'pronto' | 'saiu' | 'entregue';
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: string;
  whatsapp: string;
  instagram: string;
  isOpen: boolean;
  hours: string;
  paymentMethods: string[];
  pixKey: string;
  logoUrl: string;
}
