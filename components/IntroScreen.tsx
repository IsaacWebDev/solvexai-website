'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Check if user has seen intro before
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

    // Matrix characters
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

    // Animation loop
    function draw() {
      if (!ctx || !canvas) return;

      // Fade background (trail effect)
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = characters[Math.floor(Math.random() * characters.length)];

        // Random color from gradient
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;

        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    }

    // Start animation (60 FPS)
    const interval = setInterval(draw, 1000 / 60);

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return;
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
    setShowContent(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('solvexai-intro-seen', 'true');
    }
    setTimeout(onEnter, 800); // Fade out duration
  };

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
    <div
      onClick={handleEnter}
      className="fixed inset-0 z-[9999] cursor-pointer"
      style={{
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.8s ease-out'
      }}
    >
      {/* Matrix canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#0a0a0a' }}
      />

      {/* Logo + [ENTER] - centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none">
        {/* SolveXAI Logo */}
        <div className="relative w-[90vw] max-w-[600px] h-[200px]">
          <Image
            src="/solvexai-logo-clean.png"
            alt="SolveXAI"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* [ENTER] text */}
        <div
          className="text-white text-2xl font-mono tracking-wider"
          style={{
            animation: 'pulse 2s ease-in-out infinite'
          }}
        >
          [ENTER]
        </div>
      </div>

      {/* CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
