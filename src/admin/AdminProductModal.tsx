import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { X, Plus, Trash2, Image, Check, Sparkles, AlertCircle } from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

const PRESET_SAMPLE_IMAGES = [
  { name: 'Power Bank', url: 'https://images.unsplash.com/photo-1609592424009-dd2790610332?auto=format&fit=crop&q=80&w=800' },
  { name: 'Smart Watch', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800' },
  { name: 'AirPods', url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800' },
  { name: 'Speaker', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800' },
  { name: 'Fast Charger', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800' },
  { name: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800' }
];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
}) => {
  const { addProduct, updateProduct, categories } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    nameArabic: '',
    category: 'mobile-acc',
    brand: 'Anker',
    price: 99,
    originalPrice: 149,
    stockQuantity: 25,
    sku: 'SDQ-PROD-101',
    shortDescription: 'High quality accessory with local Qatar warranty.',
    description: 'Designed for high efficiency and daily durability in Qatar.',
    image: PRESET_SAMPLE_IMAGES[0].url,
    additionalImages: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
    ],
    features: ['Official Qatar Warranty', 'Fast Charging Compatible', 'Compact Durable Casing'],
    specifications: {
      Warranty: '12 Months Local Qatar',
      Compatibility: 'Universal iOS / Android',
      Material: 'Premium Flame Retardant ABS',
    } as Record<string, string>,
    inStock: true,
    isBestSeller: false,
    isNew: true,
    isDeal: false,
    badge: 'NEW',
    colors: ['Black', 'White'],
  });

  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        nameArabic: productToEdit.nameArabic || '',
        category: productToEdit.category || 'mobile-acc',
        brand: productToEdit.brand || 'Super Deal',
        price: productToEdit.price || 0,
        originalPrice: productToEdit.originalPrice || productToEdit.price || 0,
        stockQuantity: productToEdit.stockQuantity || 20,
        sku: productToEdit.sku || `SDQ-${productToEdit.id}`,
        shortDescription: productToEdit.shortDescription || productToEdit.description.slice(0, 80),
        description: productToEdit.description || '',
        image: productToEdit.image || PRESET_SAMPLE_IMAGES[0].url,
        additionalImages: productToEdit.additionalImages || [],
        features: productToEdit.specs && productToEdit.specs.length > 0 ? productToEdit.specs : ['High Durability', 'Local Warranty'],
        specifications: productToEdit.specifications || { Warranty: productToEdit.warranty || '1 Year' },
        inStock: productToEdit.inStock ?? true,
        isBestSeller: !!productToEdit.isBestSeller,
        isNew: !!productToEdit.isNew,
        isDeal: !!productToEdit.isDeal,
        badge: productToEdit.badge || '',
        colors: productToEdit.colors || ['Black'],
      });
    } else {
      // Reset form for New Product
      setFormData({
        name: '',
        nameArabic: '',
        category: 'mobile-acc',
        brand: 'Joyroom',
        price: 89,
        originalPrice: 129,
        stockQuantity: 30,
        sku: `SDQ-${Math.floor(1000 + Math.random() * 9000)}`,
        shortDescription: 'Premium electronic product with Qatar express delivery.',
        description: 'Original quality item with complete accessories and official local Qatar warranty.',
        image: PRESET_SAMPLE_IMAGES[0].url,
        additionalImages: [],
        features: ['Official Qatar Warranty', 'High Performance Chipset', 'Ergonomic Premium Finish'],
        specifications: {
          Warranty: '12 Months Qatar Warranty',
          Color: 'Black / Silver',
          Power: 'Fast Charge 20W',
        },
        inStock: true,
        isBestSeller: false,
        isNew: true,
        isDeal: false,
        badge: 'NEW',
        colors: ['Black', 'Silver'],
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeature.trim()],
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecKey.trim()]: newSpecValue.trim(),
      },
    }));
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveSpec = (key: string) => {
    setFormData((prev) => {
      const copy = { ...prev.specifications };
      delete copy[key];
      return { ...prev, specifications: copy };
    });
  };

  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, newGalleryUrl.trim()],
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategoryObj = categories.find((c) => c.id === formData.category);
    const categoryLabel = selectedCategoryObj ? selectedCategoryObj.name : 'Accessories';

    const calcDiscount =
      formData.originalPrice > formData.price
        ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)
        : 0;

    const payload = {
      name: formData.name,
      nameArabic: formData.nameArabic,
      category: formData.category as any,
      categoryLabel,
      brand: formData.brand,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discountPercent: calcDiscount,
      stockQuantity: Number(formData.stockQuantity),
      sku: formData.sku,
      shortDescription: formData.shortDescription,
      description: formData.description,
      specs: formData.features,
      specifications: formData.specifications,
      image: formData.image,
      additionalImages: formData.additionalImages,
      inStock: formData.inStock,
      isBestSeller: formData.isBestSeller,
      isNew: formData.isNew,
      isDeal: formData.isDeal,
      badge: formData.badge || (calcDiscount > 0 ? `${calcDiscount}% OFF` : ''),
      colors: formData.colors,
      rating: productToEdit ? productToEdit.rating : 4.9,
      reviewCount: productToEdit ? productToEdit.reviewCount : 12,
      warranty: formData.specifications['Warranty'] || '1 Year Qatar Warranty',
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, payload);
    } else {
      addProduct(payload);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex justify-center items-center p-3 sm:p-6 font-sans">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0057FF]/20 border border-[#0057FF]/40 text-[#0057FF] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                {productToEdit ? 'Edit Product Details' : 'Add New Product to Catalog'}
              </h2>
              <p className="text-[11px] text-slate-400">
                Super Deal Online.Store Inventory & Pricing Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {savedSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-2xl flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Product saved successfully! Updating inventory...</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0057FF]">
              1. Product Identification & Branding
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Product Name (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ultra 2 Pro Max Smartwatch"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Product Name (Arabic)</label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.nameArabic}
                  onChange={(e) => setFormData({ ...formData, nameArabic: e.target.value })}
                  placeholder="ساعة ذكية اولترا 2 برو"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Brand Name</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="e.g. Joyroom, Anker, Apple"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">SKU Code</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="SDQ-ACC-001"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Badge Label</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. 35% OFF or BEST SELLER"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Stock Inventory */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0057FF]">
              2. Pricing (QAR) & Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Selling Price (QAR) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Compare Price / Regular (QAR)</label>
                <input
                  type="number"
                  min="0"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Stock Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>
            </div>

            {/* Checkboxes & Flags */}
            <div className="flex flex-wrap gap-4 pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0057FF] focus:ring-[#0057FF]"
                />
                In Stock & Active
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isBestSeller}
                  onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0057FF] focus:ring-[#0057FF]"
                />
                Best Seller
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0057FF] focus:ring-[#0057FF]"
                />
                New Arrival
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.isDeal}
                  onChange={(e) => setFormData({ ...formData, isDeal: e.target.checked })}
                  className="w-4 h-4 rounded text-[#0057FF] focus:ring-[#0057FF]"
                />
                Flash Deal
              </label>
            </div>
          </div>

          {/* Section 3: Descriptions */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0057FF]">
              3. Descriptions & Details
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Short Summary Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief 1-line headline product summary"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed product write-up highlighting features and build..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Features & Specifications */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0057FF]">
              4. Features & Key Specifications
            </h3>

            {/* Bullet Features */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Highlight Features (Bullet List)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g. Active Noise Cancellation, 30hr Battery"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="bg-[#0057FF] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {formData.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-slate-200 text-slate-800 text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-2 shadow-xs"
                  >
                    <span>{feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications Key-Value */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-700">Technical Specifications (Key - Value)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  placeholder="Key (e.g. Battery)"
                  className="w-1/3 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  placeholder="Value (e.g. 20,000 mAh)"
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-1.5 pt-1">
                {Object.entries(formData.specifications).map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-white border border-slate-200 text-xs p-2.5 rounded-xl flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-800">{k}:</span>
                    <span className="text-slate-600 flex-1 ml-2">{v}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(k)}
                      className="text-slate-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Media Images Upload & Gallery */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0057FF] flex items-center gap-1.5">
              <Image className="w-4 h-4" /> 5. Images & Media Gallery
            </h3>

            {/* Main Image URL & Presets */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Main Cover Image URL *</label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
              />

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-500">Quick Presets:</span>
                {PRESET_SAMPLE_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: preset.url })}
                    className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Live Preview */}
              {formData.image && (
                <div className="mt-2 w-24 h-24 rounded-2xl border-2 border-slate-200 overflow-hidden bg-white shadow-xs">
                  <img
                    src={formData.image}
                    alt="Main Cover Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).setAttribute('src', PRESET_SAMPLE_IMAGES[0].url);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Additional Gallery Images */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-700">Multiple Gallery Images</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Add additional image URL..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0057FF]"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Gallery Image
                </button>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {formData.additionalImages.map((imgUrl, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-xl border border-slate-200 overflow-hidden group">
                    <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0057FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{productToEdit ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
