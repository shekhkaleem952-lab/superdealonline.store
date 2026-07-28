import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Customer, InventoryItem, ProductCategory, CompanyInfo } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_CATEGORIES as INITIAL_CATEGORIES, COMPANY_INFO as INITIAL_COMPANY_INFO } from '../data/storeData';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  
  categories: ProductCategory[];
  addCategory: (category: Omit<ProductCategory, 'id'> & { id?: string }) => ProductCategory;
  updateCategory: (id: string, updatedFields: Partial<ProductCategory>) => void;
  deleteCategory: (id: string) => void;

  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;

  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => Customer;

  companyInfo: CompanyInfo;
  updateCompanyInfo: (updatedFields: Partial<CompanyInfo>) => void;

  inventory: Record<string, InventoryItem>;
  updateInventoryStock: (productId: string, stockQuantity: number) => void;

  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_PRODUCTS_KEY = 'superdeal_store_products_v2';
const LOCAL_CATEGORIES_KEY = 'superdeal_store_categories_v2';
const LOCAL_ORDERS_KEY = 'superdeal_store_orders_v2';
const LOCAL_COMPANY_KEY = 'superdeal_store_company_v2';
const LOCAL_CUSTOMERS_KEY = 'superdeal_store_customers_v2';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'SDQ-98421',
    date: '2026-07-28',
    customer: {
      fullName: 'Jassim Al-Thani',
      phone: '+974 5512 3456',
      email: 'jassim.thani@gmail.com',
      city: 'Doha',
      zoneArea: 'West Bay',
      streetAddress: 'Diplomatic Area, Tower 4',
      paymentMethod: 'cod',
      notes: 'Please call 10 mins before arrival',
    },
    items: [
      {
        productId: 'm2-magsafe',
        name: 'M2 Ultra Fast 20,000mAh Power Bank (MagSafe)',
        price: 139,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1609592424009-dd2790610332?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 139,
    deliveryFee: 15,
    discount: 0,
    total: 154,
    status: 'out_for_delivery',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ord-1002',
    orderNumber: 'SDQ-98422',
    date: '2026-07-27',
    customer: {
      fullName: 'Fatima Al-Kuwari',
      phone: '+974 6633 8901',
      email: 'f.alkuwari@qatar.net.qa',
      city: 'Lusail',
      zoneArea: 'Marina Promenade',
      streetAddress: 'Tower B, Apt 1204',
      paymentMethod: 'card_pos',
    },
    items: [
      {
        productId: 'ultra-2-pro',
        name: 'Ultra 2 Pro Max Smartwatch (AMOLED + Titanium)',
        price: 199,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
      },
      {
        productId: 'airpods-pro-2-anc',
        name: 'AirPods Pro 2 Gen ANC Wireless Earbuds',
        price: 149,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 348,
    deliveryFee: 0,
    discount: 20,
    total: 328,
    status: 'processing',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'ord-1003',
    orderNumber: 'SDQ-98423',
    date: '2026-07-26',
    customer: {
      fullName: 'Mohammed Rashid',
      phone: '+974 3344 5566',
      city: 'The Pearl',
      zoneArea: 'Porto Arabia',
      streetAddress: 'Parcel 12, Unit 302',
      paymentMethod: 'qmp',
    },
    items: [
      {
        productId: 'jbl-pulse-rgb',
        name: 'SoundPulse 360° Waterproof RGB Bluetooth Speaker',
        price: 179,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800',
      },
    ],
    subtotal: 358,
    deliveryFee: 0,
    discount: 0,
    total: 358,
    status: 'delivered',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    fullName: 'Jassim Al-Thani',
    phone: '+974 5512 3456',
    email: 'jassim.thani@gmail.com',
    city: 'Doha',
    totalOrders: 3,
    totalSpent: 485,
    lastOrderDate: '2026-07-28',
  },
  {
    id: 'cust-2',
    fullName: 'Fatima Al-Kuwari',
    phone: '+974 6633 8901',
    email: 'f.alkuwari@qatar.net.qa',
    city: 'Lusail',
    totalOrders: 2,
    totalSpent: 620,
    lastOrderDate: '2026-07-27',
  },
  {
    id: 'cust-3',
    fullName: 'Mohammed Rashid',
    phone: '+974 3344 5566',
    email: 'm.rashid@outlook.com',
    city: 'The Pearl',
    totalOrders: 4,
    totalSpent: 890,
    lastOrderDate: '2026-07-26',
  },
  {
    id: 'cust-4',
    fullName: 'Sara Al-Hajri',
    phone: '+974 7788 9900',
    email: 'sara.hajri@yahoo.com',
    city: 'Al Wakrah',
    totalOrders: 1,
    totalSpent: 129,
    lastOrderDate: '2026-07-24',
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Dynamic Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  // 2. Dynamic Categories State
  const [categories, setCategories] = useState<ProductCategory[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CATEGORIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading categories', e);
    }
    return INITIAL_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  // 3. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders', e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // 4. Customers State
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CUSTOMERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading customers', e);
    }
    return INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  // 5. Company Info State
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COMPANY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading company info', e);
    }
    return INITIAL_COMPANY_INFO;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_COMPANY_KEY, JSON.stringify(companyInfo));
  }, [companyInfo]);

  // 6. Inventory Tracking
  const [inventory, setInventory] = useState<Record<string, InventoryItem>>({});

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = { ...productData, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  const getProductsByCategory = (categoryId: string) => {
    if (categoryId === 'all') return products;
    return products.filter((p) => p.category === categoryId);
  };

  // Category CRUD
  const addCategory = (catData: Omit<ProductCategory, 'id'> & { id?: string }): ProductCategory => {
    const id = catData.id || `cat-${Date.now()}`;
    const newCat: ProductCategory = { ...catData, id: id as any };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = (id: string, updatedFields: Partial<ProductCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Order CRUD
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SDQ-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Automatically update or add customer
    const existingCustIdx = customers.findIndex(
      (c) => c.phone.replace(/\s+/g, '') === orderData.customer.phone.replace(/\s+/g, '')
    );
    if (existingCustIdx > -1) {
      setCustomers((prev) => {
        const copy = [...prev];
        copy[existingCustIdx].totalOrders += 1;
        copy[existingCustIdx].totalSpent += orderData.total;
        copy[existingCustIdx].lastOrderDate = new Date().toISOString().split('T')[0];
        return copy;
      });
    } else {
      addCustomer({
        fullName: orderData.customer.fullName,
        phone: orderData.customer.phone,
        email: orderData.customer.email,
        city: orderData.customer.city,
        totalOrders: 1,
        totalSpent: orderData.total,
        lastOrderDate: new Date().toISOString().split('T')[0],
      });
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Customer CRUD
  const addCustomer = (custData: Omit<Customer, 'id'>): Customer => {
    const newCust: Customer = {
      ...custData,
      id: `cust-${Date.now()}`,
    };
    setCustomers((prev) => [newCust, ...prev]);
    return newCust;
  };

  // Store Info
  const updateCompanyInfo = (updatedFields: Partial<CompanyInfo>) => {
    setCompanyInfo((prev) => ({ ...prev, ...updatedFields }));
  };

  const updateInventoryStock = (productId: string, stockQuantity: number) => {
    setInventory((prev) => ({
      ...prev,
      [productId]: {
        productId,
        stockQuantity,
        lowStockThreshold: 5,
        lastRestocked: new Date().toISOString(),
      },
    }));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCompanyInfo(INITIAL_COMPANY_INFO);
    localStorage.removeItem(LOCAL_PRODUCTS_KEY);
    localStorage.removeItem(LOCAL_CATEGORIES_KEY);
    localStorage.removeItem(LOCAL_ORDERS_KEY);
    localStorage.removeItem(LOCAL_CUSTOMERS_KEY);
    localStorage.removeItem(LOCAL_COMPANY_KEY);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,

        categories,
        addCategory,
        updateCategory,
        deleteCategory,

        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,

        customers,
        addCustomer,

        companyInfo,
        updateCompanyInfo,

        inventory,
        updateInventoryStock,

        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
