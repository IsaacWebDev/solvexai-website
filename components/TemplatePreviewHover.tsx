'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

interface TemplatePreviewHoverProps {
  previewUrl?: string
  children: React.ReactNode
  templateName?: string
}

export function TemplatePreviewHover({ 
  previewUrl, 
  children,
  templateName 
}: TemplatePreviewHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Debounced hover handler
  const handleMouseEnter = () => {
    if (isMobile) return // No hover on mobile
    
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    
    // Debounce: wait 200ms before showing preview
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true)
      // Lazy load: only set showPreview after hover is confirmed
      setTimeout(() => setShowPreview(true), 50)
    }, 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    // Only hide if not manually closed
    setIsHovered(false)
    setShowPreview(false)
  }

  // Handle mouse leave on preview itself
  const handlePreviewMouseLeave = (e: React.MouseEvent) => {
    // Check if mouse is leaving to go back to the card or completely away
    const relatedTarget = e.relatedTarget as HTMLElement
    if (!relatedTarget || !containerRef.current?.contains(relatedTarget)) {
      setIsHovered(false)
      setShowPreview(false)
    }
  }

  // Mobile click handler (optional: click to preview)
  const handleMobileClick = () => {
    if (!isMobile) return
    setShowPreview(prev => !prev)
  }

  // Close handler
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsHovered(false)
    setShowPreview(false)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMobileClick}
    >
      {/* Live Preview Badge */}
      {previewUrl && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          Live Preview
        </div>
      )}

      {/* Original Card Content */}
      {children}

      {/* Browser Preview Overlay */}
      <AnimatePresence>
        {isHovered && previewUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: isMobile ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: isMobile ? 0 : 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onMouseLeave={handlePreviewMouseLeave}
            className={`
              absolute z-50
              ${isMobile 
                ? 'top-0 left-0 right-0 mt-2' 
                : 'top-0 left-full ml-8'
              }
            `}
            style={{
              pointerEvents: 'auto',
            }}
          >
            {/* Backdrop Blur Background */}
            <div 
              className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-md rounded-2xl"
              style={{
                transform: 'scale(1.02)',
              }}
            />

            {/* Browser Mockup Container */}
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                width: isMobile ? '100%' : '400px',
                maxWidth: '400px',
                background: 'rgba(15, 15, 20, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 z-50 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors group"
                aria-label="Close preview"
              >
                <svg 
                  className="w-4 h-4 text-white/70 group-hover:text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Browser Navigation Bar */}
              <div 
                className="flex items-center gap-2 px-4 py-3 border-b"
                style={{
                  background: 'rgba(30, 30, 40, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Traffic Light Buttons */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                {/* URL Bar */}
                <div 
                  className="flex-1 px-3 py-1.5 rounded-md text-xs text-gray-400 truncate ml-2"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {previewUrl.startsWith('http') ? previewUrl : `preview/${templateName?.toLowerCase().replace(/\s+/g, '-') || 'template'}`}
                </div>
              </div>

              {/* Preview Content */}
              {showPreview && (
                <div 
                  className="relative overflow-hidden flex items-center justify-center"
                  style={{
                    height: isMobile ? '300px' : '500px',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                  }}
                >
                  <div className="text-center px-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Live Demo Coming Soon</h4>
                    <p className="text-gray-400 text-sm mb-6">
                      Interactive preview of {templateName} will be available shortly
                    </p>
                    <a 
                      href="/contact" 
                      className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      style={{ pointerEvents: 'auto' }}
                    >
                      Request Full Demo
                    </a>
                  </div>
                </div>
              )}

              {/* Loading State (while iframe loads) */}
              {!showPreview && (
                <div 
                  className="flex items-center justify-center"
                  style={{
                    height: isMobile ? '300px' : '500px',
                    background: 'rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-400">Loading preview...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Instruction Hint */}
            {isMobile && (
              <div className="text-center mt-2 text-xs text-gray-500">
                Tap card to toggle preview
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
