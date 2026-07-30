import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, Customer, InventoryItem, ProductCategory, CompanyInfo, OrderStatusHistoryItem } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, PRODUCT_CATEGORIES as INITIAL_CATEGORIES, COMPANY_INFO as INITIAL_COMPANY_INFO } from '../data/storeData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, updatedFields: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  uploadProductImage: (file: File, bucket?: string) => Promise<string | null>;
  
  categories: ProductCategory[];
  addCategory: (category: Omit<ProductCategory, 'id'> & { id?: string }) => Promise<ProductCategory>;
  updateCategory: (id: string, updatedFields: Partial<ProductCategory>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status'], cancellationReason?: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;

  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<Customer>;

  companyInfo: CompanyInfo;
  updateCompanyInfo: (updatedFields: Partial<CompanyInfo>) => Promise<void>;

  inventory: Record<string, InventoryItem>;
  updateInventoryStock: (productId: string, stockQuantity: number) => Promise<void>;

  isLoadingData: boolean;
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
    statusHistory: [
      { id: 'h-1', orderId: 'ord-1001', status: 'Pending', title: 'Order Placed', description: 'Order received via COD', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 'h-2', orderId: 'ord-1001', status: 'Processing', title: 'Processing', description: 'Item checked and packed', createdAt: new Date(Date.now() - 43200000).toISOString() },
      { id: 'h-3', orderId: 'ord-1001', status: 'Out for Delivery', title: 'Out for Delivery', description: 'Driver is en route in West Bay', createdAt: new Date().toISOString() },
    ],
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
    statusHistory: [
      { id: 'h-4', orderId: 'ord-1002', status: 'Pending', title: 'Order Placed', description: 'Order received', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 'h-5', orderId: 'ord-1002', status: 'Processing', title: 'Order Confirmed', description: 'Confirmed by store manager', createdAt: new Date(Date.now() - 40000000).toISOString() },
    ],
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
];

// Status mapper helpers
const dbStatusToFrontend = (dbStatus: string): Order['status'] => {
  switch (dbStatus?.toLowerCase()) {
    case 'pending': return 'pending';
    case 'confirmed':
    case 'processing':
    case 'packed': return 'processing';
    case 'out for delivery':
    case 'out_for_delivery': return 'out_for_delivery';
    case 'delivered': return 'delivered';
    case 'cancelled': return 'cancelled';
    default: return 'pending';
  }
};

const frontendStatusToDb = (status: Order['status']): string => {
  switch (status) {
    case 'pending': return 'Pending';
    case 'processing': return 'Processing';
    case 'out_for_delivery': return 'Out for Delivery';
    case 'delivered': return 'Delivered';
    case 'cancelled': return 'Cancelled';
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders', e);
    }
    return INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_CUSTOMERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading customers', e);
    }
    return INITIAL_CUSTOMERS;
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_COMPANY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading company info', e);
    }
    return INITIAL_COMPANY_INFO;
  });

  const [inventory, setInventory] = useState<Record<string, InventoryItem>>({});
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Sync to localStorage as backup
  useEffect(() => {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_COMPANY_KEY, JSON.stringify(companyInfo));
  }, [companyInfo]);

  // Fetch from Supabase on load if configured
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoadingData(false);
      return;
    }

    const loadSupabaseData = async () => {
      try {
        setIsLoadingData(true);

        // 1. Fetch Categories
        const { data: dbCategories, error: catErr } = await supabase
          .from('categories')
          .select('*')
          .eq('is_deleted', false)
          .order('display_order', { ascending: true });

        if (dbCategories && dbCategories.length > 0 && !catErr) {
          const mappedCats: ProductCategory[] = dbCategories.map((c) => ({
            id: c.id,
            name: c.name,
            iconName: c.icon || 'Package',
            count: 12,
            image: c.image_url || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600',
            description: c.description || '',
            gradient: 'from-blue-600 to-indigo-700',
            slug: c.slug,
          }));
          setCategories(mappedCats);
        }

        // 2. Fetch Products
        const { data: dbProducts, error: prodErr } = await supabase
          .from('products')
          .select('*, product_images(*), categories(name)')
          .eq('is_deleted', false)
          .order('created_at', { ascending: false });

        if (dbProducts && dbProducts.length > 0 && !prodErr) {
          const mappedProds: Product[] = dbProducts.map((p) => {
            const primaryImgObj = p.product_images?.find((img: any) => img.is_primary) || p.product_images?.[0];
            const mainImg = primaryImgObj?.image_url || 'https://images.unsplash.com/photo-1609592424009-dd2790610332?auto=format&fit=crop&q=80&w=800';
            const extraImgs = p.product_images?.map((img: any) => img.image_url) || [mainImg];

            return {
              id: p.id,
              name: p.name,
              category: p.category_id || 'mobile-acc',
              categoryLabel: p.categories?.name || 'Accessories',
              price: Number(p.price),
              originalPrice: Number(p.original_price || p.price),
              discountPercent: p.discount_percent || 0,
              image: mainImg,
              additionalImages: extraImgs,
              badge: p.badge || undefined,
              popular: p.is_featured || false,
              isBestSeller: p.is_best_seller || false,
              isNew: p.is_new_arrival || false,
              inStock: (p.stock ?? 25) > 0,
              stockQuantity: p.stock ?? 25,
              rating: 4.8,
              reviewCount: 12,
              sku: p.sku,
              specs: ['Qatar Warranty', 'Fast Delivery'],
              description: p.description || '',
              specifications: p.specifications || {},
              brand: p.brand || 'Super Deal',
              slug: p.slug,
            };
          });
          setProducts(mappedProds);
        }

        // 3. Fetch Orders
        const { data: dbOrders, error: ordErr } = await supabase
          .from('orders')
          .select('*, order_items(*), order_status_history(*)')
          .order('created_at', { ascending: false });

        if (dbOrders && dbOrders.length > 0 && !ordErr) {
          const mappedOrders: Order[] = dbOrders.map((o) => {
            const ship = typeof o.shipping_address === 'string' ? JSON.parse(o.shipping_address) : o.shipping_address || {};
            return {
              id: o.id,
              orderNumber: o.order_number,
              date: o.created_at ? o.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
              customer: {
                fullName: o.customer_name || ship.fullName || 'Customer',
                phone: o.customer_phone || ship.phone || '',
                email: o.customer_email || ship.email || '',
                city: ship.city || 'Doha',
                zoneArea: ship.deliveryZone || ship.zoneArea || 'West Bay',
                streetAddress: ship.streetAddress || '',
                paymentMethod: o.payment_method === 'COD' ? 'cod' : 'card_pos',
                notes: o.order_notes || ship.notes || '',
              },
              items: (o.order_items || []).map((item: any) => ({
                productId: item.product_id || 'prod',
                name: item.product_name,
                price: Number(item.unit_price),
                quantity: item.quantity,
                image: item.product_image || 'https://images.unsplash.com/photo-1609592424009-dd2790610332?auto=format&fit=crop&q=80&w=800',
              })),
              subtotal: Number(o.subtotal),
              deliveryFee: Number(o.delivery_fee || 0),
              discount: Number(o.discount_amount || 0),
              total: Number(o.total_amount),
              status: dbStatusToFrontend(o.order_status),
              cancellationReason: o.cancellation_reason,
              statusHistory: (o.order_status_history || []).map((h: any) => ({
                id: h.id,
                orderId: h.order_id,
                status: h.status,
                title: h.title,
                description: h.description,
                createdAt: h.created_at,
              })),
              createdAt: o.created_at,
            };
          });
          setOrders(mappedOrders);
        }

        // 4. Fetch Customers
        const { data: dbCustomers } = await supabase.from('customers').select('*');
        if (dbCustomers && dbCustomers.length > 0) {
          const mappedCusts: Customer[] = dbCustomers.map((c) => ({
            id: c.id,
            fullName: c.full_name,
            phone: c.phone,
            email: c.email,
            city: 'Doha',
            totalOrders: c.total_orders || 0,
            totalSpent: Number(c.total_spent || 0),
            lastOrderDate: c.updated_at ? c.updated_at.split('T')[0] : '2026-07-29',
          }));
          setCustomers(mappedCusts);
        }

        // 5. Fetch Settings / Company Info
        const { data: dbSettings } = await supabase.from('settings').select('*');
        if (dbSettings && dbSettings.length > 0) {
          const infoSetting = dbSettings.find((s) => s.key === 'company_info');
          if (infoSetting && infoSetting.value) {
            setCompanyInfo(infoSetting.value as CompanyInfo);
          }
        }
      } catch (e) {
        console.error('Error fetching Supabase data:', e);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadSupabaseData();
  }, []);

  // Upload Product Image to Supabase Storage
  const uploadProductImage = async (file: File, bucket = 'products'): Promise<string | null> => {
    if (!isSupabaseConfigured) {
      return URL.createObjectURL(file);
    }
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) {
        console.error('Error uploading image to Supabase storage:', uploadError);
        return null;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (e) {
      console.error('Image upload exception:', e);
      return null;
    }
  };

  // Product CRUD
  const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let createdProduct: Product;

    if (isSupabaseConfigured) {
      try {
        const { data: dbProd, error } = await supabase
          .from('products')
          .insert({
            name: productData.name,
            slug: `${slug}-${Date.now().toString().slice(-4)}`,
            description: productData.description,
            specifications: productData.specifications || {},
            price: productData.price,
            original_price: productData.originalPrice,
            discount_percent: productData.discountPercent,
            sku: productData.sku || `SKU-${Date.now()}`,
            brand: productData.brand || 'Super Deal',
            category_id: productData.category !== 'all' ? productData.category : null,
            badge: productData.badge,
            stock: productData.stockQuantity ?? 25,
            is_featured: productData.popular ?? false,
            is_trending: productData.isDeal ?? false,
            is_best_seller: productData.isBestSeller ?? false,
            is_new_arrival: productData.isNew ?? false,
          })
          .select()
          .single();

        if (error || !dbProd) {
          throw error || new Error('Failed to create product in DB');
        }

        // Insert primary product image
        if (productData.image) {
          await supabase.from('product_images').insert({
            product_id: dbProd.id,
            image_url: productData.image,
            is_primary: true,
          });
        }

        createdProduct = {
          ...productData,
          id: dbProd.id,
          slug: dbProd.slug,
        };
      } catch (e) {
        console.error('Supabase add product error, falling back to local state:', e);
        const newId = `prod-${Date.now()}`;
        createdProduct = { ...productData, id: newId, slug };
      }
    } else {
      const newId = `prod-${Date.now()}`;
      createdProduct = { ...productData, id: newId, slug };
    }

    setProducts((prev) => [createdProduct, ...prev]);
    return createdProduct;
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );

    if (isSupabaseConfigured && !id.startsWith('prod-')) {
      try {
        const dbUpdates: any = {};
        if (updatedFields.name !== undefined) dbUpdates.name = updatedFields.name;
        if (updatedFields.price !== undefined) dbUpdates.price = updatedFields.price;
        if (updatedFields.originalPrice !== undefined) dbUpdates.original_price = updatedFields.originalPrice;
        if (updatedFields.discountPercent !== undefined) dbUpdates.discount_percent = updatedFields.discountPercent;
        if (updatedFields.stockQuantity !== undefined) dbUpdates.stock = updatedFields.stockQuantity;
        if (updatedFields.description !== undefined) dbUpdates.description = updatedFields.description;
        if (updatedFields.badge !== undefined) dbUpdates.badge = updatedFields.badge;
        if (updatedFields.popular !== undefined) dbUpdates.is_featured = updatedFields.popular;
        if (updatedFields.isDeal !== undefined) dbUpdates.is_trending = updatedFields.isDeal;
        if (updatedFields.isBestSeller !== undefined) dbUpdates.is_best_seller = updatedFields.isBestSeller;
        if (updatedFields.isNew !== undefined) dbUpdates.is_new_arrival = updatedFields.isNew;

        await supabase.from('products').update(dbUpdates).eq('id', id);

        if (updatedFields.image) {
          await supabase.from('product_images').update({ image_url: updatedFields.image }).eq('product_id', id).eq('is_primary', true);
        }
      } catch (e) {
        console.error('Error updating product in DB:', e);
      }
    }
  };

  const deleteProduct = async (id: string) => {
    // Soft Delete: update is_deleted to true
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConfigured && !id.startsWith('prod-')) {
      try {
        await supabase
          .from('products')
          .update({ is_deleted: true, deleted_at: new Date().toISOString() })
          .eq('id', id);
      } catch (e) {
        console.error('Error soft deleting product in DB:', e);
      }
    }
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);

  const getProductsByCategory = (categoryId: string) => {
    if (categoryId === 'all') return products;
    return products.filter((p) => p.category === categoryId);
  };

  // Category CRUD (with Soft Delete & Slugs)
  const addCategory = async (catData: Omit<ProductCategory, 'id'> & { id?: string }): Promise<ProductCategory> => {
    const slug = catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let newCat: ProductCategory;

    if (isSupabaseConfigured) {
      try {
        const { data: dbCat, error } = await supabase
          .from('categories')
          .insert({
            name: catData.name,
            slug: `${slug}-${Date.now().toString().slice(-4)}`,
            description: catData.description,
            icon: catData.iconName,
            image_url: catData.image,
          })
          .select()
          .single();

        if (error || !dbCat) throw error || new Error('Category DB insert failed');

        newCat = {
          id: dbCat.id,
          name: dbCat.name,
          iconName: catData.iconName,
          count: 0,
          image: catData.image,
          description: catData.description,
          gradient: catData.gradient || 'from-blue-600 to-indigo-700',
          slug: dbCat.slug,
        };
      } catch (e) {
        console.error('Error adding category to DB:', e);
        const id = catData.id || `cat-${Date.now()}`;
        newCat = { ...catData, id, slug };
      }
    } else {
      const id = catData.id || `cat-${Date.now()}`;
      newCat = { ...catData, id, slug };
    }

    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  const updateCategory = async (id: string, updatedFields: Partial<ProductCategory>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
    );

    if (isSupabaseConfigured && !id.startsWith('cat-')) {
      try {
        await supabase.from('categories').update({
          name: updatedFields.name,
          description: updatedFields.description,
          image_url: updatedFields.image,
          icon: updatedFields.iconName,
        }).eq('id', id);
      } catch (e) {
        console.error('Error updating category in DB:', e);
      }
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));

    if (isSupabaseConfigured && !id.startsWith('cat-')) {
      try {
        await supabase
          .from('categories')
          .update({ is_deleted: true, deleted_at: new Date().toISOString() })
          .eq('id', id);
      } catch (e) {
        console.error('Error soft deleting category in DB:', e);
      }
    }
  };

  // Order CRUD (with Order Status History & Cancellation Reason)
  const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Promise<Order> => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SDQ-${randomNum}`;
    const nowIso = new Date().toISOString();

    const initialHistoryItem: OrderStatusHistoryItem = {
      id: `h-${Date.now()}`,
      orderId: '',
      status: 'Pending',
      title: 'Order Placed',
      description: 'Order placed via Cash on Delivery in Qatar. Awaiting merchant confirmation.',
      createdAt: nowIso,
    };

    let newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      status: 'pending',
      createdAt: nowIso,
      statusHistory: [initialHistoryItem],
    };

    if (isSupabaseConfigured) {
      try {
        const { data: dbOrder, error: orderErr } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            customer_name: orderData.customer.fullName,
            customer_phone: orderData.customer.phone,
            customer_email: orderData.customer.email,
            shipping_address: orderData.customer,
            subtotal: orderData.subtotal,
            delivery_fee: orderData.deliveryFee,
            discount_amount: orderData.discount,
            total_amount: orderData.total,
            payment_method: 'COD',
            order_status: 'Pending',
            order_notes: orderData.customer.notes || '',
          })
          .select()
          .single();

        if (dbOrder && !orderErr) {
          newOrder.id = dbOrder.id;
          initialHistoryItem.orderId = dbOrder.id;

          // Insert order items
          const dbItems = orderData.items.map((item) => ({
            order_id: dbOrder.id,
            product_id: item.productId && !item.productId.startsWith('m2-') && !item.productId.startsWith('ultra-') ? item.productId : null,
            product_name: item.name,
            product_image: item.image,
            unit_price: item.price,
            quantity: item.quantity,
            total_price: item.price * item.quantity,
          }));

          await supabase.from('order_items').insert(dbItems);

          // Insert initial status history
          await supabase.from('order_status_history').insert({
            order_id: dbOrder.id,
            status: 'Pending',
            title: 'Order Placed',
            description: 'Order placed via Cash on Delivery. Awaiting merchant confirmation.',
          });

          // Create or update customer record in database
          await supabase.from('customers').upsert(
            {
              full_name: orderData.customer.fullName,
              phone: orderData.customer.phone,
              email: orderData.customer.email,
              total_orders: 1,
              total_spent: orderData.total,
            },
            { onConflict: 'phone' }
          );
        }
      } catch (e) {
        console.error('Error writing order to Supabase:', e);
      }
    }

    setOrders((prev) => [newOrder, ...prev]);

    // Update local customer list
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

  const updateOrderStatus = async (orderId: string, status: Order['status'], cancellationReason?: string) => {
    const dbStatus = frontendStatusToDb(status);
    const nowIso = new Date().toISOString();

    let historyTitle = 'Status Updated';
    let historyDesc = `Order status updated to ${dbStatus}.`;

    if (dbStatus === 'Confirmed') {
      historyTitle = 'Order Confirmed';
      historyDesc = 'Merchant confirmed order and allocated inventory.';
    } else if (dbStatus === 'Processing') {
      historyTitle = 'Processing & Preparing';
      historyDesc = 'Item is being inspected and packed for dispatch.';
    } else if (dbStatus === 'Out for Delivery') {
      historyTitle = 'Out for Delivery';
      historyDesc = 'Package handed to courier driver in Qatar for delivery.';
    } else if (dbStatus === 'Delivered') {
      historyTitle = 'Delivered & Completed';
      historyDesc = 'Package delivered successfully and COD payment collected.';
    } else if (dbStatus === 'Cancelled') {
      historyTitle = 'Order Cancelled';
      historyDesc = cancellationReason ? `Cancelled: ${cancellationReason}` : 'Order was cancelled.';
    }

    const newHistoryItem: OrderStatusHistoryItem = {
      id: `h-${Date.now()}`,
      orderId,
      status: dbStatus,
      title: historyTitle,
      description: historyDesc,
      createdAt: nowIso,
    };

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedHistory = o.statusHistory ? [...o.statusHistory, newHistoryItem] : [newHistoryItem];
          return {
            ...o,
            status,
            cancellationReason: cancellationReason || o.cancellationReason,
            statusHistory: updatedHistory,
          };
        }
        return o;
      })
    );

    if (isSupabaseConfigured && !orderId.startsWith('ord-')) {
      try {
        await supabase
          .from('orders')
          .update({
            order_status: dbStatus,
            cancellation_reason: cancellationReason || null,
            updated_at: nowIso,
          })
          .eq('id', orderId);

        await supabase.from('order_status_history').insert({
          order_id: orderId,
          status: dbStatus,
          title: historyTitle,
          description: historyDesc,
        });
      } catch (e) {
        console.error('Error updating order status in DB:', e);
      }
    }
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));

    if (isSupabaseConfigured && !orderId.startsWith('ord-')) {
      try {
        await supabase.from('orders').delete().eq('id', orderId);
      } catch (e) {
        console.error('Error deleting order from DB:', e);
      }
    }
  };

  // Customer CRUD
  const addCustomer = async (custData: Omit<Customer, 'id'>): Promise<Customer> => {
    const newCust: Customer = {
      ...custData,
      id: `cust-${Date.now()}`,
    };
    setCustomers((prev) => [newCust, ...prev]);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('customers').insert({
          full_name: custData.fullName,
          phone: custData.phone,
          email: custData.email,
          total_orders: custData.totalOrders,
          total_spent: custData.totalSpent,
        });
      } catch (e) {
        console.error('Error creating customer in DB:', e);
      }
    }

    return newCust;
  };

  // Store Settings
  const updateCompanyInfo = async (updatedFields: Partial<CompanyInfo>) => {
    const updated = { ...companyInfo, ...updatedFields };
    setCompanyInfo(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('settings').upsert({
          key: 'company_info',
          value: updated,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });
      } catch (e) {
        console.error('Error updating company settings in DB:', e);
      }
    }
  };

  const updateInventoryStock = async (productId: string, stockQuantity: number) => {
    setInventory((prev) => ({
      ...prev,
      [productId]: {
        productId,
        stockQuantity,
        lowStockThreshold: 5,
        lastRestocked: new Date().toISOString(),
      },
    }));

    updateProduct(productId, { stockQuantity, inStock: stockQuantity > 0 });
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
        uploadProductImage,

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

        isLoadingData,
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
