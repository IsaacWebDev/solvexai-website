'use client';

import { useRef, useEffect, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
}

interface NetworkVisualizationProps {
  nodeCount?: number;
  connectionDistance?: number;
  scrollProgress?: number;
}

export default function NetworkVisualization({
  nodeCount = 100,
  connectionDistance = 100,
  scrollProgress = 0,
}: NetworkVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Initialize nodes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    
    setDimensions({ width, height });
    
    // Create nodes
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      targetX: Math.random() * width,
      targetY: Math.random() * height,
    }));
    
    // Set formation targets based on scroll
    updateFormation(scrollProgress);
  }, [nodeCount, scrollProgress]);
  
  // Update formation based on scroll
  const updateFormation = (progress: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    nodesRef.current.forEach((node, i) => {
      if (progress < 0.3) {
        // Chaotic state
        node.targetX = Math.random() * width;
        node.targetY = Math.random() * height;
      } else if (progress < 0.7) {
        // Forming circle
        const angle = (i / nodeCount) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.3;
        node.targetX = centerX + Math.cos(angle) * radius;
        node.targetY = centerY + Math.sin(angle) * radius;
      } else {
        // Forming "AI" pattern
        const letterWidth = width * 0.15;
        const letterHeight = height * 0.4;
        const spacing = width * 0.25;
        
        if (i < nodeCount / 2) {
          // "A" shape
          const t = (i / (nodeCount / 2));
          if (t < 0.4) {
            // Left line
            node.targetX = centerX - spacing + t * letterWidth * 0.5;
            node.targetY = centerY + letterHeight * (1 - t * 2);
          } else if (t < 0.6) {
            // Middle line
            node.targetX = centerX - spacing + (t - 0.4) * letterWidth;
            node.targetY = centerY;
          } else {
            // Right line
            node.targetX = centerX - spacing + letterWidth - (t - 0.6) * letterWidth * 0.5;
            node.targetY = centerY + letterHeight * ((t - 0.6) * 2 - 1);
          }
        } else {
          // "I" shape
          const t = ((i - nodeCount / 2) / (nodeCount / 2));
          node.targetX = centerX + spacing;
          node.targetY = centerY - letterHeight / 2 + t * letterHeight;
        }
      }
    });
  };
  
  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Move towards target
        const dx = node.targetX - node.x;
        const dy = node.targetY - node.y;
        node.vx += dx * 0.001;
        node.vy += dy * 0.001;
        
        // Mouse interaction
        const mdx = mouseRef.current.x - node.x;
        const mdy = mouseRef.current.y - node.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          node.vx += mdx * 0.0001;
          node.vy += mdy * 0.0001;
        }
        
        // Apply velocity with damping
        node.vx *= 0.95;
        node.vy *= 0.95;
        node.x += node.vx;
        node.y += node.vy;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00F0FF';
        ctx.fill();
        
        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Draw connections
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const dx = nodesRef.current[i].x - nodesRef.current[j].x;
          const dy = nodesRef.current[i].y - nodesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodesRef.current[i].x, nodesRef.current[i].y);
            ctx.lineTo(nodesRef.current[j].x, nodesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [connectionDistance]);
  
  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Update formation on scroll change
  useEffect(() => {
    updateFormation(scrollProgress);
  }, [scrollProgress]);
  
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      setDimensions({ width: canvas.width, height: canvas.height });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
