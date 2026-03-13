'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Solve<span className="text-[#00F0FF]">X</span>AI
        </Link>

        {/* Navigation Pill */}
        <div className="hidden md:flex items-center gap-2 bg-[rgba(20,30,50,0.7)] backdrop-blur-md rounded-full px-3 py-2 border border-white/5">
          <Link 
            href="/services"
            className="relative px-5 py-2 text-sm font-medium rounded-full transition-all hover:bg-[rgba(40,55,80,0.6)]"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            Products
            <span className="ml-1">▾</span>
          </Link>
          
          <Link 
            href="/services"
            className="px-5 py-2 text-sm font-medium rounded-full transition-all hover:bg-[rgba(40,55,80,0.6)]"
          >
            Solutions
            <span className="ml-1">▾</span>
          </Link>
          
          <Link 
            href="/contact"
            className="px-5 py-2 text-sm font-medium rounded-full transition-all hover:bg-[rgba(40,55,80,0.6)]"
          >
            About
          </Link>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00F0FF] flex items-center justify-center text-xs font-bold ml-2 border border-white/10">
            AI
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
