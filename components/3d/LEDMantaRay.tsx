'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LEDConstellation } from './LEDConstellation';

interface LEDMantaRayProps {
  initialPosition?: [number, number, number];
  speed?: number;
  phase?: number;
}

export const LEDMantaRay = ({
  initialPosition = [0, 0, 0],
  speed = 1.0,
  phase = 0
}: LEDMantaRayProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const wingRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const particles = useRef<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }>>([]);
  const trail = useRef<THREE.Vector3[]>([]);

  // Manta ray constellation pattern
  const mantaPoints = [
    // Head/Body center
    { position: new THREE.Vector3(0, 0, 2), connections: [1, 2, 3, 4] },
    
    // Body segments
    { position: new THREE.Vector3(0, 0, 1), connections: [5, 6, 7, 8] },
    { position: new THREE.Vector3(0, 0, 0), connections: [9, 10, 11, 12] },
    { position: new THREE.Vector3(0, 0, -1), connections: [13, 14] },
    { position: new THREE.Vector3(0, 0, -1.5), connections: [] },  // Tail
    
    // Left wing (front to back)
    { position: new THREE.Vector3(1, 0.1, 1.5), connections: [6, 9] },
    { position: new THREE.Vector3(2, 0.2, 1), connections: [7, 10] },
    { position: new THREE.Vector3(3, 0.2, 0.5), connections: [8, 11] },
    { position: new THREE.Vector3(3.5, 0.1, 0), connections: [12] },
    
    // Left wing edge
    { position: new THREE.Vector3(1.5, 0.2, 1.2), connections: [10] },
    { position: new THREE.Vector3(2.5, 0.3, 0.8), connections: [11] },
    { position: new THREE.Vector3(3.2, 0.2, 0.3), connections: [12] },
    { position: new THREE.Vector3(3.5, 0, -0.3), connections: [] },
    
    // Right wing (front to back)
    { position: new THREE.Vector3(-1, 0.1, 1.5), connections: [14, 17] },
    { position: new THREE.Vector3(-2, 0.2, 1), connections: [15, 18] },
    { position: new THREE.Vector3(-3, 0.2, 0.5), connections: [16, 19] },
    { position: new THREE.Vector3(-3.5, 0.1, 0), connections: [20] },
    
    // Right wing edge
    { position: new THREE.Vector3(-1.5, 0.2, 1.2), connections: [18] },
    { position: new THREE.Vector3(-2.5, 0.3, 0.8), connections: [19] },
    { position: new THREE.Vector3(-3.2, 0.2, 0.3), connections: [20] },
    { position: new THREE.Vector3(-3.5, 0, -0.3), connections: [] },
    
    // Head details (eyes + mouth)
    { position: new THREE.Vector3(0.5, 0.1, 2.2), connections: [] },  // Left eye
    { position: new THREE.Vector3(-0.5, 0.1, 2.2), connections: [] }, // Right eye
    { position: new THREE.Vector3(0, -0.2, 2.5), connections: [] },   // Mouth center
  ];

  useFrame((state, delta) => {
    time.current += delta * speed;
    
    if (groupRef.current && wingRef.current) {
      // ULTRA-REALISTIC WING UNDULATION
      const waveSpeed = 2.0;
      const wavePhase = time.current * waveSpeed + phase;
      
      // Wing wave (vertical undulation)
      wingRef.current.scale.y = 1 + Math.sin(wavePhase) * 0.25;
      
      // Gliding physics
      const lift = Math.abs(Math.sin(wavePhase)) * 0.03;
      groupRef.current.position.y += lift;
      
      // Maintain altitude (gentle drift down when not flapping)
      groupRef.current.position.y -= 0.008 * (1 - Math.abs(Math.sin(wavePhase)));
      
      // Forward momentum (stronger on downstroke)
      const thrust = Math.sin(wavePhase) > 0 ? 0.06 : 0.02;
      groupRef.current.position.x += Math.cos(groupRef.current.rotation.y) * thrust;
      groupRef.current.position.z += Math.sin(groupRef.current.rotation.y) * thrust;
      
      // Banking turns (smooth S-curves)
      const bankCycle = Math.sin(time.current * 0.15 + phase);
      groupRef.current.rotation.y += bankCycle * 0.02;
      groupRef.current.rotation.z = bankCycle * 0.4; // Bank angle
      
      // Keep within bounds (figure-8 pattern)
      const distFromCenter = Math.sqrt(
        groupRef.current.position.x ** 2 + 
        groupRef.current.position.z ** 2
      );
      if (distFromCenter > 10) {
        const angleToCenter = Math.atan2(-groupRef.current.position.z, -groupRef.current.position.x);
        groupRef.current.rotation.y = angleToCenter;
      }
      
      // BIO-LUMINESCENT PARTICLES (wing tips on downstroke)
      if (Math.sin(wavePhase) > 0 && Math.random() > 0.75) {
        particles.current.push({
          position: groupRef.current.position.clone().add(
            new THREE.Vector3(
              Math.random() > 0.5 ? 1.5 : -1.5,
              0,
              0.5
            )
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.08,
            -0.04,
            (Math.random() - 0.5) * 0.08
          ),
          life: 2.5,
          maxLife: 2.5
        });
      }
      
      // Update particles
      particles.current = particles.current.filter(p => {
        p.position.add(p.velocity);
        p.life -= delta;
        return p.life > 0;
      });
      
      // Motion blur trail
      trail.current.push(groupRef.current.position.clone());
      if (trail.current.length > 10) trail.current.shift();
      
      // Limit particle count
      if (particles.current.length > 25) {
        particles.current = particles.current.slice(-25);
      }
    }
  });

  return (
    <group ref={groupRef} position={initialPosition} scale={0.5}>
      <group ref={wingRef}>
        <LEDConstellation
          points={mantaPoints}
          color="#00A3FF"  // Blue
          glowIntensity={2.2 + Math.sin(time.current * 2.0 + phase) * 0.3}
          lineWidth={0.028}
          dotSize={0.085}
        />
      </group>
      
      {/* Render particles */}
      {particles.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial 
            color="#00A3FF" 
            transparent 
            opacity={particle.life / particle.maxLife * 0.8}
          />
        </mesh>
      ))}
    </group>
  );
};
