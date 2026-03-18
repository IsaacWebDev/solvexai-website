'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '/4-hour-builds', label: '4-Hour Builds', badge: 'NEW' },
    { href: '/templates', label: 'Templates' },
    { href: '/packages', label: 'Packages' },
    { href: '/ai-receptionist', label: 'AI Receptionist' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6">
      <div className="max-w-[1920px] mx-auto">
        <LiquidGlassCard intensity="light" className="rounded-full px-10 py-4">
          
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between relative">
            
            {/* LEFT: Navigation Links + Get Started */}
            <div className="flex items-center gap-10">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors font-medium relative"
                >
                  {link.label}
                  {link.badge && (
                    <span className="absolute -top-2 -right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
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
                  src="/logo-molecular-white.png"
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
                  src="/solvexai-logo-white.png"
                  alt="SolveXAI"
                  width={200}
                  height={60}
                  className="object-contain hover:opacity-90 transition-opacity"
                  priority
                />
              </Link>
            </div>
            
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo-text-white.png"
                alt="SolveXAI"
                width={140}
                height={40}
                className="object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
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
