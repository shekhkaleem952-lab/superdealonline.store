export interface Product {
  id: string;
  name: string;
  nameArabic?: string;
  category: 'mobile-acc' | 'smart-watches' | 'airpods' | 'speakers' | 'beauty' | 'home' | 'electronics' | 'trending';
  categoryLabel: string;
  price: number; // in QAR
  originalPrice: number; // in QAR
  discountPercent: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  description: string;
  specs: string[];
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
