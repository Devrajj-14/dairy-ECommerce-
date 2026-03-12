"use client";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Microscope, RefreshCw, Star, MapPin } from "lucide-react";
import { brandBenefits } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Leaf,
  ShieldCheck,
  Microscope,
  RefreshCw,
  Star,
  MapPin,
};

export default function Benefits() {
  return (
    <section className="section-padding bg-cream-50" aria-label="Why Pura">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: heading */}
          <div>
            <p className="label-md mb-4">Why 50,000 households trust Pura</p>
            <h2 className="display-lg text-stone-900 mb-6">
              Not just fresh.{" "}
              <span className="text-sage-600 italic">Irreversibly good.</span>
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-md">
              We built Pura because we believed dairy could be better in every dimension — freshness, purity, transparency, and the experience of ordering it.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "< 12h", desc: "Farm to doorstep" },
                { value: "0", desc: "Preservatives used" },
                { value: "100%", desc: "FSSAI lab tested" },
                { value: "4.9★", desc: "Average rating" },
              ].map(({ value, desc }) => (
                <div key={desc} className="border-l-2 border-sage-500 pl-4">
                  <p className="font-display text-3xl font-700 text-stone-900">{value}</p>
                  <p className="text-sm text-stone-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: benefit pills */}
          <div className="grid grid-cols-1 gap-4">
            {brandBenefits.map((benefit, i) => {
              const Icon = iconMap[benefit.icon] ?? Leaf;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  className="flex items-start gap-4 p-5 bg-cream-100 border border-stone-200/80 rounded-xl hover:border-stone-300 hover:bg-cream-200/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-sage-600/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} strokeWidth={1.5} className="text-sage-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-stone-900 mb-1">{benefit.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
