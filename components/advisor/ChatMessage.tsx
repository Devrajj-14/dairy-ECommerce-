"use client";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import type { AdvisorMessage } from "@/lib/types/advisor";

interface ChatMessageProps {
  message: AdvisorMessage;
  index: number;
}

function renderContent(content: string) {
  // Convert **bold** markdown and newlines to JSX
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    // Handle line breaks
    return part.split("\n").map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div className="flex-shrink-0 mt-1">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
          >
            <Bot size={15} color="#fff" />
          </div>
        </div>
      )}

      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAssistant
            ? "bg-white border border-stone-200/80 text-stone-800 shadow-sm rounded-tl-sm"
            : "text-white rounded-tr-sm"
        }`}
        style={
          !isAssistant
            ? { background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }
            : {}
        }
      >
        {renderContent(message.content)}
      </div>

      {!isAssistant && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
            <User size={15} className="text-stone-600" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
