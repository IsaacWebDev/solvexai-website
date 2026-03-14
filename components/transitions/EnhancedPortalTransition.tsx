'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

interface EnhancedPortalTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

export const EnhancedPortalTransition = ({ isActive, onComplete }: EnhancedPortalTransitionProps) => {
  const [phase, setPhase] = useState<'idle' | 'zoom' | 'warp' | 'landing' | 'complete'>('idle');

  useEffect(() => {
    if (!isActive) return;

    // Phase sequence with optimized timing
    const timeline = [
      { phase: 'zoom', delay: 0, duration: 500 },        // 0-0.5s
      { phase: 'warp', delay: 500, duration: 1000 },     // 0.5-1.5s
      { phase: 'landing', delay: 1500, duration: 800 },  // 1.5-2.3s
      { phase: 'complete', delay: 2300, duration: 0 }
    ];

    timeline.forEach(({ phase, delay }) => {
      setTimeout(() => setPhase(phase as any), delay);
    });

    // Complete transition
    setTimeout(() => {
      onComplete();
    }, 2500);
  }, [isActive, onComplete]);

  if (!isActive && phase === 'idle') return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'complete' ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Code Tunnel Canvas with post-processing */}
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <CodeTunnelWithEffects phase={phase} />
      </Canvas>

      {/* Flash overlay (peak warp speed) - More intense */}
      {phase === 'warp' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-purple-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.3, delay: 1.0, ease: 'easeInOut' }}
        />
      )}

      {/* Vignette effect with dynamic intensity */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.95) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'zoom' ? 0.6 : phase === 'warp' ? 0.85 : 0 
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Speed lines overlay (motion blur effect) */}
      {(phase === 'warp' || phase === 'zoom') && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'warp' ? 0.4 : 0.2 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="speedGradient">
                <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + Math.cos(i * 18 * Math.PI / 180) * 100}%`}
                y2={`${50 + Math.sin(i * 18 * Math.PI / 180) * 100}%`}
                stroke="url(#speedGradient)"
                strokeWidth={phase === 'warp' ? 2 : 1}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: phase === 'warp' ? 0.3 : 0.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

// Enhanced Code Tunnel with Depth Layers
const CodeTunnelWithEffects = ({ phase }: { phase: string }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const speedRef = useRef(0);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    // Camera FOV animation (fish-eye effect during warp)
    if (state.camera instanceof THREE.PerspectiveCamera) {
      if (phase === 'zoom') {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 90, 0.08);
      } else if (phase === 'warp') {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 120, 0.05);
      } else if (phase === 'landing') {
        state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 75, 0.08);
      }
      state.camera.updateProjectionMatrix();
    }

    // Speed curves with custom easing
    if (phase === 'zoom') {
      // Ease-out cubic acceleration
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, 15, 0.12);
    } else if (phase === 'warp') {
      // Maximum linear speed
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, 60, 0.05);
    } else if (phase === 'landing') {
      // Ease-in cubic deceleration
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, 0, 0.1);
    }

    // Move particles toward camera with perspective scaling
    const positions = particlesRef.current.geometry.attributes.position;
    const sizes = particlesRef.current.geometry.attributes.size;
    
    for (let i = 0; i < positions.count; i++) {
      let z = positions.getZ(i);
      z += speedRef.current * delta;

      // Reset particles that pass camera (with randomized depth)
      if (z > 5) {
        z = -50 - Math.random() * 20; // Varied starting depth
        
        // Randomize position on reset
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 12; // Varied radius
        positions.setX(i, Math.cos(angle) * radius);
        positions.setY(i, Math.sin(angle) * radius);
      }

      positions.setZ(i, z);

      // Perspective scale with depth-based sizing
      const distanceFromCamera = Math.abs(z);
      const baseScale = THREE.MathUtils.mapLinear(z, -70, 5, 0.03, 0.5);
      
      // Larger particles for warp phase
      const phaseMultiplier = phase === 'warp' ? 1.5 : 1.0;
      sizes.setX(i, baseScale * phaseMultiplier);
    }
    
    positions.needsUpdate = true;
    sizes.needsUpdate = true;
  });

  // Generate particles with depth layers
  const particleCount = 2500; // Increased for density
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    // Position (cylindrical distribution with depth layers)
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 12; // 5-17 radius
    const depth = (Math.random() - 0.5) * 140; // -70 to 70
    
    positions[i * 3] = Math.cos(angle) * radius;     // x
    positions[i * 3 + 1] = Math.sin(angle) * radius; // y
    positions[i * 3 + 2] = depth;                    // z

    // Color gradient (blue/purple/cyan)
    const colorVariant = Math.random();
    if (colorVariant < 0.33) {
      // Purple
      colors[i * 3] = 0.54;
      colors[i * 3 + 1] = 0.36;
      colors[i * 3 + 2] = 0.96;
    } else if (colorVariant < 0.66) {
      // Blue
      colors[i * 3] = 0.23;
      colors[i * 3 + 1] = 0.51;
      colors[i * 3 + 2] = 0.96;
    } else {
      // Cyan
      colors[i * 3] = 0.0;
      colors[i * 3 + 1] = 0.94;
      colors[i * 3 + 2] = 1.0;
    }

    // Initial size based on depth
    sizes[i] = 0.1;
  }

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* Ambient glow */}
      <ambientLight intensity={0.3} color="#8B5CF6" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#3B82F6" distance={50} />
    </>
  );
};
