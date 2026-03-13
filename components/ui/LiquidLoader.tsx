"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * LiquidLoader Component
 * 
 * Premium animated loading indicator:
 * - 3 animated dots (bouncing, pulsing)
 * - Purple-blue gradient
 * - Staggered animation (delay: i × 150ms)
 * - Infinite loop
 * - Respects reduced motion preferences
 * 
 * @example
 * ```tsx
 * // Show loader while content loads
 * {isLoading && <LiquidLoader />}
 * 
 * // Use in suspense fallback
 * <Suspense fallback={<LiquidLoader />}>
 *   <Component />
 * </Suspense>
 * ```
 */

export const LiquidLoader: React.FC = () => {
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

  // Animation for each dot
  const getDotAnimation = (i: number) => {
    if (prefersReducedMotion) {
      return {
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
    }

    return {
      y: [-10, 10, -10],
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: i * 0.15, // Stagger by 150ms
      },
    };
  };

  return (
    <div
      className="flex items-center justify-center gap-2"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: "16px",
            height: "16px",
            background: "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
            boxShadow: "0 0 10px rgba(139,92,246,0.4)",
          }}
          initial={{ y: 0, scale: 1, opacity: 0.5 }}
          animate={getDotAnimation(i)}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
