'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export const ROICalculator = () => {
  const [hours, setHours] = useState(20);

  const hourlyRate = 50;
  const monthlyLoss = hours * hourlyRate * 4.33; // avg weeks per month
  const yearlyLoss = monthlyLoss * 12;
  const savingsPercent = 0.7; // 70% reduction
  const yearlySavings = yearlyLoss * savingsPercent;

  return (
    <section className="py-32 px-6 flex justify-center bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-gray-400">
            See how much time and money you're losing to manual work
          </p>
        </div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12 shadow-2xl"
        >
          
          {/* Question */}
          <p className="text-2xl font-light mb-8 text-center">
            How many hours/week do you spend on repetitive tasks?
          </p>

          {/* Slider */}
          <div className="mb-12">
            <input
              type="range"
              min="5"
              max="40"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer slider-purple"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>5 hours</span>
              <span className="text-4xl font-bold text-white">{hours} hrs/week</span>
              <span>40 hours</span>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <motion.div
              key={hours}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center"
            >
              <p className="text-gray-400 mb-2">At ${hourlyRate}/hour, you're losing</p>
              <p className="text-5xl font-bold text-red-400">
                ${monthlyLoss.toLocaleString()}/month
              </p>
              <p className="text-sm text-gray-500 mt-2">
                That's <span className="text-white font-semibold">${yearlyLoss.toLocaleString()}/year</span> down the drain
              </p>
            </motion.div>

            <motion.div
              key={hours + 100}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 text-center"
            >
              <p className="text-gray-400 mb-2">SolveXAI saves you</p>
              <p className="text-5xl font-bold text-green-400">
                ${yearlySavings.toLocaleString()}/year
              </p>
              <p className="text-sm text-gray-500 mt-2">
                With <span className="text-white font-semibold">70% automation</span> of your workflow
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl">
              See How We Can Help →
            </button>
          </div>

        </motion.div>

      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider-purple::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.5);
        }
        
        .slider-purple::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </section>
  );
};
