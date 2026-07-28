import React, { useState } from 'react';
import { ReviewProvider } from './context/ReviewContext';
import { LanguageProvider } from './context/LanguageContext';
import { WishlistProvider } from './context/WishlistContext';
import { StoreProvider } from './context/StoreContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { UserAccountModal } from './components/UserAccountModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { ItemReviewModal } from './components/ItemReviewModal';
import { PolicyModal } from './components/PolicyModal';

import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLayout } from './admin/AdminLayout';

import { Product, CartItem } from './types';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Quick View & Reviews Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [policyModalType, setPolicyModalType] = useState<'privacy' | 'refund' | 'terms' | 'faq' | 'delivery' | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Management
  const handleAddToCart = (product: Product, selectedColor?: string, quantity: number = 1) => {
    const color = selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined);
    const uniqueId = `${product.id}-${color || 'default'}`;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((i) => i.id === uniqueId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          selectedColor: color,
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleProceedToCheckout = (appliedDiscount: number) => {
    setDiscountPercent(appliedDiscount);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <LanguageProvider>
      <StoreProvider>
        <WishlistProvider>
          <ReviewProvider>
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
              
              {/* Toast Popup */}
              {toastMessage && (
                <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#0057FF] flex items-center gap-3 animate-bounce-short">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-bold">{toastMessage}</span>
                </div>
              )}

              {/* Global Navbar */}
              <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                cartCount={totalCartCount}
                setIsCartOpen={setIsCartOpen}
                onOpenWishlist={() => setIsWishlistOpen(true)}
                onOpenAccount={() => setIsAccountOpen(true)}
                onSelectProduct={(product) => setQuickViewProduct(product)}
                categoryFilter={selectedCategoryFilter}
                setCategoryFilter={setSelectedCategoryFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchSubmit={(query) => {
                  setSearchQuery(query);
                  setCurrentPage('categories');
                  setSelectedCategoryFilter('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Page Views */}
              <main className="flex-1">
                {currentPage === 'admin' && (
                  <AdminLayout onBackToStore={() => setCurrentPage('home')} />
                )}

                {currentPage === 'home' && (
                  <HomePage
                    setCurrentPage={setCurrentPage}
                    onAddToCart={(product, color) => handleAddToCart(product, color, 1)}
                    onOpenQuickView={(product) => setQuickViewProduct(product)}
                    onOpenReviews={(product) => setReviewProduct(product)}
                    setCategoryFilter={setSelectedCategoryFilter}
                    selectedCategoryFilter={selectedCategoryFilter}
                  />
                )}

                {(currentPage === 'categories' || currentPage === 'shop') && (
                  <CategoriesPage
                    onAddToCart={(product) => handleAddToCart(product)}
                    onOpenQuickView={(product) => setQuickViewProduct(product)}
                    selectedCategoryFilter={selectedCategoryFilter}
                    setCategoryFilter={setSelectedCategoryFilter}
                    setCurrentPage={setCurrentPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                )}

                {currentPage === 'about' && (
                  <AboutPage setCurrentPage={setCurrentPage} />
                )}

                {currentPage === 'contact' && <ContactPage />}
              </main>

              {/* Drawers & Modals */}
              <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                onProceedToCheckout={handleProceedToCheckout}
              />

              <WishlistDrawer
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
                onAddToCart={(product) => handleAddToCart(product)}
                onOpenQuickView={(product) => setQuickViewProduct(product)}
              />

              <UserAccountModal
                isOpen={isAccountOpen}
                onClose={() => setIsAccountOpen(false)}
                onOpenAdmin={() => setCurrentPage('admin')}
              />

              <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
                discountPercent={discountPercent}
                onSuccess={handleCheckoutSuccess}
              />

              <ProductQuickViewModal
                isOpen={!!quickViewProduct}
                product={quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
                onAddToCart={(product, color, qty) => {
                  handleAddToCart(product, color, qty);
                  setQuickViewProduct(null);
                }}
                onOpenReviews={(product) => {
                  setQuickViewProduct(null);
                  setReviewProduct(product);
                }}
              />

              <ItemReviewModal
                isOpen={!!reviewProduct}
                item={reviewProduct}
                onClose={() => setReviewProduct(null)}
              />

              <PolicyModal
                isOpen={!!policyModalType}
                policyType={policyModalType}
                onClose={() => setPolicyModalType(null)}
              />

              {/* Floating WhatsApp Action Button */}
              <FloatingWhatsApp />

              {/* Global Footer */}
              <Footer
                setCurrentPage={setCurrentPage}
                setCategoryFilter={setSelectedCategoryFilter}
                onOpenPolicy={(policy) => setPolicyModalType(policy)}
              />

            </div>
          </ReviewProvider>
        </WishlistProvider>
      </StoreProvider>
    </LanguageProvider>
  );
}
