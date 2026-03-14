'use client';

import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { LEDJellyfish } from './LEDJellyfish';
import { LEDTurtle } from './LEDTurtle';
import { LEDMantaRay } from './LEDMantaRay';

interface Ripple {
  position: THREE.Vector3;
  radius: number;
  maxRadius: number;
  speed: number;
  opacity: number;
  color: string;
}

interface WaterSplashProps {
  ripples: Ripple[];
}

// Component receives ripples as props (read-only)
const WaterSplash = ({ ripples }: WaterSplashProps) => {
  return (
    <>
      {ripples.map((ripple, i) => {
        // Create circular wave
        const segments = 32;
        const points = [];
        for (let j = 0; j <= segments; j++) {
          const angle = (j / segments) * Math.PI * 2;
          const x = ripple.position.x + Math.cos(angle) * ripple.radius;
          const y = ripple.position.y + Math.sin(angle * 2) * 0.3; // Wave height
          const z = ripple.position.z + Math.sin(angle) * ripple.radius;
          points.push(new THREE.Vector3(x, y, z));
        }

        return (
          <Line
            key={`ripple-${i}`}
            points={points}
            color={ripple.color}
            lineWidth={0.05}
            transparent
            opacity={ripple.opacity}
          />
        );
      })}
    </>
  );
};

export default function OceanBackground() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Update ripples in useFrame (inside Canvas)
  const RippleUpdater = () => {
    useFrame((state, delta) => {
      setRipples(prev => 
        prev
          .map(r => ({
            ...r,
            radius: r.radius + r.speed * delta * 10,
            opacity: Math.max(0, r.opacity - delta * 0.5)
          }))
          .filter(r => r.opacity > 0 && r.radius < r.maxRadius)
      );
    });
    return null;
  };

  const handleClick = (event: any) => {
    // Get pointer position from Canvas event
    const x = event.pointer.x * 10;
    const y = event.pointer.y * 10;
    
    const position = new THREE.Vector3(x, 0, y);

    // Create multiple ripples (splash effect)
    const newRipples: Ripple[] = [
      {
        position: position.clone(),
        radius: 0.5,
        maxRadius: 8,
        speed: 1.5,
        opacity: 0.8,
        color: '#00F0FF'  // Cyan
      },
      {
        position: position.clone(),
        radius: 0.3,
        maxRadius: 6,
        speed: 1.2,
        opacity: 0.6,
        color: '#8B5CF6'  // Purple
      },
      {
        position: position.clone(),
        radius: 0.1,
        maxRadius: 4,
        speed: 0.9,
        opacity: 0.4,
        color: '#3B82F6'  // Blue
      }
    ];

    setRipples(prev => [...prev, ...newRipples]);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 50 }}
        onClick={handleClick}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }}
      >
        {/* Ripple updater */}
        <RippleUpdater />
        
        {/* JELLYFISH (Purple/Cyan) */}
        <LEDJellyfish 
          initialPosition={[8, 2, -5]} 
          speed={1.0}
          phase={0}
          color="#8B5CF6"  // Purple
        />
        <LEDJellyfish 
          initialPosition={[-6, -3, -8]} 
          speed={0.7}
          phase={Math.PI}
          color="#00F0FF"  // Cyan
        />
        <LEDJellyfish 
          initialPosition={[0, 0, -10]} 
          speed={1.3}
          phase={Math.PI / 2}
          color="#8B5CF6"  // Purple
        />
        
        {/* GREEN TURTLES */}
        <LEDTurtle 
          initialPosition={[-10, 0, -6]} 
          speed={0.5}
          phase={0}
        />
        <LEDTurtle 
          initialPosition={[8, -2, -12]} 
          speed={0.6}
          phase={Math.PI / 3}
        />
        
        {/* BLUE MANTA RAYS */}
        <LEDMantaRay 
          initialPosition={[12, 4, -8]} 
          speed={0.4}
          phase={0}
        />
        <LEDMantaRay 
          initialPosition={[-8, -4, -15]} 
          speed={0.45}
          phase={Math.PI / 2}
        />
        
        {/* Water splash effect */}
        <WaterSplash ripples={ripples} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, 10]} intensity={0.5} color="#ffffff" />
        
        {/* Bloom post-processing for LED glow */}
        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
