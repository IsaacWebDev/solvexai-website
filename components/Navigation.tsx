'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '/templates', label: 'Templates' },
    { href: '/packages', label: 'Packages' },
    { href: '/ai-receptionist', label: 'AI Receptionist' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-[1920px] mx-auto">
        <LiquidGlassCard intensity="light" className="rounded-full px-8 py-3">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between relative">
            
            {/* LEFT: Navigation Links + Get Started */}
            <div className="flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <LiquidGlassButton variant="primary" size="sm">
                <Link href="/contact">Get Started</Link>
              </LiquidGlassButton>
            </div>

            {/* CENTER: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/logo-center.png"
                  alt="SolveXAI"
                  width={50}
                  height={50}
                  className="object-contain group-hover:scale-110 transition-transform"
                  priority
                />
              </Link>
            </div>

            {/* RIGHT: SolveXAI Text Logo */}
            <div>
              <Link href="/">
                <Image
                  src="/solvexai-logo-perfect.png"
                  alt="SolveXAI"
                  width={200}
                  height={60}
                  className="object-contain hover:opacity-90 transition-opacity"
                  priority
                />
              </Link>
            </div>
            
          </div>

          {/* Mobile Layout (unchanged) */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-xl">SolveXAI</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
          
        </LiquidGlassCard>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden mt-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <LiquidGlassCard intensity="medium" className="rounded-3xl px-6 py-6">
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <LiquidGlassButton variant="primary" size="md" className="w-full">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </LiquidGlassButton>
                </div>
              </LiquidGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
