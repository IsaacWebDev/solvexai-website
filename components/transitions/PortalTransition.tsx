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

  useEffect(() => {
    if (!isActive) return;

    // Phase sequence
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
      {/* Code Tunnel Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <CodeTunnel phase={phase} />
      </Canvas>

      {/* Flash overlay (peak warp speed) */}
      {phase === 'warp' && (
        <motion.div
          className="absolute inset-0 bg-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.3, delay: 1.0 }}
        />
      )}

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

// Code Tunnel 3D Effect
const CodeTunnel = ({ phase }: { phase: string }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const speedRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Speed curve based on phase + FOV animation
  useFrame((state, delta) => {
    if (!particlesRef.current) return;

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

    // Adjust speed based on phase
    if (phase === 'zoom') {
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, 10, 0.1); // Accelerate
    } else if (phase === 'warp') {
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, 50, 0.05); // Max speed
    } else if (phase === 'landing') {
      speedRef.current = THREE.MathUtils.lerp(speedRef.current, 0, 0.08); // Decelerate
    }

    // Move particles toward camera
    const positions = particlesRef.current.geometry.attributes.position;
    const sizes = particlesRef.current.geometry.attributes.size;
    
    for (let i = 0; i < positions.count; i++) {
      let z = positions.getZ(i);
      z += speedRef.current * delta;

      // Reset particles that pass camera
      if (z > 5) {
        z = -50;
      }

      positions.setZ(i, z);

      // Perspective scale (larger as they get closer)
      const scale = THREE.MathUtils.mapLinear(z, -50, 5, 0.05, 0.3);
      sizes.setX(i, scale);
    }
    
    positions.needsUpdate = true;
    sizes.needsUpdate = true;
  });

  // Generate particles
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    // Position (random cylinder distribution)
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 15;
    positions[i * 3] = Math.cos(angle) * radius;     // x
    positions[i * 3 + 1] = Math.sin(angle) * radius; // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z

    // Color (blue/purple gradient)
    const colorChoice = Math.random();
    if (colorChoice > 0.5) {
      colors[i * 3] = 0.54;     // Purple R
      colors[i * 3 + 1] = 0.36; // Purple G
      colors[i * 3 + 2] = 0.96; // Purple B
    } else {
      colors[i * 3] = 0.23;     // Blue R
      colors[i * 3 + 1] = 0.51; // Blue G
      colors[i * 3 + 2] = 0.96; // Blue B
    }

    // Initial size
    sizes[i] = 0.15;
  }

  return (
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
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
};
