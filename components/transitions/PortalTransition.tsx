'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PortalTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const PortalTransition = ({ isActive, onComplete }: PortalTransitionProps) => {
  const [phase, setPhase] = useState<'idle' | 'zoom' | 'warp' | 'landing' | 'complete'>('idle');
  const phaseStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) return;

    // Phase sequence - SLOWER, MORE DRAMATIC
    const timeline = [
      { phase: 'zoom', delay: 0, duration: 700 },        // 0-0.7s (was 0.5s)
      { phase: 'warp', delay: 700, duration: 1500 },     // 0.7-2.2s (was 1.0s)
      { phase: 'landing', delay: 2200, duration: 800 },  // 2.2-3.0s (was 0.8s)
      { phase: 'complete', delay: 3000, duration: 0 }
    ];

    timeline.forEach(({ phase, delay }) => {
      setTimeout(() => {
        setPhase(phase as any);
        phaseStartTimeRef.current = Date.now();
      }, delay);
    });

    // Complete transition
    setTimeout(() => {
      onComplete();
    }, 3200);
  }, [isActive, onComplete]);

  if (!isActive && phase === 'idle') return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'complete' ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Code Tunnel Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <CodeTunnel phase={phase} phaseStartTime={phaseStartTimeRef.current} />
      </Canvas>

      {/* Flash overlay (peak warp speed) */}
      {phase === 'warp' && (
        <motion.div
          className="absolute inset-0 bg-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.3, delay: 1.2 }}
        />
      )}

      {/* GREEN TINT - Matrix Aesthetic */}
      {phase === 'warp' && (
        <motion.div
          className="absolute inset-0 bg-emerald-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 1.0, delay: 0.8 }}
        />
      )}

      {/* SCANLINE EFFECT - Matrix Aesthetic */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'warp' ? 0.5 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Vignette effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.9) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'zoom' || phase === 'warp' ? 0.8 : 0 
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

// Easing functions
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
const easeInQuart = (t: number): number => t * t * t * t;

// Helper to create text texture for Matrix characters
const createTextTexture = (char: string, color: string): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = 64;
  canvas.height = 64;
  
  ctx.fillStyle = color;
  ctx.font = 'bold 48px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(char, 32, 32);
  
  return new THREE.CanvasTexture(canvas);
};

// Code Tunnel 3D Effect - MATRIX-STYLE CHARACTERS
const CodeTunnel = ({ phase, phaseStartTime }: { phase: string; phaseStartTime: number }) => {
  const spritesRef = useRef<THREE.Sprite[]>([]);
  const speedRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const texturesRef = useRef<{ char: string; texture: THREE.CanvasTexture }[]>([]);
  const sceneRef = useRef<THREE.Group>(new THREE.Group());

  // Initialize Matrix character textures ONCE
  useEffect(() => {
    const matrixChars = '01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Create textures for each character
    texturesRef.current = matrixChars.split('').map(char => ({
      char,
      texture: createTextTexture(char, '#3B82F6') // Blue
    }));

    // Generate sprite particles
    const particleCount = 2000;
    const sprites: THREE.Sprite[] = [];

    for (let i = 0; i < particleCount; i++) {
      const randomChar = texturesRef.current[Math.floor(Math.random() * texturesRef.current.length)];
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: randomChar.texture,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        })
      );
      
      // Position (random cylinder distribution)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 15;
      sprite.position.x = Math.cos(angle) * radius;
      sprite.position.y = Math.sin(angle) * radius;
      sprite.position.z = (Math.random() - 0.5) * 100;
      
      // Scale
      sprite.scale.set(0.3, 0.3, 1);
      
      sprites.push(sprite);
      sceneRef.current.add(sprite);
    }
    
    spritesRef.current = sprites;

    return () => {
      // Cleanup
      sprites.forEach(sprite => {
        sprite.material.dispose();
        sceneRef.current.remove(sprite);
      });
      texturesRef.current.forEach(({ texture }) => texture.dispose());
    };
  }, []);

  // Animation loop with SMOOTH EASING
  useFrame((state, delta) => {
    if (spritesRef.current.length === 0) return;

    // Camera FOV animation (fish-eye effect during warp)
    if (state.camera instanceof THREE.PerspectiveCamera) {
      cameraRef.current = state.camera;
      
      if (phase === 'warp') {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 120, 0.05);
      } else if (phase === 'landing') {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 75, 0.08);
      }
      state.camera.updateProjectionMatrix();
    }

    // SMOOTH EASING CURVES (not linear)
    if (phase === 'zoom') {
      const progress = Math.min((Date.now() - phaseStartTime) / 700, 1);
      const easedProgress = easeOutQuart(progress);
      speedRef.current = 10 * easedProgress;
    } else if (phase === 'warp') {
      const progress = Math.min((Date.now() - phaseStartTime) / 1500, 1);
      const easedProgress = easeInQuart(progress);
      speedRef.current = 10 + (40 * easedProgress); // 10 → 50
    } else if (phase === 'landing') {
      const progress = Math.min((Date.now() - phaseStartTime) / 800, 1);
      const easedProgress = easeOutQuart(progress);
      speedRef.current = 50 * (1 - easedProgress); // 50 → 0
    }

    // Move sprites toward camera
    spritesRef.current.forEach(sprite => {
      sprite.position.z += speedRef.current * delta;

      // Reset sprites that pass camera
      if (sprite.position.z > 5) {
        sprite.position.z = -50;
        
        // Randomize position again
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 15;
        sprite.position.x = Math.cos(angle) * radius;
        sprite.position.y = Math.sin(angle) * radius;
      }

      // Perspective scale (larger as they get closer)
      const scale = THREE.MathUtils.mapLinear(sprite.position.z, -50, 5, 0.05, 0.3);
      sprite.scale.set(scale, scale, 1);
    });
  });

  return <primitive object={sceneRef.current} />;
};
