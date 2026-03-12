"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const sampleQuestions = [
  "Which milk suits my family?",
  "Cow vs buffalo milk?",
  "Best milk for chai?",
  "Build my daily plan",
];

export default function AdvisorTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "linear-gradient(160deg, #F0EDE8 0%, #FDFAF5 100%)" }}
    >
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left text block */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="badge-sage">
                <Sparkles size={11} className="mr-1.5" />
                AI Powered
              </span>
            </div>
            <h2 className="display-lg text-stone-900 mb-5">
              Not sure which milk{" "}
              <em className="text-sage-600 not-italic">to choose?</em>
            </h2>
            <p className="text-stone-500 text-lg leading-relaxed mb-8 max-w-[480px]">
              Meet Pura Milk Doctor — our AI dairy advisor. Tell us about your family, taste
              preference, and daily routine. We'll guide you to the perfect match.
            </p>

            <Link href="/advisor">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all shadow-lg"
                style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
              >
                <Bot size={17} />
                Talk to Milk Doctor
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right — fake chat preview card */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative"
          >
            {/* Chat window */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xl overflow-hidden">
              {/* Header */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} color="white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Pura Milk Doctor</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                    <p className="text-white/70 text-xs">AI Dairy Advisor</p>
                  </div>
                </div>
              </div>

              {/* Messages preview */}
              <div className="p-5 space-y-3">
                {/* Bot message */}
                <div className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #4D7352, #6A9070)" }}
                  >
                    <Bot size={13} color="white" />
                  </div>
                  <div className="bg-stone-50 border border-stone-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-stone-700 max-w-[80%]">
                    Hello! I&apos;m Pura Milk Doctor. <strong>Who is the milk for</strong>, and how
                    do you mainly use it?
                  </div>
                </div>

                {/* User message */}
                <div className="flex justify-end">
                  <div
                    className="rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white max-w-[75%]"
                    style={{ background: "linear-gradient(135deg, #4D7352, #6A9070)" }}
                  >
                    Family of 4, mostly for daily drinking &amp; morning chai.
                  </div>
                </div>

                {/* Bot recommendation hint */}
                <div className="flex gap-3">
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #4D7352, #6A9070)" }}
                  >
                    <Bot size={13} color="white" />
                  </div>
                  <div className="bg-stone-50 border border-stone-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-stone-700 max-w-[80%]">
                    Great! Do you prefer a{" "}
                    <strong>lighter feel</strong> for digestion, or a{" "}
                    <strong>richer, creamier</strong> taste for your chai?
                  </div>
                </div>
              </div>

              {/* Quick prompts */}
              <div className="px-5 pb-4 pt-1">
                <p className="text-xs text-stone-400 mb-2 font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q) => (
                    <Link key={q} href="/advisor">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full border border-stone-200 bg-stone-50 text-stone-600 hover:border-sage-400 hover:text-sage-700 hover:bg-sage-500/5 transition-all cursor-pointer">
                        {q}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative blob */}
            <div
              className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, #8DAD8D 0%, transparent 70%)" }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
