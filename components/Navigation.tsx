'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LiquidGlassCard, LiquidGlassButton } from '@/components/ui'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  
  // Navigation links without 4-Hour Builds
  const links = [
    { href: '/portfolio', label: 'Portfolio' },
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
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors font-medium relative min-h-[48px] flex items-center ${
                      isActive 
                        ? 'text-purple-400 font-semibold' 
                        : 'text-white/80 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400 rounded-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                );
              })}
              <LiquidGlassButton variant="primary" size="sm">
                <Link href="/contact">Get Started</Link>
              </LiquidGlassButton>
            </div>

            {/* CENTER: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center group min-h-[48px] min-w-[48px]">
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
              <Link href="/" className="min-h-[48px] flex items-center">
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

          {/* Mobile Layout - Hamburger */}
          <div className="lg:hidden flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group min-h-[48px]">
              <Image
                src="/logo-text-white.png"
                alt="SolveXAI"
                width={140}
                height={40}
                className="object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
            
            {/* Hamburger Button */}
            <button
              className="text-white p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
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
      </div>

      {/* Mobile Slide-Out Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-[#020A12]/95 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-col gap-2 flex-1">
                  {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`transition-all font-medium py-4 px-4 rounded-lg min-h-[48px] flex items-center ${
                          isActive
                            ? 'text-purple-400 bg-purple-500/10 font-semibold'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <LiquidGlassButton variant="primary" size="md" className="w-full min-h-[48px]">
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="block w-full">
                      Get Started
                    </Link>
                  </LiquidGlassButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
