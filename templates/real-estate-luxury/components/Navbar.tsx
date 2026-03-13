'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-dark/95 backdrop-blur-sm text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-heading font-bold text-primary">
            PRESTIGE ESTATE
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/agents" className="hover:text-primary transition-colors">Agents</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="hidden md:block">
            <button className="bg-primary text-dark px-6 py-2 rounded font-semibold hover:bg-primary/90 transition-all">
              Schedule Viewing
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-dark">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 hover:bg-primary/20 rounded">Home</Link>
            <Link href="/properties" className="block px-3 py-2 hover:bg-primary/20 rounded">Properties</Link>
            <Link href="/about" className="block px-3 py-2 hover:bg-primary/20 rounded">About</Link>
            <Link href="/agents" className="block px-3 py-2 hover:bg-primary/20 rounded">Agents</Link>
            <Link href="/contact" className="block px-3 py-2 hover:bg-primary/20 rounded">Contact</Link>
            <button className="w-full mt-2 bg-primary text-dark px-6 py-2 rounded font-semibold">
              Schedule Viewing
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
