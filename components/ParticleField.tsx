'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldSceneProps {
  count: number;
  mouseX: number;
  mouseY: number;
}

function ParticleFieldScene({ count, mouseX, mouseY }: ParticleFieldSceneProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const color = new THREE.Color('#00F0FF');
    
    for (let i = 0; i < count; i++) {
      // Random position in sphere
      const radius = 5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 5;
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color with variation
      const intensity = 0.5 + Math.random() * 0.5;
      colors[i * 3] = color.r * intensity;
      colors[i * 3 + 1] = color.g * intensity;
      colors[i * 3 + 2] = color.b * intensity;
      
      // Random upward velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = Math.random() * 0.03 + 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, [count]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      const positionAttribute = pointsRef.current.geometry.attributes.position;
      const positions = positionAttribute.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        // Apply velocity
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Reset if too high
        if (positions[i * 3 + 1] > 5) {
          positions[i * 3 + 1] = -5;
        }
        
        // Wrap around edges
        if (Math.abs(positions[i * 3]) > 10) {
          positions[i * 3] = -positions[i * 3];
        }
        if (Math.abs(positions[i * 3 + 2]) > 10) {
          positions[i * 3 + 2] = -positions[i * 3 + 2];
        }
      }
      
      positionAttribute.needsUpdate = true;
      
      // Mouse parallax
      pointsRef.current.rotation.x = mouseY * 0.0005;
      pointsRef.current.rotation.y = mouseX * 0.0005;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface ParticleFieldProps {
  count?: number;
}

export default function ParticleField({ count = 200 }: ParticleFieldProps) {
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 50 : count;
  
  // Track mouse
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mousePosition.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      };
    });
  }
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ParticleFieldScene
          count={particleCount}
          mouseX={mousePosition.current.x}
          mouseY={mousePosition.current.y}
        />
      </Canvas>
    </div>
  );
}
