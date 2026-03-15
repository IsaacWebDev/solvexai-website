'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Clock, Circle, Globe } from 'lucide-react';

export const LiveCounter = () => {
  const [tasksAutomated, setTasksAutomated] = useState(27384);
  const [hoursSaved, setHoursSaved] = useState(2156);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random increment every 3-5 seconds
      const randomDelay = Math.random() * 2000 + 3000;
      
      setTimeout(() => {
        setTasksAutomated((prev) => prev + Math.floor(Math.random() * 5) + 1);
        setHoursSaved((prev) => prev + Math.floor(Math.random() * 3) + 1);
      }, randomDelay);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animated count-up effect
  const AnimatedNumber = ({ value }: { value: number }) => {
    return (
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {value.toLocaleString()}
      </motion.span>
    );
  };

  return (
    <section className="py-16 px-6 flex justify-center">
      <div className="max-w-5xl w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-purple-500/30 rounded-3xl p-10 backdrop-blur-xl"
        >
          
          <div className="grid md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-purple-500/30">
            
            {/* Tasks Automated */}
            <div className="text-center md:pr-8 pb-8 md:pb-0">
              <div className="mb-4 flex justify-center">
                <Bot size={40} className="text-purple-400" />
              </div>
              <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                <AnimatedNumber value={tasksAutomated} />
              </p>
              <p className="text-gray-400 text-lg">
                Tasks automated this month
              </p>
              <div className="mt-4 inline-block">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center gap-2">
                  <Circle size={12} className="fill-current" /> Live
                </span>
              </div>
            </div>

            {/* Hours Saved */}
            <div className="text-center md:pl-8 pt-8 md:pt-0">
              <div className="mb-4 flex justify-center">
                <Clock size={40} className="text-blue-400" />
              </div>
              <p className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-2">
                <AnimatedNumber value={hoursSaved} />
              </p>
              <p className="text-gray-400 text-lg">
                Hours saved today
              </p>
              <div className="mt-4">
                <span className="text-gray-500 text-sm">
                  Updated in real-time
                </span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
