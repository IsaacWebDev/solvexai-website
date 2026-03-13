"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LiquidGlassButton Component
 * 
 * Premium glass button with iOS 17/Linear quality:
 * - Click ripple effect (expands from click point)
 * - Flowing gradient overlay (continuous shine)
 * - 3 variants: primary, secondary, ghost
 * - 3 sizes: sm, md, lg
 * - Hover scale + glow, tap scale
 * 
 * @example
 * ```tsx
 * <LiquidGlassButton variant="primary" size="md" onClick={() => alert('Clicked!')}>
 *   Get Started
 * </LiquidGlassButton>
 * 
 * <LiquidGlassButton variant="ghost" size="sm" href="/about">
 *   Learn More
 * </LiquidGlassButton>
 * ```
 */

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Variant styles
  const variantStyles = {
    primary: {
      background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
      border: "1px solid rgba(255,255,255,0.2)",
      shadow: "0 0 20px rgba(139,92,246,0.4)",
      hoverShadow: "0 0 30px rgba(139,92,246,0.6)",
    },
    secondary: {
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.12)",
      shadow: "0 0 10px rgba(255,255,255,0.1)",
      hoverShadow: "0 0 20px rgba(255,255,255,0.2)",
    },
    ghost: {
      background: "transparent",
      border: "1px solid rgba(255,255,255,0.08)",
      shadow: "none",
      hoverShadow: "0 0 15px rgba(255,255,255,0.15)",
    },
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const style = variantStyles[variant];

  // Handle click with ripple effect
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (onClick) onClick();

      if (!prefersReducedMotion) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { id, x, y }]);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
        }, 600);
      }
    },
    [onClick, prefersReducedMotion]
  );

  const buttonContent = (
    <>
      {/* Flowing gradient overlay (continuous shine) */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
          style={{
            background: `linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              background: "rgba(255,255,255,0.5)",
            }}
            initial={{
              width: 0,
              height: 0,
              x: "-50%",
              y: "-50%",
              opacity: 0.5,
            }}
            animate={{
              width: 300,
              height: 300,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <span className="relative z-10 font-medium">{children}</span>
    </>
  );

  const commonProps = {
    className: `relative overflow-hidden rounded-xl ${sizeStyles[size]} ${className}`,
    style: {
      background: style.background,
      border: style.border,
      boxShadow: style.shadow,
      backdropFilter: "blur(12px) saturate(180%)",
      WebkitBackdropFilter: "blur(12px) saturate(180%)",
    },
    whileHover: prefersReducedMotion
      ? {}
      : {
          scale: 1.05,
          boxShadow: style.hoverShadow,
          transition: { duration: 0.2 },
        },
    whileTap: prefersReducedMotion
      ? {}
      : {
          scale: 0.95,
          transition: { duration: 0.1 },
        },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        {...commonProps}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as any);
          }
        }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      {...commonProps}
      type="button"
      aria-label={typeof children === "string" ? children : "Button"}
    >
      {buttonContent}
    </motion.button>
  );
};
