import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminProductModal } from './AdminProductModal';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminCategories } from './AdminCategories';
import { AdminSettings } from './AdminSettings';
import { Product } from '../types';

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Grid,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Store
} from 'lucide-react';

interface AdminLayoutProps {
  onBackToStore: () => void;
}

export type AdminTab = 'dashboard' | 'products' | 'orders' | 'customers' | 'categories' | 'settings';

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onBackToStore }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('superdeal_admin_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Quick select order for Orders page view
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('superdeal_admin_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('superdeal_admin_auth');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} onBackToStore={onBackToStore} />;
  }

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: 'Products Catalog', icon: <Package className="w-4 h-4" /> },
    { id: 'orders', label: 'Customer Orders', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'customers', label: 'Customers CRM', icon: <Users className="w-4 h-4" /> },
    { id: 'categories', label: 'Categories', icon: <Grid className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-200 border-r border-slate-800 p-5 space-y-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-[#0057FF] text-white flex items-center justify-center font-black shadow-md">
            SD
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white font-playfair tracking-wide">
              SUPER DEAL
            </h2>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Admin Control Panel</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id !== 'orders') setSelectedOrderId(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0057FF] text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Link to Website & Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onBackToStore}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-blue-300 hover:text-white hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs font-bold cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 bg-slate-100 rounded-xl text-slate-700 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0057FF]" />
              <span className="text-xs font-extrabold text-slate-800 tracking-wide uppercase">
                {activeTab.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 text-[#0057FF] hover:bg-[#0057FF] hover:text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Customer View</span>
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="hidden sm:block text-left text-[11px]">
                <div className="font-bold text-slate-900 leading-tight">Admin User</div>
                <div className="text-slate-400">superdeal.qa</div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 text-white p-4 space-y-2 border-b border-slate-800 animate-fade-in z-20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold ${
                  activeTab === item.id ? 'bg-[#0057FF] text-white' : 'text-slate-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={onBackToStore}
              className="w-full flex items-center gap-3 px-4 py-3 text-blue-300 font-bold text-xs"
            >
              <Store className="w-4 h-4" />
              <span>Return to Customer View</span>
            </button>
          </div>
        )}

        {/* Page Tab View Render */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenAddProduct={handleOpenAddProduct}
              onSelectOrder={(ordId) => {
                setSelectedOrderId(ordId);
                setActiveTab('orders');
              }}
            />
          )}

          {activeTab === 'products' && (
            <AdminProducts
              onOpenAddModal={handleOpenAddProduct}
              onEditProduct={handleOpenEditProduct}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrders initialSelectOrderId={selectedOrderId} />
          )}

          {activeTab === 'customers' && <AdminCustomers />}

          {activeTab === 'categories' && <AdminCategories />}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>

      {/* Add / Edit Product Modal */}
      <AdminProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        productToEdit={editingProduct}
      />
    </div>
  );
};
