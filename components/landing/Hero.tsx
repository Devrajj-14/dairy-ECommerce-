"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleBlob = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-cream-50">
      {/* Background radial glow */}
      <motion.div
        style={{ scale: scaleBlob }}
        className="absolute inset-0 bg-hero-radial pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--stone-400) 1px, transparent 1px), linear-gradient(90deg, var(--stone-400) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Floating circles - decorative */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[20%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-sage-300/20 to-stone-200/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[-5%] bottom-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-amber-300/15 to-cream-200/20 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container-premium relative z-10 pt-32 pb-20"
      >
        <div className="max-w-[820px]">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="badge-sage">
              <Sparkles size={12} className="mr-1.5" />
              Farm to door · under 12 hours
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="display-2xl text-stone-900 text-balance mb-6"
          >
            Milk, refined{" "}
            <em className="text-sage-600 not-italic">to your</em>{" "}
            morning.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="text-lg text-stone-500 leading-relaxed max-w-[560px] mb-10"
          >
            A2 cow milk, rich buffalo milk, and everything in between —
            customised to your exact taste and delivered before you wake up.
            This is dairy designed around you.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <ButtonLink href="/shop" size="lg" variant="primary" magnetic>
              Shop Products
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="/subscribe" size="lg" variant="secondary" magnetic>
              Start Subscription
            </ButtonLink>
            <ButtonLink href="/custom" size="lg" variant="ghost" magnetic>
              <span className="text-sage-600 font-medium">Build Your Milk →</span>
            </ButtonLink>
          </motion.div>

          {/* Trust micro-indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            {[
              { value: "12h", label: "Farm to door" },
              { value: "0", label: "Preservatives" },
              { value: "50k+", label: "Happy households" },
              { value: "A2", label: "Certified cow milk" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-display text-2xl font-700 text-stone-900">{value}</span>
                <span className="text-sm text-stone-400 leading-tight">{label}</span>
                <span className="hidden last:hidden text-stone-200" aria-hidden="true">·</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating product visual – right side (lg+) */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pr-4"
        >
          {/* Primary product card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-56 bg-white/80 backdrop-blur-md border border-stone-200/60 rounded-2xl p-5 shadow-xl"
          >
            <div className="w-full h-28 rounded-xl bg-gradient-to-br from-amber-50 to-cream-200 mb-4 flex items-center justify-center">
              <span className="text-4xl" aria-hidden="true">🥛</span>
            </div>
            <p className="label-sm mb-1">A2 Cow Milk</p>
            <p className="font-display text-lg text-stone-900 font-600">₹65 <span className="text-stone-400 text-sm font-400">/L</span></p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-stone-100">
                <div className="h-full w-[35%] rounded-full bg-amber-300" />
              </div>
              <span className="text-xs text-stone-400">3.5% fat</span>
            </div>
          </motion.div>

          {/* Second card */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 ml-8 bg-white/70 backdrop-blur-md border border-stone-200/50 rounded-2xl p-4 shadow-lg"
          >
            <p className="label-sm mb-1">Delivered Today</p>
            <p className="font-display text-base text-stone-900">Bilona Ghee</p>
            <p className="text-xs text-stone-400 mt-1">250ml · ₹475</p>
            <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 bg-sage-600/10 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-sage-600 animate-pulse" />
              <span className="text-xs text-sage-600 font-medium">On the way</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="label-sm text-stone-400">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-stone-300 to-transparent"
        />
      </motion.div>
    </div>
  );
}
