"use client";
import { motion } from "framer-motion";
import { howItWorksSteps } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section className="section-padding bg-stone-900 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-lg"
        >
          <p className="label-md text-stone-500 mb-4">The Pura promise</p>
          <h2 className="display-lg text-white mb-4">
            Farm to your{" "}
            <span className="text-sage-400 italic">morning ritual</span>
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            Every step is deliberate. No shortcuts, no compromise on purity or timing.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < howItWorksSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-stone-700 to-transparent z-0" aria-hidden="true" />
              )}

              <div className="relative z-10 bg-stone-800/50 border border-stone-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-stone-600/60 transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className="w-12 h-12 rounded-full bg-sage-600/20 border border-sage-600/30 flex items-center justify-center mb-6">
                  <span className="font-display text-sage-400 font-600 text-sm">{step.step}</span>
                </div>

                <h3 className="font-display text-xl text-white font-500 mb-3">{step.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Freshness timeline bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-14 p-6 bg-stone-800/40 border border-stone-700/40 rounded-2xl"
        >
          <p className="label-sm text-stone-500 mb-4 text-center">Freshness timeline</p>
          <div className="flex items-center gap-1 relative">
            {[
              { time: "3 AM", label: "Milking", active: true },
              { time: "4 AM", label: "Chilling", active: true },
              { time: "5 AM", label: "Testing", active: true },
              { time: "5:30 AM", label: "Packing", active: true },
              { time: "6:30 AM", label: "In transit", active: false },
              { time: "7 AM", label: "Your door", active: false },
            ].map((node, idx, arr) => (
              <div key={node.time} className="flex items-center flex-1 min-w-0">
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-2.5 h-2.5 rounded-full border-2 ${
                      node.active
                        ? "bg-sage-500 border-sage-400"
                        : "bg-stone-700 border-stone-600"
                    }`}
                  />
                  <span className="text-[10px] text-stone-500 mt-1.5 whitespace-nowrap font-medium">{node.time}</span>
                  <span className="text-[9px] text-stone-600 mt-0.5 whitespace-nowrap">{node.label}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="flex-1 h-px bg-stone-700 mx-1" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
