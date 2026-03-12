"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RefreshCw, Stethoscope } from "lucide-react";
import ChatMessage from "./ChatMessage";
import AdvisorShimmer from "./AdvisorShimmer";
import RecommendationCard from "./RecommendationCard";
import QuickPromptChips from "./QuickPromptChips";
import { WELCOME_MESSAGE } from "@/lib/advisor-prompt";
import type { AdvisorMessage, ProductRecommendation } from "@/lib/types/advisor";

export default function AdvisorChat() {
  const [messages, setMessages] = useState<AdvisorMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<ProductRecommendation | null>(null);
  const [showChips, setShowChips] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll only the chat container to its bottom — never the page
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading, recommendation]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setShowChips(false);
      setError(null);
      setRecommendation(null);

      const userMessage: AdvisorMessage = {
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(err.error || "Request failed");
        }

        const data = await res.json();

        if (data.message) {
          const assistantMessage: AdvisorMessage = {
            role: "assistant",
            content: data.message,
            timestamp: Date.now(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }

        if (data.isRecommendation && data.recommendation) {
          setRecommendation(data.recommendation);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
      } finally {
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [messages, isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleRestart = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setError(null);
    setRecommendation(null);
    setShowChips(true);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] max-h-[780px] bg-cream-50 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl">
      {/* Chat header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Stethoscope size={20} color="white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Pura Milk Doctor</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              <p className="text-white/70 text-xs">AI Dairy Advisor · Online</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleRestart}
          title="Start new consultation"
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <RefreshCw size={15} />
        </button>
      </div>

      {/* Messages area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scroll-smooth">
        {messages.map((msg, i) => (
          <ChatMessage key={`${msg.role}-${i}`} message={msg} index={i} />
        ))}

        {/* Quick prompt chips (shown only initially) */}
        <AnimatePresence>
          {showChips && messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="pt-1"
            >
              <p className="text-xs text-stone-400 mb-2 font-medium">Quick questions:</p>
              <QuickPromptChips onSelect={sendMessage} disabled={isLoading} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading shimmer */}
        {isLoading && <AdvisorShimmer />}

        {/* Recommendation card */}
        {recommendation && !isLoading && (
          <RecommendationCard
            recommendation={recommendation}
            onRestart={handleRestart}
          />
        )}

        {/* Error state */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-3 px-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
          >
            ⚠️ {error}
            <button
              onClick={() => setError(null)}
              className="ml-3 text-xs underline hover:no-underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}

      </div>

      {/* Safety disclaimer */}
      <div className="px-4 py-1.5 bg-amber-50/60 border-t border-amber-100/60">
        <p className="text-xs text-stone-400 text-center leading-snug">
          Product advisor only · Not medical advice · Consult a doctor for health conditions
        </p>
      </div>

      {/* Input area */}
      <div className="px-4 py-3 bg-white border-t border-stone-200/60">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about milk, dairy plans, or use cases..."
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl border border-stone-200 bg-cream-50 px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-500/10 transition-all disabled:opacity-50 max-h-28 leading-relaxed"
            style={{ minHeight: "44px" }}
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
          >
            <Send size={16} color="white" />
          </motion.button>
        </form>
        <p className="text-xs text-stone-400 text-center mt-1.5">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
