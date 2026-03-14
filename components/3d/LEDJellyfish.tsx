'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LEDConstellation } from './LEDConstellation';

interface LEDJellyfishProps {
  initialPosition?: [number, number, number];
  speed?: number;
  phase?: number;
  color?: string;
}

export const LEDJellyfish = ({
  initialPosition = [0, 0, 0],
  speed = 1.0,
  phase = 0,
  color = '#8B5CF6'  // Purple
}: LEDJellyfishProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const particles = useRef<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }>>([]);

  // Jellyfish constellation pattern
  const jellyfishPoints = [
    // Dome top
    { position: new THREE.Vector3(0, 1.5, 0), connections: [1, 2, 3, 4] },
    
    // Dome ring 1
    { position: new THREE.Vector3(0.5, 1.2, 0), connections: [5, 6] },
    { position: new THREE.Vector3(0, 1.2, 0.5), connections: [6, 7] },
    { position: new THREE.Vector3(-0.5, 1.2, 0), connections: [7, 8] },
    { position: new THREE.Vector3(0, 1.2, -0.5), connections: [8, 5] },
    
    // Dome ring 2
    { position: new THREE.Vector3(1, 0.8, 0), connections: [9, 10] },
    { position: new THREE.Vector3(0, 0.8, 1), connections: [10, 11] },
    { position: new THREE.Vector3(-1, 0.8, 0), connections: [11, 12] },
    { position: new THREE.Vector3(0, 0.8, -1), connections: [12, 9] },
    
    // Dome bottom
    { position: new THREE.Vector3(1.2, 0.4, 0), connections: [13, 14] },
    { position: new THREE.Vector3(0, 0.4, 1.2), connections: [14, 15] },
    { position: new THREE.Vector3(-1.2, 0.4, 0), connections: [15, 16] },
    { position: new THREE.Vector3(0, 0.4, -1.2), connections: [16, 13] },
    
    // Tentacle roots
    { position: new THREE.Vector3(1, 0, 0), connections: [17] },
    { position: new THREE.Vector3(0.7, 0, 0.7), connections: [18] },
    { position: new THREE.Vector3(0, 0, 1), connections: [19] },
    { position: new THREE.Vector3(-0.7, 0, 0.7), connections: [20] },
    { position: new THREE.Vector3(-1, 0, 0), connections: [21] },
    { position: new THREE.Vector3(-0.7, 0, -0.7), connections: [22] },
    { position: new THREE.Vector3(0, 0, -1), connections: [23] },
    { position: new THREE.Vector3(0.7, 0, -0.7), connections: [24] },
    
    // Tentacle middle
    { position: new THREE.Vector3(1, -1, 0), connections: [25] },
    { position: new THREE.Vector3(0.7, -1, 0.7), connections: [26] },
    { position: new THREE.Vector3(0, -1, 1), connections: [27] },
    { position: new THREE.Vector3(-0.7, -1, 0.7), connections: [28] },
    { position: new THREE.Vector3(-1, -1, 0), connections: [29] },
    { position: new THREE.Vector3(-0.7, -1, -0.7), connections: [30] },
    { position: new THREE.Vector3(0, -1, -1), connections: [31] },
    { position: new THREE.Vector3(0.7, -1, -0.7), connections: [32] },
    
    // Tentacle ends
    { position: new THREE.Vector3(1, -2, 0), connections: [] },
    { position: new THREE.Vector3(0.7, -2, 0.7), connections: [] },
    { position: new THREE.Vector3(0, -2, 1), connections: [] },
    { position: new THREE.Vector3(-0.7, -2, 0.7), connections: [] },
    { position: new THREE.Vector3(-1, -2, 0), connections: [] },
    { position: new THREE.Vector3(-0.7, -2, -0.7), connections: [] },
    { position: new THREE.Vector3(0, -2, -1), connections: [] },
    { position: new THREE.Vector3(0.7, -2, -0.7), connections: [] },
  ];

  useFrame((state, delta) => {
    time.current += delta * speed;
    
    if (groupRef.current) {
      // ULTRA-REALISTIC PULSING
      const pulse = Math.sin(time.current * 1.2 + phase);
      const pulseStrength = (pulse + 1) / 2; // 0 to 1
      
      // Body pulsing (expand/contract 15%)
      const bodyScale = 1 + (pulse * 0.15);
      groupRef.current.scale.set(bodyScale * 0.5, bodyScale * 0.5, bodyScale * 0.5);
      
      // Upward propulsion on pulse
      const propulsion = pulseStrength * 0.05;
      groupRef.current.position.y += propulsion;
      
      // Drift (slow fall between pulses)
      groupRef.current.position.y -= 0.01 * (1 - pulseStrength);
      
      // Horizontal drift
      groupRef.current.position.x = initialPosition[0] + Math.cos(time.current * 0.3 + phase) * 3;
      
      // Gentle rotation (current flow)
      groupRef.current.rotation.y = Math.sin(time.current * 0.15 + phase) * 0.2;
      
      // TENTACLE WAVE ANIMATION (compound sine waves)
      // Note: In LED constellation, we can't animate individual points dynamically
      // This would require shader-based or instance-based animation
      // For now, the pulsing body creates the illusion of tentacle movement
      
      // BIO-LUMINESCENT PARTICLES
      if (Math.random() > 0.85) {
        particles.current.push({
          position: groupRef.current.position.clone(),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            -0.05,
            (Math.random() - 0.5) * 0.1
          ),
          life: 2.0,
          maxLife: 2.0
        });
      }
      
      // Update particles
      particles.current = particles.current.filter(p => {
        p.position.add(p.velocity);
        p.life -= delta;
        return p.life > 0;
      });
      
      // Limit particle count for performance
      if (particles.current.length > 20) {
        particles.current = particles.current.slice(-20);
      }
    }
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      <LEDConstellation
        points={jellyfishPoints}
        color={color}
        glowIntensity={2.5 + Math.sin(time.current * 1.2 + phase) * 0.5}
        lineWidth={0.025}
        dotSize={0.08}
      />
      
      {/* Render particles */}
      {particles.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={particle.life / particle.maxLife}
          />
        </mesh>
      ))}
    </group>
  );
};
