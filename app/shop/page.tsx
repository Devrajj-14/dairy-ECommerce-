"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import type { ProductCategory } from "@/lib/types";

const categories: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Fresh Milk", value: "fresh-milk" },
  { label: "Curd", value: "curd" },
  { label: "Ghee", value: "ghee" },
  { label: "Paneer", value: "paneer" },
  { label: "Buttermilk", value: "buttermilk" },
];

const milkTypes = [
  { label: "All Milk Types", value: "all" },
  { label: "Cow Milk", value: "cow" },
  { label: "Buffalo Milk", value: "buffalo" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [selectedMilkType, setSelectedMilkType] = useState("all");
  const [subscriptionOnly, setSubscriptionOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const catMatch = selectedCategory === "all" || p.category === selectedCategory;
      const milkMatch = selectedMilkType === "all" || (p.milkType && p.milkType === selectedMilkType);
      const subMatch = !subscriptionOnly || p.isSubscriptionEligible;
      const searchMatch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && milkMatch && subMatch && searchMatch;
    });
  }, [selectedCategory, selectedMilkType, subscriptionOnly, searchQuery]);

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      {/* Page header */}
      <div className="container-premium py-10 border-b border-stone-200/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-md mb-2">Pura collection</p>
          <h1 className="display-md text-stone-900">Our Products</h1>
          <p className="text-stone-500 text-sm mt-2 max-w-md">
            Pure, fresh, sourced with care. Every product represents the quality standard we built Pura around.
          </p>
        </motion.div>
      </div>

      <div className="container-premium py-10">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10"
        >
          {/* Search */}
          <div className="relative max-w-sm mb-6">
            <label htmlFor="product-search" className="sr-only">Search products</label>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              id="product-search"
              type="search"
              placeholder="Search milk, ghee, paneer…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-10 text-sm py-3"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 font-medium focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                    selectedCategory === cat.value
                      ? "bg-stone-900 text-white border-stone-900"
                      : "bg-white text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900"
                  }`}
                  aria-pressed={selectedCategory === cat.value}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-stone-300" aria-hidden="true">|</span>

            {/* Milk type pills */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by milk type">
              {milkTypes.map((mt) => (
                <button
                  key={mt.value}
                  onClick={() => setSelectedMilkType(mt.value)}
                  className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 font-medium focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                    selectedMilkType === mt.value
                      ? "bg-sage-600 text-white border-sage-600"
                      : "bg-white text-stone-600 border-stone-200 hover:border-sage-400 hover:text-stone-900"
                  }`}
                  aria-pressed={selectedMilkType === mt.value}
                >
                  {mt.label}
                </button>
              ))}
            </div>

            {/* Subscribe toggle */}
            <button
              onClick={() => setSubscriptionOnly(!subscriptionOnly)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 font-medium focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                subscriptionOnly
                  ? "bg-amber-300 text-stone-900 border-amber-300"
                  : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"
              }`}
              aria-pressed={subscriptionOnly}
            >
              Subscription eligible
            </button>
          </div>

          {/* Result count */}
          <p className="text-sm text-stone-400 mt-4">
            {filtered.length} {filtered.length === 1 ? "product" : "products"} found
          </p>
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <p className="font-display text-2xl text-stone-300 mb-2">No products match</p>
              <p className="text-stone-400 text-sm mb-5">Try adjusting your filters or search term.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedMilkType("all");
                  setSubscriptionOnly(false);
                  setSearchQuery("");
                }}
                className="text-sm text-sage-600 hover:text-sage-700 font-medium underline underline-offset-2"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
