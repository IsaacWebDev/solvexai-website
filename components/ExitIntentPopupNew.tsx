'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExitIntentPopupNew = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem('exit-intent-shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves to top of viewport (to leave page)
      if (e.clientY <= 10 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const openCalendly = () => {
    // @ts-ignore - Calendly global
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/solvexai/consultation' });
    }
    setShowPopup(false);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-6">⏰</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Wait!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get a <span className="font-bold text-white">15-minute free consultation</span> before you go
            </p>
            <button
              onClick={openCalendly}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl mb-4"
            >
              Book Now (100% Free)
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              No thanks, I'll figure it out myself
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
