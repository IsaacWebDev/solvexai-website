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
    setIsHovered(false)
    // Delay removing iframe to allow animation to complete
    setTimeout(() => setShowPreview(false), 300)
  }

  // Mobile click handler (optional: click to preview)
  const handleMobileClick = () => {
    if (!isMobile) return
    setShowPreview(prev => !prev)
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
            className={`
              absolute z-50
              ${isMobile 
                ? 'top-0 left-0 right-0 mt-2' 
                : 'top-0 left-full ml-8'
              }
            `}
            style={{
              pointerEvents: 'none',
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

              {/* Iframe Preview */}
              {showPreview && (
                <div 
                  className="relative overflow-hidden"
                  style={{
                    height: isMobile ? '300px' : '500px',
                    background: 'rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
                    <iframe
                      src={previewUrl}
                      className="w-full"
                      style={{
                        height: '800px', // Taller than container to show scrolling
                        border: 'none',
                        pointerEvents: 'none', // Disable interaction
                        transform: 'scale(1)',
                        transformOrigin: 'top left',
                      }}
                      title={`Preview of ${templateName || 'template'}`}
                      loading="lazy"
                      sandbox="allow-same-origin" // Security: no scripts
                    />
                  </div>

                  {/* Gradient Overlay at Bottom (indicates more content) */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(15, 15, 20, 0.9), transparent)',
                    }}
                  />
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
