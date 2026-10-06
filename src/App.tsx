import React, { useState, useEffect, useMemo } from 'react';
import { MenuItem, CartItem, Order } from './types';
import { STORE_INFO, INITIAL_CATEGORIES, INITIAL_MENU_ITEMS } from './data/menu';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { OrdersView } from './components/OrdersView';
import { AboutView } from './components/AboutView';
import { FloatingCartBar } from './components/FloatingCartBar';
import { BottomNavBar } from './components/BottomNavBar';
import { Toast } from './components/Toast';
import { Search, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'about'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load custom items or fallback to initial
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('solcafe_menu_items');
      if (saved) {
        const parsed: MenuItem[] = JSON.parse(saved);
        // Merge with INITIAL_MENU_ITEMS so that all items receive their authentic image
        return parsed.map((item) => {
          const initial = INITIAL_MENU_ITEMS.find((i) => i.id === item.id);
          const isBrokenPath = !item.image || item.image.startsWith('/src/assets') || item.image.includes('googleusercontent.com');
          return {
            ...item,
            image: (isBrokenPath && initial) ? initial.image : (item.image || initial?.image)
          };
        });
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MENU_ITEMS;
  });

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('solcafe_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Load orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('solcafe_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('solcafe_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('solcafe_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Save items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('solcafe_menu_items', JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Add to cart handler
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    option?: string | null,
    notes?: string
  ) => {
    const cartItemId = `${item.id}-${option || 'default'}-${notes || 'none'}`;

    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: item.id,
            name: item.name,
            price: item.price,
            quantity,
            option: option || null,
            notes: notes || undefined,
            icon: item.icon,
            image: item.image
          }
        ];
      }
    });

    showToast(`${quantity}x ${item.name} na sacola!`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.options && item.options.length > 0) {
      setModalItem(item);
      return;
    }
    handleAddToCart(item, 1, null, '');
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.cartItemId === cartItemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    showToast(`Pedido #${newOrder.id} enviado! 💗`);
  };

  // Filtered menu items
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  // Counts by category
  const itemsCountByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    menuItems.forEach((item) => {
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return map;
  }, [menuItems]);

  // Total cart calculation
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Map of cart item count by item id
  const cartItemCounts = useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach((ci) => {
      map[ci.id] = (map[ci.id] || 0) + ci.quantity;
    });
    return map;
  }, [cart]);

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#5D4037] flex flex-col pb-28 selection:bg-pink-200 selection:text-pink-900">
      {/* Toast Notification */}
      <Toast message={toastMessage} />

      {/* Mobile-Centric App Container */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col bg-[#FFF5F7] sm:shadow-lg sm:border-x sm:border-pink-100 min-h-screen">
        {/* Header with Branding, Live Status & Highlights */}
        <Header
          storeInfo={STORE_INFO}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          orderCount={orders.length}
          highlightCategories={INITIAL_CATEGORIES}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setActiveTab('menu');
            window.scrollTo({ top: 220, behavior: 'smooth' });
          }}
        />

        {/* Tab 1: Cardápio Digital (Menu Principal) */}
        {activeTab === 'menu' && (
          <>
            <CategoryNav
              categories={INITIAL_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              itemsCountByCategory={itemsCountByCategory}
              totalItems={menuItems.length}
            />

            <main className="px-3 mt-3 flex-1 w-full space-y-5">
              {searchQuery ? (
                // Search Results View
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold text-pink-700 uppercase tracking-wider">
                      Resultados da busca ({filteredItems.length})
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-pink-600 font-medium hover:underline p-1 cursor-pointer"
                    >
                      Limpar
                    </button>
                  </div>

                  {filteredItems.length === 0 ? (
                    <div className="text-center py-10 px-4 bg-white rounded-2xl border border-pink-100 shadow-2xs">
                      <Search className="w-8 h-8 text-pink-300 mx-auto mb-1.5" />
                      <h3 className="text-xs font-bold text-gray-700">
                        Nenhum item encontrado para &quot;{searchQuery}&quot;
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Tente buscar por bolo, tapioca, café, empadão ou suco.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="mt-3 min-h-[40px] px-4 py-2 bg-pink-100 text-pink-700 text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                      >
                        Ver todo o cardápio
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {filteredItems.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          onOpenModal={setModalItem}
                          onQuickAdd={handleQuickAdd}
                          quantityInCart={cartItemCounts[item.id] || 0}
                        />
                      ))}
                    </div>
                  )}
                </section>
              ) : selectedCategory !== 'all' ? (
                // Single Category Filtered View
                <section className="space-y-3">
                  {INITIAL_CATEGORIES.filter((c) => c.id === selectedCategory).map((cat) => (
                    <div key={cat.id} className="space-y-2.5">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-pink-200/60 pt-1">
                        <span className="text-xl">{cat.icon}</span>
                        <h2 className="text-base font-bold text-[#5D4037]">{cat.name}</h2>
                      </div>

                      <div className="space-y-2.5">
                        {filteredItems.map((item) => (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            onOpenModal={setModalItem}
                            onQuickAdd={handleQuickAdd}
                            quantityInCart={cartItemCounts[item.id] || 0}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ) : (
                // All Categories Grouped View
                INITIAL_CATEGORIES.map((cat) => {
                  const catItems = menuItems.filter((i) => i.category === cat.id);
                  if (catItems.length === 0) return null;

                  return (
                    <section key={cat.id} id={cat.id} className="space-y-2.5 scroll-mt-28">
                      <div className="flex items-center gap-2 pb-1.5 border-b border-pink-200/60 pt-2">
                        <span className="text-xl">{cat.icon}</span>
                        <h2 className="text-base font-bold text-[#5D4037]">
                          {cat.name}
                        </h2>
                      </div>

                      <div className="space-y-2.5">
                        {catItems.map((item) => (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            onOpenModal={setModalItem}
                            onQuickAdd={handleQuickAdd}
                            quantityInCart={cartItemCounts[item.id] || 0}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })
              )}
            </main>
          </>
        )}

        {/* Tab 2: Orders Tracking History */}
        {activeTab === 'orders' && (
          <OrdersView
            orders={orders}
            onBackToMenu={() => setActiveTab('menu')}
            storeInfo={STORE_INFO}
          />
        )}

        {/* Tab 3: About & Location */}
        {activeTab === 'about' && <AboutView storeInfo={STORE_INFO} />}

        {/* Footer */}
        <footer className="mt-auto pt-8 pb-4 text-center text-xs text-gray-500 border-t border-pink-100 w-full px-4">
          <p className="flex items-center justify-center gap-1 text-[#5D4037] font-medium text-xs">
            <span>Feito com amor</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 inline" />
            <span>Sol Café</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {STORE_INFO.address}
          </p>
        </footer>
      </div>

      {/* Floating Cart Bar (Positioned ergonomically right above the bottom nav bar) */}
      <FloatingCartBar
        totalItems={totalCartCount}
        totalPrice={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Fixed Bottom Navigation Bar (Pattern 1 from mobile touch guidelines) */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartCount={totalCartCount}
        orderCount={orders.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Customization / Details Bottom-Sheet Modal */}
      <ItemModal
        item={modalItem}
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Full Cart & WhatsApp Checkout Bottom-Sheet Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
        storeInfo={STORE_INFO}
      />
    </div>
  );
}
