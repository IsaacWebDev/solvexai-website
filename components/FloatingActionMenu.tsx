'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Mail } from 'lucide-react';

export const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      label: 'Book Call',
      Icon: Phone,
      color: 'text-pink-500',
      action: () => {
        // @ts-ignore - Calendly global
        if (window.Calendly) {
          // @ts-ignore
          window.Calendly.initPopupWidget({ url: 'https://calendly.com/solvexai/consultation' });
        }
      },
    },
    {
      label: 'Live Chat',
      Icon: MessageCircle,
      color: 'text-purple-500',
      action: () => {
        // Trigger chat widget (implementation depends on LiveChatWidget)
        const chatButton = document.querySelector('[aria-label="Chat with us"]') as HTMLElement;
        if (chatButton) chatButton.click();
      },
    },
    {
      label: 'Email Us',
      Icon: Mail,
      color: 'text-blue-500',
      action: () => {
        window.location.href = 'mailto:contact@solvexai.com';
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[45]">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 items-end"
          >
            {actions.map((item, i) => {
              const IconComponent = item.Icon;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 bg-gray-900 border border-gray-700 hover:border-purple-500 text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition-all group"
                >
                  <IconComponent className={`w-5 h-5 ${item.color}`} />
                  <span className="font-semibold text-sm whitespace-nowrap">{item.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
        style={{ transition: 'transform 0.3s ease' }}
      >
        <span className="text-3xl font-light">+</span>
      </motion.button>
    </div>
  );
};
