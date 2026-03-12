"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "warm";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "bg-sage-600 hover:bg-sage-700 text-white shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-cream-100 hover:bg-cream-200 text-stone-800 border border-stone-200 hover:border-stone-300 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-stone-200/40 text-stone-700 hover:text-stone-900 active:scale-[0.98]",
    outline:
      "bg-transparent border border-stone-300 hover:border-stone-600 text-stone-700 hover:text-stone-900 hover:bg-cream-100/50 active:scale-[0.98]",
    warm:
      "bg-amber-300 hover:bg-amber-400 text-stone-900 shadow-sm hover:shadow-md active:scale-[0.98]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
    md: "px-6 py-3 text-sm rounded-xl gap-2",
    lg: "px-8 py-4 text-base rounded-xl gap-2.5",
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      onMouseMove={magnetic ? handleMouseMove : undefined}
      onMouseLeave={magnetic ? handleMouseLeave : undefined}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...(props as object)}
    >
      {children}
    </motion.button>
  );
}

// Link variant
interface ButtonLinkProps {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  magnetic?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink({ href, variant = "primary", size = "md", magnetic = false, children, className }: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
    setPosition({ x, y });
  };

  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 select-none cursor-pointer";

  const variantStyles = {
    primary: "bg-sage-600 hover:bg-sage-700 text-white shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary: "bg-cream-100 hover:bg-cream-200 text-stone-800 border border-stone-200 hover:border-stone-300",
    ghost: "bg-transparent hover:bg-stone-200/40 text-stone-700 hover:text-stone-900",
    outline: "bg-transparent border border-stone-300 hover:border-stone-600 text-stone-700 hover:text-stone-900",
    warm: "bg-amber-300 hover:bg-amber-400 text-stone-900 shadow-sm hover:shadow-md",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
    md: "px-6 py-3 text-sm rounded-xl gap-2",
    lg: "px-8 py-4 text-base rounded-xl gap-2.5",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.5 }}
      onMouseMove={magnetic ? handleMouseMove as never : undefined}
      onMouseLeave={magnetic ? () => setPosition({ x: 0, y: 0 }) : undefined}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {children}
    </motion.a>
  );
}
