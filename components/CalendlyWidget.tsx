'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

export const CalendlyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    setIsOpen(true);
    // @ts-ignore - Calendly global
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/solvexai/consultation' });
    }
  };

  return (
    <>
      {/* Floating "Book a Call" Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={openCalendly}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-full font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center gap-2"
        aria-label="Book a Call"
      >
        <Phone size={20} />
        <span className="hidden md:inline">Book a Call</span>
      </motion.button>

      {/* Calendly embed container (hidden, used by popup) */}
      <div id="calendly-embed" />
    </>
  );
};
