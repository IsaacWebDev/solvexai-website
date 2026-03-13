"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * LiquidCursor Component
 * 
 * Premium custom cursor with trailing particles:
 * - Main cursor dot (purple glow, 20px)
 * - Trailing particles (10 dots, 10px each)
 * - Smooth spring animation (damping: 30, stiffness: 200)
 * - Fades out after 500ms
 * - Auto-hides on mobile/touch devices
 * 
 * @example
 * ```tsx
 * // Add to root layout or main page
 * <LiquidCursor />
 * ```
 */

interface TrailDot {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export const LiquidCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);

  // Mouse position tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch device
    const checkTouchDevice = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkTouchDevice();
    mediaQuery.addEventListener("change", handleChange);

    // Don't render on touch devices or reduced motion
    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      // Add trail dot
      const now = Date.now();
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          {
            id: now,
            x: e.clientX,
            y: e.clientY,
            timestamp: now,
          },
        ];

        // Keep only last 10 dots
        return newTrail.slice(-10);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Clean up old trail dots
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((dot) => now - dot.timestamp < 500));
    }, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(cleanupInterval);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [mouseX, mouseY, isTouchDevice, prefersReducedMotion]);

  // Don't render on touch devices, reduced motion, or if not visible
  if (isTouchDevice || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Trail particles */}
      {trail.map((dot, index) => {
        const age = Date.now() - dot.timestamp;
        const opacity = Math.max(0, 0.6 - (age / 500) * 0.6);
        const scale = Math.max(0, 1 - (age / 500));

        return (
          <motion.div
            key={dot.id}
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: dot.x,
              top: dot.y,
              width: "10px",
              height: "10px",
              x: "-50%",
              y: "-50%",
              background: "rgba(139,92,246,0.4)",
              borderRadius: "50%",
              filter: "blur(1px)",
              opacity,
              scale,
            }}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        );
      })}

      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorX,
          top: cursorY,
          width: "20px",
          height: "20px",
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};
