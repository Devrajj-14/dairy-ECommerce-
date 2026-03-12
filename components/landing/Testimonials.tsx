"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="section-padding bg-cream-100/50 overflow-hidden">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="label-md mb-4">What our households say</p>
          <h2 className="display-lg text-stone-900">
            Real people,{" "}
            <span className="text-sage-600 italic">real mornings</span>
          </h2>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-stone-200/80 rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-stone-700 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{t.role} · {t.location}</p>
                </div>
                <div className="text-right">
                  <span className="badge-sage text-xs">{t.subscriptionType.split(" – ")[0]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra two – wide cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {testimonials.slice(3, 5).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-stone-200/80 rounded-2xl p-7 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <blockquote className="text-stone-700 text-sm leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{t.role} · {t.location}</p>
                </div>
                <span className="badge-amber text-xs">{t.subscriptionType.split(" – ")[0]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust aggregate */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-stone-200 rounded-full shadow-xs">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-stone-900">4.9/5</span>
            <span className="text-stone-300">·</span>
            <span className="text-sm text-stone-500">Based on 10,400+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
