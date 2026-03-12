"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Stethoscope, RefreshCw } from "lucide-react";
import ChatMessage from "@/components/advisor/ChatMessage";
import AdvisorShimmer from "@/components/advisor/AdvisorShimmer";
import RecommendationCard from "@/components/advisor/RecommendationCard";
import { WELCOME_MESSAGE, QUICK_PROMPTS } from "@/lib/advisor-prompt";
import type { AdvisorMessage, ProductRecommendation } from "@/lib/types/advisor";
import Link from "next/link";

const POPUP_DELAY_MS = 2500; // show popup greeting after 2.5s

export default function FloatingAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<AdvisorMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<ProductRecommendation | null>(null);
  const [showChips, setShowChips] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show greeting popup after a delay on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!popupDismissed && !isOpen) {
        setShowPopup(true);
      }
    }, POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [popupDismissed, isOpen]);

  // Scroll chat container to bottom (not the page)
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading, recommendation]);

  const dismissPopup = () => {
    setShowPopup(false);
    setPopupDismissed(true);
  };

  const openChat = () => {
    dismissPopup();
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

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
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.message, timestamp: Date.now() },
          ]);
        }
        if (data.isRecommendation && data.recommendation) {
          setRecommendation(data.recommendation);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    },
    [messages, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <>
      {/* ── Greeting popup bubble ─────────────────────────────── */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-6 z-50 max-w-[260px]"
          >
            <div className="bg-white rounded-2xl rounded-br-sm shadow-xl border border-stone-200/60 p-4 relative">
              {/* Close */}
              <button
                onClick={dismissPopup}
                className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
                aria-label="Dismiss"
              >
                <X size={11} />
              </button>

              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
                >
                  <Stethoscope size={15} color="white" />
                </div>
                <div>
                  <p className="text-stone-800 font-semibold text-xs leading-tight">
                    Pura Milk Doctor
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-stone-400 text-[10px]">AI Advisor · Online</p>
                  </div>
                </div>
              </div>

              <p className="text-stone-600 text-sm leading-relaxed mb-3">
                Hi! 👋 I&apos;m your <strong>AI Milk Doctor</strong>. Not sure which milk to
                choose? I can help you find the perfect Pura match!
              </p>

              <button
                onClick={openChat}
                className="w-full py-2 px-4 rounded-xl text-white text-xs font-semibold transition-all"
                style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
              >
                Chat with me →
              </button>
            </div>

            {/* Tail */}
            <div
              className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-stone-200/60 rotate-45"
              style={{ boxShadow: "2px 2px 4px rgba(28,22,16,0.06)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating chat panel ───────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-stone-200/60"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Stethoscope size={16} color="white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Pura Milk Doctor</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    <p className="text-white/70 text-[11px]">AI Dairy Advisor · Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRestart}
                  title="Restart"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                >
                  <RefreshCw size={13} />
                </button>
                <Link
                  href="/advisor"
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-[11px] font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Full page ↗
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-cream-50"
            >
              {messages.map((msg, i) => (
                <ChatMessage key={`${msg.role}-${i}`} message={msg} index={i} />
              ))}

              {/* Quick chips */}
              <AnimatePresence>
                {showChips && messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-[10px] text-stone-400 mb-1.5 font-medium">Try asking:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_PROMPTS.slice(0, 4).map((p) => (
                        <button
                          key={p}
                          disabled={isLoading}
                          onClick={() => sendMessage(p)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full border border-stone-200 bg-white text-stone-600 hover:border-sage-400 hover:text-sage-700 hover:bg-sage-500/5 transition-all disabled:opacity-40"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoading && <AdvisorShimmer />}

              {recommendation && !isLoading && (
                <RecommendationCard
                  recommendation={recommendation}
                  onRestart={handleRestart}
                />
              )}

              {error && !isLoading && (
                <div className="text-center py-2 px-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs">
                  ⚠️ {error}
                  <button
                    onClick={() => setError(null)}
                    className="ml-2 underline hover:no-underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="px-3 py-1 bg-amber-50/60 border-t border-amber-100/60 flex-shrink-0">
              <p className="text-[10px] text-stone-400 text-center">
                Product advisor only · Not medical advice
              </p>
            </div>

            {/* Input */}
            <div className="px-3 py-2.5 bg-white border-t border-stone-200/60 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about milk or dairy plans..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-stone-200 bg-cream-50 px-3 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-500/10 transition-all disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
                >
                  <Send size={15} color="white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger button ───────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          dismissPopup();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Open AI Milk Doctor"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all"
        style={{ background: "linear-gradient(135deg, #4D7352 0%, #6A9070 100%)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} color="white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Stethoscope size={22} color="white" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot (shown when popup would show but chat is closed) */}
        {!isOpen && !popupDismissed && (
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white" />
        )}
      </motion.button>
    </>
  );
}
