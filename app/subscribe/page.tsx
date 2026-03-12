"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar, RefreshCw, Pause, ArrowRight } from "lucide-react";
import { subscriptionPlans } from "@/lib/data";
import Link from "next/link";
import type { DeliveryFrequency } from "@/lib/types";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("alternate");
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);

  const toggleDay = (i: number) =>
    setSelectedDays((prev) => (prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]));

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      <div className="container-premium py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 max-w-lg mx-auto"
        >
          <p className="label-md mb-3">Subscription plans</p>
          <h1 className="display-md text-stone-900 mb-4">
            Fresh milk, <span className="text-sage-600 italic">your schedule</span>
          </h1>
          <p className="text-stone-500 text-base leading-relaxed">
            Pause anytime. Resume in one tap. Delivery before 7 AM, guaranteed.
          </p>
        </motion.div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 max-w-3xl mx-auto">
          {subscriptionPlans.map((plan, i) => (
            <motion.button
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              onClick={() => setSelectedPlan(plan.id)}
              aria-pressed={selectedPlan === plan.id}
              className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                selectedPlan === plan.id
                  ? "border-sage-600 bg-sage-600/5 shadow-lg"
                  : "border-stone-200 bg-cream-100 hover:border-stone-300"
              } ${plan.highlight ? "ring-1 ring-sage-400/30" : ""}`}
            >
              {plan.highlightLabel && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 bg-sage-600 text-white text-xs font-semibold rounded-b-lg shadow-sm">{plan.highlightLabel}</span>
                </div>
              )}
              {plan.highlightLabel && <div className="h-4" />}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl font-600 text-stone-900">{plan.name}</h2>
                  <p className="text-xs text-stone-400 mt-0.5">{plan.tagline}</p>
                </div>
                {selectedPlan === plan.id && (
                  <div className="w-6 h-6 rounded-full bg-sage-600 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              <div className="mb-5">
                <span className="font-display text-3xl font-700 text-stone-900">₹{plan.pricePerDay}</span>
                <span className="text-stone-400 text-sm ml-1">/day</span>
              </div>

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-stone-500">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${selectedPlan === plan.id ? "bg-sage-600/20" : "bg-stone-200"}`}>
                      <Check size={9} className={selectedPlan === plan.id ? "text-sage-600" : "text-stone-400"} strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.button>
          ))}
        </div>

        {/* Custom schedule picker (shown when custom is selected) */}
        <AnimatePresence>
          {selectedPlan === "custom" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden max-w-3xl mx-auto mb-10"
            >
              <div className="p-6 bg-cream-100 border border-stone-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={18} className="text-sage-600" />
                  <h3 className="text-base font-semibold text-stone-900">Choose your delivery days</h3>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {DAYS.map((day, i) => (
                    <button
                      key={i}
                      onClick={() => toggleDay(i)}
                      aria-pressed={selectedDays.includes(i)}
                      className={`w-11 h-11 rounded-full text-sm font-semibold border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                        selectedDays.includes(i)
                          ? "bg-sage-600 text-white border-sage-600 shadow-sm"
                          : "bg-white text-stone-500 border-stone-200 hover:border-sage-400"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-3">{selectedDays.length} delivery days selected per week</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-12">
          {[
            { icon: Pause, title: "Pause anytime", desc: "Travelling? Away for work? Pause deliveries in one tap from your dashboard. Resume when you're ready." },
            { icon: RefreshCw, title: "Change anytime", desc: "Switch your milk type, quantity, or delivery days at any point. Changes apply from the next delivery." },
            { icon: Calendar, title: "Skip a day", desc: "Don't need milk tomorrow? Skip a single delivery without affecting your overall subscription." },
          ].map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 bg-cream-100 border border-stone-200 rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-sage-600/10 flex items-center justify-center mb-3">
                <Icon size={18} strokeWidth={1.5} className="text-sage-600" />
              </div>
              <h3 className="text-sm font-semibold text-stone-900 mb-1.5">{title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 hover:bg-sage-700 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-lg group"
          >
            Get started — first delivery free
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-stone-400 mt-3">No lock-in. Cancel anytime from your dashboard.</p>
        </div>
      </div>
    </div>
  );
}
