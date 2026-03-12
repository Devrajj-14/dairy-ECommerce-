"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding-md bg-cream-50" aria-label="Get started with Pura">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-stone-900 rounded-3xl overflow-hidden px-8 py-20 text-center"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 bg-hero-radial opacity-30" aria-hidden="true" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="label-md text-stone-500 mb-5"
            >
              Begin your Pura ritual
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display-lg text-white mb-5"
            >
              The milk your family deserves
              <span className="block text-sage-400 italic">starts tomorrow morning.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-stone-400 text-base leading-relaxed mb-10"
            >
              First delivery free. Cancel anytime. No commitments — just the best dairy you&apos;ve ever tasted, right at your door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sage-600 hover:bg-sage-500 text-white text-base font-medium rounded-xl transition-all duration-300 hover:shadow-lg group"
              >
                Start your subscription
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white text-base font-medium rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                Build your milk first →
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-stone-600 text-sm mt-6"
            >
              Trusted by 50,000+ households · FSSAI certified · Delivered before 7 AM
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
