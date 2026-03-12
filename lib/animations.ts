"use client";
import { useReducedMotion } from "framer-motion";

// ─── Easing curves ────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT = [0.37, 0, 0.63, 1] as const;
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Shared variants ────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

// ─── Stagger containers ──────────────────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

export const staggerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

// ─── Card interactions ───────────────────────────────────────────────────────
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 4px 24px rgba(28, 22, 16, 0.08)",
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
  hover: {
    y: -6,
    boxShadow: "0 20px 48px rgba(28, 22, 16, 0.14)",
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  },
};

// ─── Viewport configuration ─────────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, margin: "-80px" };
export const VIEWPORT_ALWAYS = { once: false, margin: "-60px" };

// ─── Hook: motion-aware variants ────────────────────────────────────────────
export function useMotionVariants() {
  const reducedMotion = useReducedMotion();
  return {
    fadeUp: reducedMotion ? fadeUpReduced : fadeUp,
    scaleIn: reducedMotion ? fadeIn : scaleIn,
    slideFromLeft: reducedMotion ? fadeIn : slideFromLeft,
    slideFromRight: reducedMotion ? fadeIn : slideFromRight,
    stagger: reducedMotion
      ? { hidden: {}, visible: {} }
      : staggerContainer,
  };
}

// ─── Transition presets ─────────────────────────────────────────────────────
export const transitionFast = { duration: 0.2, ease: EASE_SMOOTH };
export const transitionNormal = { duration: 0.35, ease: EASE_OUT_EXPO };
export const transitionSlow = { duration: 0.6, ease: EASE_OUT_EXPO };
