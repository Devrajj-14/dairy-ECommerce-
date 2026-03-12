"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, RefreshCw, Truck, Shield, Plus, Minus, ChevronLeft } from "lucide-react";
import { products } from "@/lib/data";
import Link from "next/link";

// In a real app, this would use dynamic routing [id]
// For this demo, we show a product detail for the first product
export default function ProductDetailPage() {
  const product = products[0]; // A2 Cow Milk
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews">("description");

  const totalPrice = product.pricePerUnit * quantity;

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      {/* Breadcrumb */}
      <div className="container-premium pt-6 pb-0">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-stone-400">
            <li><Link href="/" className="hover:text-stone-600 transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/shop" className="hover:text-stone-600 transition-colors">Shop</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-600" aria-current="page">{product.name}</li>
          </ol>
        </nav>
      </div>

      <div className="container-premium py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <div className="relative bg-gradient-to-br from-amber-50 via-cream-100 to-cream-200 rounded-3xl overflow-hidden aspect-square flex items-center justify-center mb-4 shadow-sm">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-center"
              >
                <div className="text-9xl mb-4" aria-hidden="true">🥛</div>
                <div className="px-5 py-2 bg-white/70 backdrop-blur-sm rounded-full">
                  <p className="text-sm font-semibold text-stone-700">{product.name}</p>
                  <p className="text-xs text-stone-400">{product.fatPercentage}% fat · {product.quantity}{product.quantityUnit}</p>
                </div>
              </motion.div>

              {product.badgeLabel && (
                <div className="absolute top-5 left-5">
                  <span className="badge-sage">{product.badgeLabel}</span>
                </div>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-3">
              {["fat", "farm", "package", "delivery"].map((v, i) => (
                <div
                  key={v}
                  className={`aspect-square rounded-xl bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center cursor-pointer border-2 transition-all ${i === 0 ? "border-sage-500" : "border-transparent hover:border-stone-300"}`}
                >
                  <span className="text-2xl" aria-hidden="true">{["🥛","🌿","📦","🚴"][i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <p className="label-md mb-3">
              {product.category.replace("-", " ")} · {product.milkType && product.milkType}
            </p>

            <h1 className="display-md text-stone-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-stone-200"}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-stone-900">{product.rating}</span>
              <span className="text-sm text-stone-400">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Fat visualization */}
            {product.fatPercentage && (
              <div className="mb-6 p-4 bg-cream-100 border border-stone-200 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-stone-700">Fat Content</span>
                  <span className="font-display text-xl font-700 text-stone-900">{product.fatPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(product.fatPercentage / 10) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-200 to-amber-400"
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-stone-400">
                  <span>0% — Skimmed</span>
                  <span>Full Cream — 10%</span>
                </div>
              </div>
            )}

            {/* Order type toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-cream-100 border border-stone-200 rounded-xl">
              <button
                onClick={() => setIsSubscription(false)}
                aria-pressed={!isSubscription}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 ${
                  !isSubscription ? "bg-white text-stone-900 shadow-sm border border-stone-200" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                One-time
              </button>
              <button
                onClick={() => setIsSubscription(true)}
                aria-pressed={isSubscription}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 ${
                  isSubscription ? "bg-white text-sage-700 shadow-sm border border-stone-200" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                Subscribe & Save 5%
              </button>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm text-stone-600 font-medium">Quantity</label>
              <div className="flex items-center gap-0 border border-stone-200 rounded-xl bg-cream-100">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center rounded-l-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/40 transition-colors focus-visible:ring-2 focus-visible:ring-sage-600"
                >
                  <Minus size={15} />
                </button>
                <span className="w-12 text-center font-semibold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center rounded-r-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/40 transition-colors focus-visible:ring-2 focus-visible:ring-sage-600"
                >
                  <Plus size={15} />
                </button>
              </div>
              <span className="text-stone-400 text-sm">× {product.pricePerUnit}/L</span>
            </div>

            {/* Price + CTA */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display text-4xl font-700 text-stone-900">₹{isSubscription ? Math.round(totalPrice * 0.95) : totalPrice}</span>
                {isSubscription && (
                  <span className="text-stone-400 text-sm line-through">₹{totalPrice}</span>
                )}
              </div>

              <button
                className="w-full py-4 bg-sage-600 hover:bg-sage-700 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2.5 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2"
              >
                <ShoppingBag size={20} />
                {isSubscription ? "Subscribe — ₹" + Math.round(totalPrice * 0.95) + "/delivery" : "Add to Cart — ₹" + totalPrice}
              </button>
            </div>

            {/* Delivery info */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Truck, label: "Free delivery on subscription" },
                { icon: RefreshCw, label: "Pause anytime" },
                { icon: Shield, label: "100% quality guarantee" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="p-3 bg-cream-100 border border-stone-200/80 rounded-xl text-center">
                  <Icon size={18} strokeWidth={1.5} className="text-sage-600 mx-auto mb-1.5" />
                  <p className="text-xs text-stone-500 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Farm source */}
            <div className="p-4 bg-sage-600/5 border border-sage-500/20 rounded-xl">
              <p className="text-xs text-stone-500 mb-0.5">Sourced from</p>
              <p className="text-sm font-semibold text-sage-700">{product.farmSource}</p>
              <p className="text-xs text-stone-400 mt-1">{product.deliveryNote}</p>
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description / Nutrition / Reviews */}
        <div className="mt-16">
          <div className="flex gap-0 border-b border-stone-200" role="tablist">
            {(["description", "nutrition", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize border-b-2 -mb-px transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 ${
                  activeTab === tab
                    ? "border-sage-600 text-sage-700"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-8" role="tabpanel">
            {activeTab === "description" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="font-display text-xl text-stone-900 mb-3">About this product</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">{product.description}</p>
                    <ul className="space-y-2">
                      {product.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-stone-600">
                          <div className="w-5 h-5 rounded-full bg-sage-600/10 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-sage-600" />
                          </div>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "nutrition" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h3 className="font-display text-xl text-stone-900 mb-5">Nutrition facts <span className="text-stone-400 text-base font-400 font-sans">per 100ml</span></h3>
                <div className="max-w-sm grid grid-cols-2 gap-3">
                  {product.nutritionFacts?.map((fact) => (
                    <div key={fact.label} className="p-4 bg-cream-100 border border-stone-200 rounded-xl">
                      <p className="text-xs text-stone-400 mb-1">{fact.label}</p>
                      <p className="font-display text-2xl font-700 text-stone-900">{fact.value}<span className="text-sm text-stone-400 ml-1">{fact.unit}</span></p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-center">
                    <p className="font-display text-5xl font-700 text-stone-900">{product.rating}</p>
                    <div className="flex gap-0.5 justify-center my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-400">{product.reviewCount.toLocaleString()} reviews</p>
                  </div>
                </div>

                <div className="space-y-4 max-w-xl">
                  {[
                    { name: "Preethi G.", rating: 5, text: "The A2 milk is exceptional. I can taste the difference from supermarket milk immediately." },
                    { name: "Suresh K.", rating: 5, text: "Finally found a milk my daughter doesn't complain about. She says it tastes like the milk from her grandmother's village." },
                    { name: "Ravi M.", rating: 5, text: "Switched my whole family. The fat percentage transparency is what sold me — I actually know what I'm buying." },
                  ].map(({ name, rating, text }) => (
                    <div key={name} className="p-5 bg-cream-100 border border-stone-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm text-stone-900">{name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-500 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
