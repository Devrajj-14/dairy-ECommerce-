"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Microscope, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial pointer-events-none" aria-hidden="true" />
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="label-md mb-5">Our story</p>
            <h1 className="display-xl text-stone-900 mb-6">
              Born from the belief that{" "}
              <em className="text-sage-600 not-italic italic">milk should be honest.</em>
            </h1>
            <p className="text-stone-500 text-lg leading-relaxed">
              We started Pura after one simple question: why does fresh milk from a farm taste so different from the milk in a supermarket? The answer led us to build something different — a dairy brand that puts the farm, the farmer, and the family at the centre of every decision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding-md bg-cream-100/40">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <h2 className="display-md text-stone-900 mb-3">What we stand for</h2>
            <p className="text-stone-500 max-w-md mx-auto">Three non-negotiables that shape every product, process, and decision at Pura.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Uncompromising Purity",
                desc: "No preservatives. No synthetic hormones. No mixing of milk from different sources. What the label says is what you get — nothing more, nothing less.",
                color: "sage",
              },
              {
                icon: Leaf,
                title: "Farm Transparency",
                desc: "Every product tells you exactly which farm it came from. We publish lab test results monthly. You should know your food's origin as well as we do.",
                color: "sage",
              },
              {
                icon: Microscope,
                title: "Scientific Precision",
                desc: "We measure fat percentages, test for microbial safety, and track freshness from milking to delivery. Premium quality is not a promise — it's a process.",
                color: "sage",
              },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="p-8 bg-cream-100 border border-stone-200 rounded-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-sage-600/10 flex items-center justify-center mb-5">
                  <Icon size={22} strokeWidth={1.5} className="text-sage-600" />
                </div>
                <h3 className="font-display text-xl text-stone-900 mb-3">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="section-padding bg-stone-900">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="label-md text-stone-500 mb-4">Farm sourcing</p>
              <h2 className="display-lg text-white mb-5">
                We know every farm{" "}
                <span className="text-sage-400 italic">by name.</span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed mb-8">
                Our sourcing partnerships are long-term relationships, not transactional vendor contracts. We visit farms quarterly, verify practices, and pay farmers above market rates — because quality begins with the people who produce it.
              </p>

              <div className="space-y-4">
                {[
                  { location: "Anand, Gujarat", desc: "Home of our A2 cow milk — the Amul heartland, with certified Gir and Sahiwal herds.", icon: MapPin },
                  { location: "Karnal, Haryana", desc: "Our buffalo milk source — Murrah buffalo farms known for exceptional fat content.", icon: MapPin },
                  { location: "Bangalore, Karnataka", desc: "Fresh processing and curd-setting unit for South India deliveries.", icon: MapPin },
                ].map(({ location, desc, icon: Icon }) => (
                  <div key={location} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-sage-600/20 flex items-center justify-center shrink-0">
                      <Icon size={16} strokeWidth={1.5} className="text-sage-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{location}</p>
                      <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual block */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="space-y-4"
            >
              {[
                { emoji: "🐄", label: "Gir Cows, Gujarat", sub: "A2 beta-casein · NABCB certified" },
                { emoji: "🐃", label: "Murrah Buffalo, Haryana", sub: "High fat · Grade A farms" },
                { emoji: "🧪", label: "Third-Party Lab Testing", sub: "FSSAI & ISO certified labs" },
                { emoji: "🚐", label: "Cold Chain Delivery", sub: "Maintained below 4°C at all times" },
              ].map(({ emoji, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 p-5 bg-stone-800/60 border border-stone-700/50 rounded-xl backdrop-blur-sm"
                >
                  <span className="text-3xl" aria-hidden="true">{emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team / closing statement */}
      <section className="section-padding-md bg-cream-50">
        <div className="container-premium text-center max-w-2xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl text-stone-700 leading-relaxed italic mb-6"
          >
            &ldquo;We did not start a milk company. We started a trust company — whose product happens to be milk.&rdquo;
          </motion.blockquote>
          <p className="text-stone-400 text-sm">— The Pura founding team, Anand, Gujarat</p>
        </div>
      </section>
    </div>
  );
}
