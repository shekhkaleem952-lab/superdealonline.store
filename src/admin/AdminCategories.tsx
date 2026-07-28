import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { Plus, Edit, Trash2, FolderPlus, Layers, X, Check } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);

  const [catForm, setCatForm] = useState({
    name: '',
    nameArabic: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setCatForm({
      name: '',
      nameArabic: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setCatForm({
      name: cat.name,
      nameArabic: cat.nameArabic || '',
      description: cat.description,
      image: cat.image,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: catForm.name,
        nameArabic: catForm.nameArabic,
        description: catForm.description,
        image: catForm.image,
      });
    } else {
      const slug = catForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      addCategory({
        id: slug as any,
        name: catForm.name,
        nameArabic: catForm.nameArabic,
        iconName: 'Package',
        count: 0,
        image: catForm.image,
        description: catForm.description,
        gradient: 'from-blue-600 to-slate-800',
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#0057FF]">Catalog Taxonomy</span>
          <h1 className="text-2xl font-extrabold text-slate-900 font-playfair">
            Product Categories ({categories.length})
          </h1>
          <p className="text-xs text-slate-500">
            Organize store catalog items into structured, searchable categories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-6 py-3 bg-[#0057FF] hover:bg-blue-600 text-white text-xs font-bold rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const liveCount = products.filter((p) => p.category === cat.id).length;

          return (
            <div
              key={cat.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-32 overflow-hidden bg-slate-900">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-white">{cat.name}</h3>
                    <span className="bg-white/20 text-white font-bold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md">
                      {liveCount} Products
                    </span>
                  </div>
                  {cat.nameArabic && (
                    <p className="text-xs text-blue-200 font-semibold">{cat.nameArabic}</p>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{cat.description}</p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-mono font-bold text-slate-400">ID: {cat.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-2 bg-blue-50 text-[#0057FF] hover:bg-[#0057FF] hover:text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Category Name (English) *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. Smart Watches"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Arabic Name</label>
                <input
                  type="text"
                  dir="rtl"
                  value={catForm.nameArabic}
                  onChange={(e) => setCatForm({ ...catForm, nameArabic: e.target.value })}
                  placeholder="الساعات الذكية"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  placeholder="Category short summary..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Cover Image URL</label>
                <input
                  type="text"
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0057FF] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
