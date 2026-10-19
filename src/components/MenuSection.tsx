import React, { useState, useMemo } from 'react';
import { Search, Plus, Star, Flame, Eye, X } from 'lucide-react';
import { Product, Language, Category } from '../types';
import { products } from '../data/products';
import { translations } from '../data/translations';

interface MenuSectionProps {
  currentLang: Language;
  onAddToCart: (product: Product) => void;
  onInspectProduct: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  currentLang,
  onAddToCart,
  onInspectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [inspectModalProduct, setInspectModalProduct] = useState<Product | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const t = translations[currentLang];

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const handleInspect = (product: Product) => {
    setInspectModalProduct(product);
    onInspectProduct(product);
  };

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'burger', label: t.catBurger },
    { id: 'combo', label: t.catCombo },
    { id: 'chicken', label: t.catChicken },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchTerm.toLowerCase().trim();
      const nameUz = item.name.uz.toLowerCase();
      const nameRu = item.name.ru.toLowerCase();
      const nameEn = item.name.en.toLowerCase();
      const descUz = item.description.uz.toLowerCase();
      const matchesSearch = !query || nameUz.includes(query) || nameRu.includes(query) || nameEn.includes(query) || descUz.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section id="menu" className="py-20 bg-zinc-50/70 dark:bg-zinc-900/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Chorsu Fast Food Cafe</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-balance">
            {t.menuHeading}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            {t.menuSubtitle}
          </p>
        </div>

        {/* Search Bar & Category Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-xs"
              aria-label={t.searchPlaceholder}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center p-1.5 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer focus:outline-none ${
                    active
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-800/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8">
            <span className="text-5xl block mb-3">🍔</span>
            <h3 className="font-display text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {t.emptyMenu}
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Boshqa so‘z bilan qidirib ko‘ring yoki toifani o‘zgartiring.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
            >
              Qidiruvni tozalash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const hasImgError = imgErrors[product.id];
              return (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-zinc-800/90 rounded-2xl border border-zinc-200 dark:border-zinc-700/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  {/* Card Media Top */}
                  <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                    {!hasImgError ? (
                      <img
                        src={product.image}
                        alt={product.name[currentLang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        onError={() => handleImageError(product.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-center">
                        <span className="text-4xl">🍔</span>
                        <span className="text-xs font-bold text-amber-600 mt-1">Chorsu Burger</span>
                      </div>
                    )}

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                        {product.badge[currentLang]}
                      </div>
                    )}

                    {/* Inspect Quick View Button */}
                    <button
                      onClick={() => handleInspect(product)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 hover:text-amber-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none"
                      title={`${t.viewDetails} (+2 coins)`}
                      aria-label={`${t.viewDetails} for ${product.name[currentLang]}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                        <span className="flex items-center gap-1 text-amber-500 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-mono tabular-nums">{product.rating.toFixed(1)}</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{product.weightGrams}g</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.calories} kcal</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1 mb-1.5">
                        {product.name[currentLang]}
                      </h3>

                      {/* Product Description */}
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                        {product.description[currentLang]}
                      </p>
                    </div>

                    {/* Price & Add to Cart Footer */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-zinc-400">Narxi</div>
                        <div className="font-display font-black text-lg text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                          {product.price.toLocaleString()} <span className="text-xs font-semibold">{t.priceUzs}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer focus:outline-none"
                        aria-label={`Add ${product.name[currentLang]} to cart`}
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span>{t.addToCart}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Inspect Product Modal */}
      {inspectModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 relative">
            <button
              onClick={() => setInspectModalProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-zinc-950 relative">
              <img
                src={inspectModalProduct.image}
                alt={inspectModalProduct.name[currentLang]}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-lg">
                🪙 +2 Bonus Coin qo‘shildi!
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                  {inspectModalProduct.category.toUpperCase()} · {inspectModalProduct.calories} KCAL
                </div>
                <h3 className="font-display text-2xl font-black text-zinc-900 dark:text-white">
                  {inspectModalProduct.name[currentLang]}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                  {inspectModalProduct.description[currentLang]}
                </p>
              </div>

              {/* Ingredients List */}
              <div>
                <h4 className="text-xs font-bold uppercase text-zinc-400 mb-2">Tarkibi va masalliqlar:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {inspectModalProduct.ingredients[currentLang].map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Add button */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Umumiy narx</div>
                  <div className="font-display font-black text-2xl text-amber-500 font-mono tabular-nums">
                    {inspectModalProduct.price.toLocaleString()} {t.priceUzs}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(inspectModalProduct);
                    setInspectModalProduct(null);
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>{t.addToCart}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
