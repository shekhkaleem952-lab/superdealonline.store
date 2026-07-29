export interface Product {
  id: string;
  name: string;
  nameArabic?: string;
  category: 'mobile-acc' | 'smart-watches' | 'airpods' | 'speakers' | 'beauty' | 'home' | 'electronics' | 'trending' | string;
  categoryLabel: string;
  price: number; // in QAR
  originalPrice: number; // in QAR
  discountPercent: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  sku?: string;
  shortDescription?: string;
  description: string;
  specs: string[];
  specifications?: Record<string, string>;
  stockQuantity?: number;
  image: string;
  additionalImages?: string[];
  inStock: boolean;
  popular?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isDeal?: boolean;
  badge?: string; // e.g., '35% OFF', 'BEST SELLER', 'FLASH SALE'
  brand?: string;
  colors?: string[];
  warranty?: string;
}

export interface ProductCategory {
  id: 'mobile-acc' | 'smart-watches' | 'airpods' | 'speakers' | 'beauty' | 'home' | 'electronics' | 'trending';
  name: string;
  nameArabic?: string;
  iconName: string; // Lucide icon identifier
  count: number;
  image: string;
  description: string;
  gradient: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  selectedColor?: string;
  categoryLabel?: string;
}

export interface Review {
  id: string;
  itemId: string; // matches Product id
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  location?: string; // e.g., "Lusail, Qatar", "Doha", "The Pearl"
  verifiedPurchase?: boolean;
  helpfulCount?: number;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  productName: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  city: string;
  country: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
}

// Future-Ready Order & Inventory Data Models
export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  whatsappNumber?: string;
  email?: string;
  city: string;
  zoneArea: string;
  streetAddress: string;
  buildingNum?: string;
  paymentMethod: 'cod' | 'card_pos' | 'qmp';
  notes?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: OrderCustomerInfo;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface InventoryItem {
  productId: string;
  stockQuantity: number;
  lowStockThreshold: number;
  lastRestocked: string;
}

export type Language = 'en' | 'ar';

