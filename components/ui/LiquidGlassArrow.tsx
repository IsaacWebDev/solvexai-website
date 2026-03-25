"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * LiquidGlassArrow Component
 * 
 * Premium liquid glass arrow navigation button
 * - Subtle translucent background
 * - Accent glow on hover
 * - Smooth animations
 * - Used for navigation arrows throughout site
 * 
 * @example
 * ```tsx
 * <LiquidGlassArrow direction="right" onClick={handleNext} />
 * <LiquidGlassArrow direction="left" onClick={handlePrev} />
 * <LiquidGlassArrow direction="up" position="bottom-right" />
 * ```
 */

interface LiquidGlassArrowProps {
  direction?: "left" | "right" | "up" | "down";
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LiquidGlassArrow: React.FC<LiquidGlassArrowProps> = ({
  direction = "right",
  onClick,
  position,
  size = "md",
  className = "",
}) => {
  // Size configurations
  const sizeStyles = {
    sm: { width: 40, height: 40, iconSize: 20 },
    md: { width: 56, height: 56, iconSize: 24 },
    lg: { width: 72, height: 72, iconSize: 32 },
  };

  const { width, height, iconSize } = sizeStyles[size];

  // Position styles
  const positionStyles: Record<string, string> = {
    "bottom-right": "fixed bottom-8 right-8 z-40",
    "bottom-left": "fixed bottom-8 left-8 z-40",
    "top-right": "fixed top-8 right-8 z-40",
    "top-left": "fixed top-8 left-8 z-40",
    center: "relative",
  };

  // Arrow SVG based on direction
  const arrows = {
    right: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    ),
    left: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 17l-5-5m0 0l5-5m-5 5h12"
      />
    ),
    up: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    ),
    down: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    ),
  };

  const positionClass = position ? positionStyles[position] : "";

  return (
    <motion.button
      onClick={onClick}
      className={`${positionClass} ${className}`}
      style={{
        width,
        height,
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "50%",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: position ? "fixed" : "relative",
      }}
      whileHover={{
        background: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.25)",
        y: -2,
        boxShadow:
          "0 12px 40px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
      aria-label={`Navigate ${direction}`}
    >
      {/* Accent glow overlay (shows on hover) */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)",
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />

      {/* Arrow Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        className="relative z-10"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        }}
      >
        {arrows[direction]}
      </svg>
    </motion.button>
  );
};
