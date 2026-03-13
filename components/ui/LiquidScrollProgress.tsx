"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * LiquidScrollProgress Component
 * 
 * Premium gradient scroll progress bar:
 * - Gradient progress bar (purple → blue → cyan)
 * - Glowing effect (shadow + blur)
 * - Smooth spring animation (stiffness: 100, damping: 30)
 * - Fixed to top of viewport
 * - Auto-hides on scroll to top
 * 
 * @example
 * ```tsx
 * // Add to root layout or main page
 * <LiquidScrollProgress />
 * ```
 */

export const LiquidScrollProgress: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

  // If reduced motion, use scrollYProgress directly (no spring)
  const progressValue = prefersReducedMotion ? scrollYProgress : scaleX;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
      style={{
        height: "4px",
        originX: 0,
        originY: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round((scrollYProgress.get() || 0) * 100)}
    >
      {/* Progress bar with gradient */}
      <motion.div
        className="h-full"
        style={{
          scaleX: progressValue,
          transformOrigin: "0% 0%",
          background: "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 50%, #00F0FF 100%)",
          boxShadow: "0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(59,130,246,0.3)",
          filter: "blur(0.5px)",
        }}
      />

      {/* Additional glow layer */}
      <motion.div
        className="absolute top-0 h-full"
        style={{
          scaleX: progressValue,
          transformOrigin: "0% 0%",
          background: "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 50%, #00F0FF 100%)",
          filter: "blur(4px)",
          opacity: 0.6,
        }}
      />
    </motion.div>
  );
};
