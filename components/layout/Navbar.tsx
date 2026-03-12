"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Menu, X, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Products", href: "/shop" },
  { label: "Build Your Milk", href: "/custom" },
  { label: "Subscribe", href: "/subscribe" },
  { label: "Our Story", href: "/about" },
];

const advisorNavItem = { label: "Milk Doctor", href: "/advisor" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 32);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream-50/90 backdrop-blur-xl border-b border-stone-200/60 shadow-xs"
            : "bg-transparent"
        )}
        style={{ willChange: "transform" }}
      >
        <nav
          className="container-premium flex items-center justify-between h-[72px]"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-sage-600"
            aria-label="Pura Dairy Home"
          >
            <span className="w-8 h-8 rounded-full bg-sage-gradient flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <span className="text-white font-display font-bold text-sm leading-none">P</span>
            </span>
            <span className="font-display text-xl font-600 text-stone-900 tracking-tight">
              Pura
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-200 rounded-lg hover:bg-stone-200/30 group focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2"
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-4 right-4 h-px bg-sage-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={advisorNavItem.href}
                className="relative ml-1 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-sage-700 hover:text-sage-900 bg-sage-500/10 hover:bg-sage-500/20 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2"
              >
                <Bot size={14} />
                {advisorNavItem.label}
              </Link>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-medium text-stone-700 hover:text-stone-900 border border-stone-300 hover:border-stone-400 rounded-full transition-all duration-200 hover:bg-cream-100"
            >
              Dashboard
            </Link>
            <Link
              href="/cart"
              aria-label={`Cart with ${cartCount} items`}
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-sage-600 hover:bg-sage-700 text-white transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2"
            >
              <ShoppingBag size={18} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-300 text-stone-900 text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-cream-100 border border-stone-200 text-stone-700 hover:bg-stone-200/60 transition-colors focus-visible:ring-2 focus-visible:ring-sage-600"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-cream-50 border-l border-stone-200 shadow-xl md:hidden flex flex-col"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-stone-200/60">
                <span className="font-display text-xl font-600 text-stone-900">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-stone-200/50 transition-colors"
                >
                  <X size={20} className="text-stone-600" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-4 py-3.5 text-base font-medium text-stone-700 hover:text-stone-900 rounded-xl hover:bg-cream-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={advisorNavItem.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-4 py-3.5 text-base font-semibold text-sage-700 hover:text-sage-900 rounded-xl hover:bg-sage-500/10 transition-colors"
                    >
                      <Bot size={18} />
                      {advisorNavItem.label}
                    </Link>
                  </motion.li>
                </ul>
              </nav>
              <div className="px-4 pb-8 space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 text-sm font-medium text-stone-700 border border-stone-300 rounded-xl hover:bg-cream-100 transition-colors"
                >
                  My Dashboard
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 text-sm font-medium text-white bg-sage-600 rounded-xl hover:bg-sage-700 transition-colors"
                >
                  View Cart ({cartCount})
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
