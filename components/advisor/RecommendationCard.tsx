"use client";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Package, Leaf } from "lucide-react";
import type { ProductRecommendation } from "@/lib/types/advisor";
import Link from "next/link";

interface RecommendationCardProps {
  recommendation: ProductRecommendation;
  onBuildPlan?: () => void;
  onRestart?: () => void;
}

export default function RecommendationCard({
  recommendation,
  onBuildPlan,
  onRestart,
}: RecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-lg mt-4"
    >
      {/* Card header */}
      <div
        className="px-5 py-4"
        style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Leaf size={14} color="rgba(255,255,255,0.8)" />
          <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">
            My Recommendation
          </span>
        </div>
        <h3 className="text-white font-display text-xl font-bold leading-tight">
          {recommendation.product}
        </h3>
        <div className="flex items-center gap-3 mt-2">
          <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
            {recommendation.price}
          </span>
          {recommendation.fatLevel && (
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
              {recommendation.fatLevel}
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="bg-white px-5 py-4 space-y-4">
        {/* Reason */}
        <p className="text-stone-700 text-sm leading-relaxed">{recommendation.reason}</p>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          {recommendation.suggestedQuantity && (
            <div className="bg-cream-50 rounded-xl p-3">
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Quantity
              </p>
              <p className="text-stone-800 text-sm font-semibold">
                {recommendation.suggestedQuantity}
              </p>
            </div>
          )}
          {recommendation.suggestedSchedule && (
            <div className="bg-cream-50 rounded-xl p-3">
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Schedule
              </p>
              <p className="text-stone-800 text-sm font-semibold">
                {recommendation.suggestedSchedule}
              </p>
            </div>
          )}
        </div>

        {/* Add-ons */}
        {recommendation.addOns && recommendation.addOns.length > 0 && (
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-2">
              Often paired with
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendation.addOns.map((addon) => (
                <span
                  key={addon}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200/60"
                >
                  <Package size={11} />
                  {addon}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives */}
        {recommendation.alternatives && recommendation.alternatives.length > 0 && (
          <div>
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-wide mb-2">
              Alternatives to consider
            </p>
            <div className="space-y-2">
              {recommendation.alternatives.map((alt) => (
                <div
                  key={alt.name}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-100"
                >
                  <CheckCircle size={14} className="text-sage-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-stone-800 text-xs font-semibold">{alt.name}</span>
                    {alt.price && (
                      <span className="text-stone-400 text-xs ml-1.5">· {alt.price}</span>
                    )}
                    {alt.reason && (
                      <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">{alt.reason}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <Link href="/subscribe" className="w-full">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-white text-sm font-semibold transition-all"
              style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
            >
              Start Subscription
              <ArrowRight size={15} />
            </motion.button>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/shop">
              <button className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors">
                View Product
              </button>
            </Link>
            {onBuildPlan ? (
              <button
                onClick={onBuildPlan}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
              >
                Build My Plan
              </button>
            ) : (
              <Link href="/custom">
                <button className="w-full py-2.5 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors">
                  Build My Plan
                </button>
              </Link>
            )}
          </div>
          {onRestart && (
            <button
              onClick={onRestart}
              className="text-xs text-stone-400 hover:text-stone-600 transition-colors text-center py-1"
            >
              ↺ Start a new consultation
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
