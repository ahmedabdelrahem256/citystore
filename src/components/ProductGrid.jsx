import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { 
  ArrowUpDown, 
  SlidersHorizontal, 
  PackageSearch, 
  RotateCcw, 
  Search, 
  X, 
  Filter, 
  DollarSign 
} from 'lucide-react';

export default function ProductGrid({
  products,
  allProducts,
  categories,
  activeCategory,
  onSelectCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  onQuickView,
  searchQuery,
  setSearchQuery,
  onResetFilters,
  onOpenSellUsedModal
}) {
  const isUsedCategory = activeCategory === "المنتجات المستعملة";

  // Calculate category product counts
  const categoryCounts = useMemo(() => {
    const counts = { "الكل": allProducts.length, "المنتجات المستعملة": 0 };
    (categories || []).forEach(cat => {
      counts[cat] = 0;
    });
    counts["الكل"] = allProducts.length;

    allProducts.forEach(p => {
      if (p.isUsed) {
        counts["المنتجات المستعملة"] = (counts["المنتجات المستعملة"] || 0) + 1;
      }
      (categories || []).forEach(cat => {
        if (cat === "الكل" || cat === "المنتجات المستعملة") return;
        const normP = (p.category || '').trim().replace(/^ال/, '').replace(/[أإآ]/g, 'ا');
        const normC = (cat || '').trim().replace(/^ال/, '').replace(/[أإآ]/g, 'ا');
        if (p.category === cat || normP === normC) {
          counts[cat] = (counts[cat] || 0) + 1;
        }
      });
    });
    return counts;
  }, [allProducts, categories]);

  const priceFilters = [
    { id: 'all', label: 'كافة الأسعار' },
    { id: 'under-300', label: 'أقل من 300 ج.م' },
    { id: '300-1000', label: '300 - 1,000 ج.م' },
    { id: '1000-3000', label: '1,000 - 3,000 ج.م' },
    { id: 'above-3000', label: 'أكثر من 3,000 ج.م' }
  ];

  return (
    <section id="products" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span>{isUsedCategory ? 'سوق المستعمل المعتمد' : 'تسوق حسب رغبتك'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {isUsedCategory ? 'الأجهزة والمنتجات المستعملة المعتمدة' : 'تشكيلة المنتجات المميزة'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isUsedCategory
              ? 'تصفح أفضل الأجهزة المستعملة بحالة ممتازة وكالجديدة مع فحص فني وضمان مطابقة.'
              : 'اختر من بين أفضل المنتجات المصنفة بدقة لتناسب احتياجاتك اليومية.'}
          </p>
        </div>

        {/* Product count indicator */}
        <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-full w-fit">
          عرض <span className="font-bold text-teal-700">{products.length}</span> منتج متوفر
        </div>
      </div>

      {/* Used Products Featured Banner */}
      {isUsedCategory && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                جميع المنتجات المستعملة تخضع لضمان الفحص والمطابقة
              </h4>
              <p className="text-xs text-amber-800/80">
                يحق للمشتري فحص الجهاز عند الاستلام والتأكد من تطابق الحالة والملحقات.
              </p>
            </div>
          </div>

          {onOpenSellUsedModal && (
            <button
              onClick={onOpenSellUsedModal}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              + اعرض جهازك المستعمل للبيع
            </button>
          )}
        </div>
      )}

      {/* Category Pills Bar */}
      <div className="mb-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        
        {/* Quick Price Range Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-gray-500 shrink-0 ml-1">
            نطاق السعر:
          </span>
          {priceFilters.map((p) => (
            <button
              key={p.id}
              onClick={() => setPriceRange(p.id)}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                priceRange === p.id
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Sort Controls Dropdown */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-teal-600" />
            <span>ترتيب حسب:</span>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer shadow-xs"
          >
            <option value="featured">المميزة والأكثر طلباً</option>
            <option value="price-asc">السعر: من الأقل للأعلى ⬆</option>
            <option value="price-desc">السعر: من الأعلى للأقل ⬇</option>
            <option value="rating">التقييم الأعلى ⭐</option>
            <option value="discount">الأعلى خصماً %</option>
          </select>
        </div>

      </div>

      {/* Active Filter Tags Banner (if filtered) */}
      {(searchQuery || priceRange !== 'all' || activeCategory !== 'الكل') && (
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-200">
          <span className="text-gray-500 font-semibold">التصفيات النشطة:</span>
          
          {activeCategory !== 'الكل' && (
            <span className="bg-teal-100 text-teal-800 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
              الفئة: {activeCategory}
              <button onClick={() => onSelectCategory('الكل')} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
              بحث: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {priceRange !== 'all' && (
            <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
              السعر: {priceFilters.find(p => p.id === priceRange)?.label}
              <button onClick={() => setPriceRange('all')} className="hover:text-rose-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={onResetFilters}
            className="text-rose-600 font-bold hover:underline mr-auto text-xs cursor-pointer"
          >
            إعادة تعيين الكل
          </button>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-gray-200 my-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            لم نتمكن من العثور على أي منتج مطابق
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            {searchQuery 
              ? `لا توجد نتائج مطابقة لعبارة البحث "${searchQuery}". جرب كلمة بحث أخرى أو قم بتغيير نطاق السعر.`
              : 'لا توجد منتجات ضمن خيارات التصفية الحالية.'}
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer"
          >
            عرض كافة المنتجات
          </button>
        </div>
      )}

    </section>
  );
}
