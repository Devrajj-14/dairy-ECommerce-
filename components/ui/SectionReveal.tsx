"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/animations";
import { useReducedMotion } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  as?: "section" | "div" | "article";
}

export default function SectionReveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as: Tag = "section",
}: SectionRevealProps) {
  const reducedMotion = useReducedMotion();

  const Container = motion[Tag] as typeof motion.section;

  const variants = stagger
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }
    : {
        hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: reducedMotion ? 0 : 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay },
        },
      };

  return (
    <Container
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      className={className}
    >
      {children}
    </Container>
  );
}

// A child element that stagger parents can animate
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
