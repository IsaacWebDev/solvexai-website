'use client'
import { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'

export function ScrollControlledJellyfish() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  const lastScrollTime = useRef(Date.now())
  const scrollVelocity = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !videoRef.current) return

    const video = videoRef.current
    
    // Ensure video is loaded
    video.load()

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const now = Date.now()
      const timeDelta = now - lastScrollTime.current
      
      if (timeDelta > 0) {
        // Calculate scroll velocity
        scrollVelocity.current = Math.abs(latest - scrollYProgress.getPrevious()) / timeDelta
        lastScrollTime.current = now
      }

      // If user is scrolling (velocity > threshold), play video
      if (scrollVelocity.current > 0.0001) {
        video.playbackRate = Math.min(scrollVelocity.current * 100, 2) // Speed based on scroll speed
        video.play().catch(() => {})
      } else {
        // User stopped scrolling, pause video
        video.pause()
      }
    })

    // Also detect scroll events for better responsiveness
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      // Play while scrolling
      if (video.paused) {
        video.play().catch(() => {})
      }
      
      // Pause 150ms after scroll stops
      scrollTimeout = setTimeout(() => {
        video.pause()
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      unsubscribe()
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [mounted, scrollYProgress])

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-black" />
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ 
          filter: 'brightness(0.8) contrast(1.1)',
        }}
      >
        <source src="/videos/jellyfish-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Subtle overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none"
      />
    </div>
  )
}
