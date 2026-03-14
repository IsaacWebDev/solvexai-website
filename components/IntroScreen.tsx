'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PortalTransition } from './transitions/PortalTransition';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showContent, setShowContent] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    // Check if user has seen intro
    if (typeof window !== 'undefined' && localStorage.getItem('solvexai-intro-seen') === 'true') {
      onEnter();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix setup
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize drops (one per column)
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start above screen
    }

    // Colors (blue-purple gradient)
    const colors = ['#8B5CF6', '#3B82F6', '#00F0FF'];

    // Animation loop - NO MOUSE INTERACTION
    function draw() {
      if (!ctx || !canvas) return;

      // Fade background (trail effect)
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters[Math.floor(Math.random() * characters.length)];

        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;

        // Draw
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset when off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move down
        drops[i]++;
      }
    }

    // Start animation (60 FPS) - CONTINUOUS, NO RESETS
    const interval = setInterval(draw, 1000 / 60);

    // Handle resize ONLY (no mouse events)
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [onEnter]);

  const handleEnter = () => {
    setShowContent(false); // Fade out intro UI
    setShowTransition(true); // Trigger portal
    if (typeof window !== 'undefined') {
      localStorage.setItem('solvexai-intro-seen', 'true');
    }
  };

  const handleTransitionComplete = () => {
    onEnter(); // Switch to homepage
  };

  // Keyboard handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* Existing intro screen */}
      <motion.div
        className="fixed inset-0 z-[9999]"
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Matrix Background - NO MOUSE EVENTS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Content - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <Image
              src="/solvexai-logo-white.png"
              alt="SolveXAI"
              width={600}
              height={200}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* [ENTER] Button - 3D Glass Bubble */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            onClick={handleEnter}
            className="
              relative px-12 py-6 rounded-full
              bg-white/5 backdrop-blur-md
              border border-white/20
              shadow-[0_8px_32px_rgba(139,92,246,0.3)]
              hover:shadow-[0_8px_48px_rgba(139,92,246,0.5)]
              transition-all duration-300
              cursor-pointer
              group
            "
          >
            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Text */}
            <span className="
              relative z-10
              text-white/90 text-3xl font-mono tracking-wider
              group-hover:text-white
              transition-colors duration-300
            ">
              [ENTER]
            </span>
          </motion.div>

        </div>
      </motion.div>

      {/* Portal transition */}
      <PortalTransition 
        isActive={showTransition} 
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
