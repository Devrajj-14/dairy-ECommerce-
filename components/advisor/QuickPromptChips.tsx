"use client";
import { motion } from "framer-motion";
import { QUICK_PROMPTS } from "@/lib/advisor-prompt";

interface QuickPromptChipsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export default function QuickPromptChips({ onSelect, disabled }: QuickPromptChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap gap-2"
    >
      {QUICK_PROMPTS.map((prompt, i) => (
        <motion.button
          key={prompt}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="px-3 py-1.5 text-xs font-medium rounded-full border border-stone-200 bg-white text-stone-600 hover:border-sage-400 hover:text-sage-700 hover:bg-sage-500/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {prompt}
        </motion.button>
      ))}
    </motion.div>
  );
}
