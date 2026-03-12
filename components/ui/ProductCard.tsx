"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const milkGradient =
    product.fatProfile === "light"
      ? "from-slate-50 to-stone-100"
      : product.fatProfile === "balanced"
      ? "from-amber-50 to-cream-200"
      : product.fatProfile === "rich"
      ? "from-amber-100 to-cream-200"
      : product.fatProfile === "full-cream"
      ? "from-amber-200 to-stone-200"
      : "from-cream-100 to-cream-200";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative group bg-cream-100 border border-stone-200 rounded-2xl overflow-hidden transition-shadow duration-350",
        "hover:shadow-card-hover hover:border-stone-300",
        className
      )}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image area */}
        <div className={cn("relative h-52 bg-gradient-to-br overflow-hidden", milkGradient)}>
          {/* Decorative circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-inner">
              <span className="font-display text-4xl select-none" aria-hidden="true">
                {product.category === "fresh-milk" ? "🥛" :
                 product.category === "ghee" ? "✨" :
                 product.category === "curd" ? "🍶" :
                 product.category === "paneer" ? "🧀" :
                 product.category === "buttermilk" ? "🥤" : "🥛"}
              </span>
            </div>
          </div>

          {/* Badge */}
          {product.badgeLabel && (
            <span className="absolute top-3 left-3 badge-sage text-xs">
              {product.badgeLabel}
            </span>
          )}

          {product.isSubscriptionEligible && (
            <span className="absolute top-3 right-3 badge-amber text-xs">
              Subscribe
            </span>
          )}

          {/* Quick add button */}
          <motion.button
            onClick={handleAddToCart}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className={cn(
              "absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300",
              "opacity-0 group-hover:opacity-100",
              added ? "bg-sage-600 text-white" : "bg-white text-stone-800"
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <motion.span
              key={added ? "check" : "plus"}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {added ? (
                <ShoppingBag size={16} strokeWidth={2} />
              ) : (
                <Plus size={18} strokeWidth={2.5} />
              )}
            </motion.span>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <p className="label-sm mb-2">
            {product.category.replace("-", " ")}
            {product.milkType ? ` · ${product.milkType}` : ""}
          </p>

          {/* Name */}
          <h3 className="font-display text-lg font-500 text-stone-900 mb-1 leading-tight">
            {product.name}
          </h3>

          {/* Fat % pill */}
          {product.fatPercentage && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-16 h-1.5 rounded-full bg-stone-200 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={product.fatPercentage}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-label={`Fat: ${product.fatPercentage}%`}
                >
                  <div
                    className="h-full rounded-full bg-amber-300 transition-all duration-700"
                    style={{ width: `${(product.fatPercentage / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-stone-500 font-medium">{product.fatPercentage}% fat</span>
              </div>
            </div>
          )}

          {/* Description snippet */}
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Price + Rating */}
          <div className="flex items-end justify-between">
            <div>
              <span className="font-display text-xl font-600 text-stone-900">
                ₹{product.pricePerUnit}
              </span>
              <span className="text-stone-400 text-sm ml-1">{product.priceUnit}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-medium text-stone-600">{product.rating}</span>
              <span className="text-xs text-stone-400">({product.reviewCount.toLocaleString()})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
