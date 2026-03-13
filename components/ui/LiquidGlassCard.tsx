"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * LiquidGlassCard Component
 * 
 * Premium frosted glass card with iOS 17/Linear quality:
 * - Translucent background with blur + saturation
 * - Gradient borders (white, subtle)
 * - Mouse glow effect (follows cursor, pulsing)
 * - Liquid shine animation (flowing highlight on hover)
 * - 3 intensity levels
 * 
 * @example
 * ```tsx
 * <LiquidGlassCard intensity="medium" glowColor="#8B5CF6">
 *   <h2>Premium Content</h2>
 *   <p>Liquid glass design system</p>
 * </LiquidGlassCard>
 * ```
 */

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: "light" | "medium" | "heavy";
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = "",
  glowColor = "#8B5CF6",
  intensity = "medium",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse position tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  // Intensity configurations
  const intensityConfig = {
    light: {
      blur: "8px",
      saturation: "180%",
      bgOpacity: 0.03,
      borderOpacity: 0.08,
    },
    medium: {
      blur: "12px",
      saturation: "180%",
      bgOpacity: 0.05,
      borderOpacity: 0.12,
    },
    heavy: {
      blur: "20px",
      saturation: "180%",
      bgOpacity: 0.08,
      borderOpacity: 0.16,
    },
  };

  const config = intensityConfig[intensity];

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

  // Track mouse position relative to card
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || prefersReducedMotion) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        backdropFilter: `blur(${config.blur}) saturate(${config.saturation})`,
        WebkitBackdropFilter: `blur(${config.blur}) saturate(${config.saturation})`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={
        prefersReducedMotion ? {} : { scale: 1.02, transition: { duration: 0.3 } }
      }
      role="region"
      aria-label="Glass card"
    >
      {/* Translucent background layer */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,${config.bgOpacity}) 0%, rgba(255,255,255,${config.bgOpacity * 0.5}) 100%)`,
        }}
      />

      {/* Gradient border */}
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          padding: "1px",
          background: `linear-gradient(135deg, rgba(255,255,255,${config.borderOpacity}) 0%, rgba(255,255,255,${config.borderOpacity * 0.3}) 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Mouse glow effect (pulsing) */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute pointer-events-none -z-10"
          style={{
            left: glowX,
            top: glowY,
            width: "200px",
            height: "200px",
            x: "-50%",
            y: "-50%",
            background: `radial-gradient(circle, ${glowColor}80 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Liquid shine animation (flowing highlight on hover) */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`,
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "200% 0%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
