"use client";
import { motion } from "framer-motion";

export default function AdvisorShimmer() {
  return (
    <div className="flex gap-3 justify-start">
      <div
        className="flex-shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
      >
        <span className="text-xs text-white font-bold">AI</span>
      </div>
      <div className="bg-white border border-stone-200/80 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: "var(--sage-400)" }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
