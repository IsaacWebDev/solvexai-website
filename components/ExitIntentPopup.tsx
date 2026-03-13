"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassButton } from "./ui";

/**
 * ExitIntentPopup Component
 * 
 * Detects when user is about to leave and offers a FREE 15-minute consultation.
 * 
 * Features:
 * - Exit intent detection (mouse moving toward close button)
 * - Mobile: scroll-to-top + pause detection
 * - Shows only once per session (localStorage)
 * - "Maybe later" dismissal tracked for 7 days
 * - Doesn't show on /contact page
 * - Doesn't show if user already booked/submitted form
 * - Beautiful liquid glass modal with dark overlay
 * - Console logging for analytics/testing
 * 
 * Trigger conditions:
 * - Desktop: Mouse Y < 50px (moving toward close button)
 * - Mobile: Rapid scroll to top + 2s pause
 * - After 5 seconds on page (give them time)
 * - Only once per session
 */

const STORAGE_KEYS = {
  SHOWN_THIS_SESSION: "exitPopupShown",
  DISMISSED_TIMESTAMP: "exitPopupDismissed",
  BOOKED: "userBooked",
};

const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MIN_TIME_ON_PAGE_MS = 5000; // 5 seconds
const MOBILE_SCROLL_THRESHOLD = 100; // pixels from top
const MOBILE_PAUSE_DURATION_MS = 2000; // 2 seconds

export const ExitIntentPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [canShow, setCanShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollPauseTimer, setScrollPauseTimer] = useState<NodeJS.Timeout | null>(null);

  // Check if we should show the popup
  const shouldShowPopup = useCallback((): boolean => {
    // Don't show on /contact page
    if (typeof window !== "undefined" && window.location.pathname === "/contact") {
      return false;
    }

    // Check if already shown this session
    const shownThisSession = sessionStorage.getItem(STORAGE_KEYS.SHOWN_THIS_SESSION);
    if (shownThisSession === "true") {
      return false;
    }

    // Check if user already booked
    const userBooked = localStorage.getItem(STORAGE_KEYS.BOOKED);
    if (userBooked === "true") {
      return false;
    }

    // Check if dismissed recently (7 day cooldown)
    const dismissedTimestamp = localStorage.getItem(STORAGE_KEYS.DISMISSED_TIMESTAMP);
    if (dismissedTimestamp) {
      const timeSinceDismiss = Date.now() - parseInt(dismissedTimestamp, 10);
      if (timeSinceDismiss < DISMISS_COOLDOWN_MS) {
        return false;
      }
    }

    return true;
  }, []);

  // Show popup and mark as shown
  const showPopup = useCallback(() => {
    if (!canShow || !shouldShowPopup()) return;

    console.log("[ExitIntentPopup] Triggered");
    setIsOpen(true);
    sessionStorage.setItem(STORAGE_KEYS.SHOWN_THIS_SESSION, "true");
  }, [canShow, shouldShowPopup]);

  // Handle "Book My Free Call" click
  const handleBookCall = useCallback(() => {
    console.log("[ExitIntentPopup] User clicked 'Book My Free Call'");
    localStorage.setItem(STORAGE_KEYS.BOOKED, "true");
    setIsOpen(false);
    // Navigate to contact page (or Calendly if you have one)
    window.location.href = "/contact";
  }, []);

  // Handle "Maybe Later" click
  const handleDismiss = useCallback(() => {
    console.log("[ExitIntentPopup] User clicked 'Maybe Later'");
    localStorage.setItem(STORAGE_KEYS.DISMISSED_TIMESTAMP, Date.now().toString());
    setIsOpen(false);
  }, []);

  // Handle close button
  const handleClose = useCallback(() => {
    console.log("[ExitIntentPopup] User closed popup");
    localStorage.setItem(STORAGE_KEYS.DISMISSED_TIMESTAMP, Date.now().toString());
    setIsOpen(false);
  }, []);

  // Desktop: Detect mouse moving toward close button (y < 50px)
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50 && canShow && shouldShowPopup()) {
        showPopup();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [canShow, isMobile, shouldShowPopup, showPopup]);

  // Mobile: Detect scroll-to-top + pause
  useEffect(() => {
    if (typeof window === "undefined" || !isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Clear existing pause timer
      if (scrollPauseTimer) {
        clearTimeout(scrollPauseTimer);
      }

      // Check if near top and scrolling up
      if (
        currentScrollY < MOBILE_SCROLL_THRESHOLD &&
        currentScrollY < lastScrollY
      ) {
        // Set timer to trigger popup after pause
        const timer = setTimeout(() => {
          if (canShow && shouldShowPopup()) {
            showPopup();
          }
        }, MOBILE_PAUSE_DURATION_MS);
        setScrollPauseTimer(timer);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollPauseTimer) {
        clearTimeout(scrollPauseTimer);
      }
    };
  }, [canShow, isMobile, lastScrollY, scrollPauseTimer, shouldShowPopup, showPopup]);

  // Initialize: check mobile, wait 5 seconds before enabling
  useEffect(() => {
    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Wait 5 seconds before enabling popup
    const timer = setTimeout(() => {
      setCanShow(true);
    }, MIN_TIME_ON_PAGE_MS);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Liquid glass modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div
              className="relative w-full max-w-lg overflow-hidden rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.05) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 0 40px rgba(139,92,246,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close X button (top-right) */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8 md:p-10 text-center">
                {/* Headline */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Wait! Before you go...
                </h2>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-purple-300 font-semibold mb-4">
                  Get a FREE 15-minute consultation
                  <span className="block text-lg text-white/60">(worth $197)</span>
                </p>

                {/* Body */}
                <p className="text-base md:text-lg text-white/80 mb-6">
                  Let's discuss your project. No pressure, just advice.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-left">
                  {[
                    "Understand your needs",
                    "Get cost estimate",
                    "See template recommendations",
                    "No obligation",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-white/90">
                      <svg
                        className="w-5 h-5 text-green-400 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <LiquidGlassButton
                    variant="primary"
                    size="lg"
                    onClick={handleBookCall}
                    className="w-full"
                  >
                    Book My Free Call →
                  </LiquidGlassButton>

                  <button
                    onClick={handleDismiss}
                    className="w-full py-3 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
