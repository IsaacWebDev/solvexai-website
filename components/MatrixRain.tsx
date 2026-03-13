'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Matrix characters (mix of symbols, letters, numbers)
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const matrixArray = matrix.split('');
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array of drop positions (one per column)
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random positions above screen
    }
    
    // Color gradient (blue-purple)
    const colors = [
      '#8B5CF6', // Purple
      '#7C3AED', // Darker purple
      '#6D28D9', // Even darker
      '#5B21B6', // Deep purple
      '#3B82F6', // Blue
      '#2563EB', // Darker blue
      '#00F0FF'  // Cyan accent
    ];
    
    function draw() {
      if (!ctx || !canvas) return;
      
      // Black background with transparency for trail effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw characters
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        
        // Color based on position (gradient from blue to purple)
        const colorIndex = Math.floor((drops[i] / canvas.height) * colors.length);
        ctx.fillStyle = colors[Math.min(colorIndex, colors.length - 1)];
        
        // Glow effect on leading character
        if (drops[i] * fontSize > 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = colors[colorIndex];
        } else {
          ctx.shadowBlur = 0;
        }
        
        // Draw character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }
    }
    
    // Animation loop
    const interval = setInterval(draw, 50);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
}
