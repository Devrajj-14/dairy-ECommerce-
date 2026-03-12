"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShoppingBag, RefreshCw, Sliders } from "lucide-react";
import SectionReveal, { RevealItem } from "@/components/ui/SectionReveal";

const pathways = [
  {
    id: "buy",
    icon: ShoppingBag,
    number: "01",
    label: "One-Time Purchase",
    headline: "Just good milk, right now",
    description:
      "Browse our full range — A2 Cow Milk, Buffalo Milk, Bilona Ghee, Paneer, and more. Order what you need, when you need it.",
    cta: "Shop Products",
    href: "/shop",
    accent: "stone",
    highlight: "No commitment",
  },
  {
    id: "subscribe",
    icon: RefreshCw,
    number: "02",
    label: "Subscription",
    headline: "Fresh milk, every morning",
    description:
      "Daily, alternate days, or choose your own schedule. Pause anytime. Resume in one tap. Starting at ₹65/day with free delivery.",
    cta: "Start Delivery",
    href: "/subscribe",
    accent: "sage",
    highlight: "Most popular",
    highlighted: true,
  },
  {
    id: "custom",
    icon: Sliders,
    number: "03",
    label: "Custom Milk",
    headline: "Milk, made for you",
    description:
      "Choose your milk type, fat level, quantity, and delivery preference. Build the exact milk your household needs — unlike any dairy experience you've had.",
    cta: "Build Your Milk",
    href: "/custom",
    accent: "amber",
    highlight: "Signature experience",
  },
];

export default function ThreePathways() {
  return (
    <SectionReveal className="section-padding bg-cream-50">
      <div className="container-premium">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="label-md mb-4">Three ways to Pura</p>
          <h2 className="display-lg text-stone-900 mb-4">
            Choose how you want{" "}
            <span className="text-sage-600 italic">your dairy</span>
          </h2>
          <p className="text-stone-500 max-w-md mx-auto text-base leading-relaxed">
            One platform. Three beautifully distinct experiences.
            Each one designed to fit a different kind of household.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pathways.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative group rounded-2xl border transition-all duration-300 overflow-hidden ${
                path.highlighted
                  ? "bg-stone-900 border-stone-700 shadow-xl"
                  : "bg-cream-100 border-stone-200 hover:border-stone-300 hover:shadow-card-hover"
              }`}
            >
              {/* Highlight label */}
              {path.highlighted && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sage-500 to-sage-400" />
              )}

              <div className="p-8">
                {/* Icon + number */}
                <div className="flex items-start justify-between mb-8">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      path.highlighted
                        ? "bg-sage-600/20"
                        : path.accent === "amber"
                        ? "bg-amber-300/20"
                        : "bg-stone-200/60"
                    }`}
                  >
                    <path.icon
                      size={22}
                      strokeWidth={1.5}
                      className={
                        path.highlighted
                          ? "text-sage-400"
                          : path.accent === "amber"
                          ? "text-amber-400"
                          : "text-stone-500"
                      }
                    />
                  </div>
                  <span
                    className={`font-display text-4xl font-700 ${
                      path.highlighted ? "text-stone-700" : "text-stone-200"
                    }`}
                  >
                    {path.number}
                  </span>
                </div>

                {/* Label pill */}
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-2xs font-semibold tracking-wide uppercase mb-3 ${
                    path.highlighted
                      ? "bg-sage-600/20 text-sage-300"
                      : path.accent === "amber"
                      ? "bg-amber-300/15 text-amber-400"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  {path.highlight}
                </span>

                <h3
                  className={`font-display text-2xl font-600 mb-3 ${
                    path.highlighted ? "text-white" : "text-stone-900"
                  }`}
                >
                  {path.headline}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-8 ${
                    path.highlighted ? "text-stone-400" : "text-stone-500"
                  }`}
                >
                  {path.description}
                </p>

                <Link
                  href={path.href}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group/link ${
                    path.highlighted
                      ? "text-sage-400 hover:text-sage-300"
                      : path.accent === "amber"
                      ? "text-amber-400 hover:text-amber-500"
                      : "text-stone-700 hover:text-stone-900"
                  }`}
                >
                  {path.cta}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
