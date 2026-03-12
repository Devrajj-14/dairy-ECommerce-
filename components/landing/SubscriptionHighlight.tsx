"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, RefreshCw, Bell } from "lucide-react";
import { subscriptionPlans } from "@/lib/data";

export default function SubscriptionHighlight() {
  return (
    <section className="section-padding bg-cream-100/40">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="label-md mb-4">Subscription delivery</p>
            <h2 className="display-lg text-stone-900 mb-5">
              Set once.{" "}
              <span className="text-sage-600 italic">Fresh forever.</span>
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-8 max-w-md">
              Wake up to milk that arrived before you did. Choose your schedule,
              pick your milk, and let Pura handle the rest — every single day.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                { icon: Calendar, text: "Daily, alternate days, or custom schedule" },
                { icon: RefreshCw, text: "Pause, skip, or cancel — anytime, no calls" },
                { icon: Bell, text: "Morning delivery before 7 AM, guaranteed" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sage-600/10 flex items-center justify-center shrink-0">
                    <Icon size={15} strokeWidth={1.5} className="text-sage-600" />
                  </div>
                  <span className="text-sm text-stone-700">{text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-md group"
            >
              View subscription plans
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Right: plan cards preview */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="space-y-4"
          >
            {subscriptionPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`p-5 rounded-xl border transition-all duration-200 ${
                  plan.highlight
                    ? "bg-stone-900 border-stone-700 shadow-lg"
                    : "bg-cream-100 border-stone-200 hover:border-stone-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-base font-semibold font-display ${plan.highlight ? "text-white" : "text-stone-900"}`}>
                        {plan.name}
                      </h3>
                      {plan.highlightLabel && (
                        <span className="badge-sage text-xs">{plan.highlightLabel}</span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${plan.highlight ? "text-stone-400" : "text-stone-500"}`}>
                      {plan.tagline}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display text-xl font-700 ${plan.highlight ? "text-white" : "text-stone-900"}`}>
                      ₹{plan.pricePerDay}
                    </p>
                    <p className={`text-xs ${plan.highlight ? "text-stone-500" : "text-stone-400"}`}>/day</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
