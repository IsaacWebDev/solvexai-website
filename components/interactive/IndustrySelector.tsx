'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const industries = [
  { id: 'restaurant', label: 'Restaurant Owner', emoji: '🍽️' },
  { id: 'realtor', label: 'Real Estate Agent', emoji: '🏠' },
  { id: 'lawyer', label: 'Law Firm', emoji: '⚖️' },
  { id: 'fitness', label: 'Fitness Studio', emoji: '💪' },
  { id: 'ecommerce', label: 'E-Commerce Store', emoji: '🛍️' },
  { id: 'medical', label: 'Medical Practice', emoji: '🏥' },
  { id: 'construction', label: 'Construction Company', emoji: '🏗️' },
  { id: 'agency', label: 'Creative Agency', emoji: '🎨' },
];

interface IndustrySelectorProps {
  onIndustryChange?: (industry: string) => void;
}

export const IndustrySelector = ({ onIndustryChange }: IndustrySelectorProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('restaurant');

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('selected-industry');
    if (saved) {
      setSelectedIndustry(saved);
    }
  }, []);

  const handleChange = (industryId: string) => {
    setSelectedIndustry(industryId);
    localStorage.setItem('selected-industry', industryId);
    if (onIndustryChange) {
      onIndustryChange(industryId);
    }
  };

  const selectedOption = industries.find((i) => i.id === selectedIndustry);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 mb-12"
    >
      <p className="text-xl text-gray-400">I'm a:</p>
      
      <div className="relative">
        <select
          value={selectedIndustry}
          onChange={(e) => handleChange(e.target.value)}
          className="appearance-none bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50 text-white px-6 py-3 pr-12 rounded-full text-lg font-semibold cursor-pointer hover:border-purple-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id} className="bg-gray-900">
              {industry.emoji} {industry.label}
            </option>
          ))}
        </select>
        
        {/* Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Selected Industry Display */}
      {selectedOption && (
        <motion.div
          key={selectedOption.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl"
        >
          {selectedOption.emoji}
        </motion.div>
      )}
    </motion.div>
  );
};
