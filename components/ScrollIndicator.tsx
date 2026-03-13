'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <span className="text-sm text-white/60 font-medium tracking-wider uppercase">
        Scroll
      </span>
      
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-[#00F0FF]/40 flex items-start justify-center p-2"
        animate={{ 
          borderColor: ['rgba(0,240,255,0.4)', 'rgba(0,240,255,0.8)', 'rgba(0,240,255,0.4)']
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>
    </motion.div>
  );
}
