import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  Truck,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (tab: 'products' | 'orders' | 'customers' | 'categories' | 'settings') => void;
  onOpenAddProduct: () => void;
  onSelectOrder: (orderId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onOpenAddProduct,
  onSelectOrder,
}) => {
  const { products, orders, customers } = useStore();

  // Metrics calculations
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const outForDeliveryOrders = orders.filter((o) => o.status === 'out_for_delivery');
  const lowStockProducts = products.filter((p) => (p.stockQuantity ?? 10) <= 5 || !p.inStock);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'processing':
        return (
          <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
            <TrendingUp className="w-3 h-3" /> Processing
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
            <Truck className="w-3 h-3" /> Out for Delivery
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
            <CheckCircle className="w-3 h-3" /> Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
            <AlertCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#071325] to-[#0057FF] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-blue-200 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Super Deal Qatar Store Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-playfair">
            Welcome back, Administrator
          </h1>
          <p className="text-xs text-blue-100 max-w-lg">
            Here is your live daily performance overview, order updates, and inventory tracking for Doha & Qatar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={onOpenAddProduct}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={() => onNavigate('orders')}
            className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-2xl backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View All Orders ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* 1. Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Revenue */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl font-black text-slate-900">{totalRevenue.toLocaleString()} QAR</h3>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% from last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl font-black text-slate-900">{orders.length}</h3>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600">
              <Clock className="w-3.5 h-3.5" />
              <span>{pendingOrders.length} Pending Approval</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Products */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Catalog Products</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl font-black text-slate-900">{products.length}</h3>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-500">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{lowStockProducts.length} Low Stock / Restock</span>
            </div>
          </div>
        </div>

        {/* Card 4: Customers */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Registered Customers</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-2xl font-black text-slate-900">{customers.length}</h3>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
              <span>Across Doha, Pearl & Lusail</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3): Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900">Recent Customer Orders</h2>
              <p className="text-xs text-slate-500">Real-time incoming orders from Qatar website</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-bold text-[#0057FF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Order #</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0057FF]">{ord.orderNumber}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ord.customer.fullName}</div>
                      <div className="text-[11px] text-slate-400">{ord.customer.city}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {ord.items.length} item{ord.items.length > 1 ? 's' : ''}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">{ord.total} QAR</td>
                    <td className="py-3.5 px-4">{getStatusBadge(ord.status)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectOrder(ord.id)}
                        className="p-2 bg-slate-100 hover:bg-[#0057FF] hover:text-white text-slate-700 rounded-xl transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (1/3): Top Bestselling Products */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-slate-900">Featured Products</h2>
              <p className="text-xs text-slate-500">Popular items in Qatar</p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-bold text-[#0057FF] hover:underline cursor-pointer"
            >
              Catalog ↗
            </button>
          </div>

          <div className="space-y-4">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <img src={p.image} alt={p.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 bg-slate-50" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-slate-900 truncate">{p.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span className="text-[#0057FF] font-bold">{p.price} QAR</span>
                    <span>•</span>
                    <span>Stock: {p.stockQuantity ?? 20}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
