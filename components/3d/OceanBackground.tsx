'use client';

import { useState, useRef, useEffect } from 'react';
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

const WaterSplash = ({ ripples }: WaterSplashProps) => {
  const [activeRipples, setActiveRipples] = useState<Ripple[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    if (ripples.length > 0) {
      setActiveRipples(prev => [...prev, ...ripples]);
    }
  }, [ripples]);

  useEffect(() => {
    ripplesRef.current = activeRipples;
  }, [activeRipples]);

  useFrame((state, delta) => {
    // Update ripples
    const updated = ripplesRef.current.map(ripple => ({
      ...ripple,
      radius: ripple.radius + ripple.speed * delta * 10,
      opacity: Math.max(0, ripple.opacity - delta * 0.5)
    })).filter(r => r.opacity > 0 && r.radius < r.maxRadius);

    if (updated.length !== ripplesRef.current.length) {
      setActiveRipples(updated);
    }
  });

  return (
    <>
      {activeRipples.map((ripple, i) => {
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
            key={`${i}-${ripple.position.x}-${ripple.position.y}`}
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
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;

    // Get click position relative to canvas
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Convert to 3D world position
    const position = new THREE.Vector3(x * 10, 0, y * 10);

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

    setRipples(newRipples);
  };

  return (
    <div 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
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
