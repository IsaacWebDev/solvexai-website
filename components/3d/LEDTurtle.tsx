'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LEDConstellation } from './LEDConstellation';

interface LEDTurtleProps {
  initialPosition?: [number, number, number];
  speed?: number;
  phase?: number;
}

export const LEDTurtle = ({
  initialPosition = [0, 0, 0],
  speed = 1.0,
  phase = 0
}: LEDTurtleProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const particles = useRef<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }>>([]);
  const trail = useRef<THREE.Vector3[]>([]);

  // Turtle constellation pattern (45 points for enhanced detail)
  const turtlePoints = [
    // Head
    { position: new THREE.Vector3(1.5, 0, 0), connections: [1, 2] },
    { position: new THREE.Vector3(1.8, 0.2, 0.2), connections: [3] },
    { position: new THREE.Vector3(1.8, 0.2, -0.2), connections: [3] },
    { position: new THREE.Vector3(2, 0, 0), connections: [] },  // Nose
    
    // Shell outline (oval)
    { position: new THREE.Vector3(1, 0.3, 0.6), connections: [5, 6, 8] },
    { position: new THREE.Vector3(0.3, 0.4, 0.8), connections: [6, 7] },
    { position: new THREE.Vector3(-0.5, 0.4, 0.8), connections: [7, 8] },
    { position: new THREE.Vector3(-1, 0.3, 0.6), connections: [8, 9] },
    { position: new THREE.Vector3(-1.2, 0, 0), connections: [9, 10] },
    { position: new THREE.Vector3(-1, 0.3, -0.6), connections: [10, 11] },
    { position: new THREE.Vector3(-0.5, 0.4, -0.8), connections: [11, 12] },
    { position: new THREE.Vector3(0.3, 0.4, -0.8), connections: [12, 4] },
    { position: new THREE.Vector3(1, 0.3, -0.6), connections: [4] },
    
    // Shell segments (hexagonal pattern)
    { position: new THREE.Vector3(0.5, 0.5, 0.3), connections: [14, 15, 17, 33] },
    { position: new THREE.Vector3(0, 0.5, 0.5), connections: [15, 16, 34] },
    { position: new THREE.Vector3(-0.5, 0.5, 0.3), connections: [16, 17, 35] },
    { position: new THREE.Vector3(-0.5, 0.5, -0.3), connections: [17, 18, 36] },
    { position: new THREE.Vector3(0, 0.5, 0), connections: [18, 19] },  // Center
    { position: new THREE.Vector3(0, 0.5, -0.5), connections: [19, 13] },
    { position: new THREE.Vector3(0.5, 0.5, -0.3), connections: [13] },
    
    // Flippers (front left)
    { position: new THREE.Vector3(0.8, -0.2, 1), connections: [21, 22, 37] },
    { position: new THREE.Vector3(1, -0.3, 1.3), connections: [22, 38] },
    { position: new THREE.Vector3(1.2, -0.4, 1.5), connections: [] },
    
    // Flippers (front right)
    { position: new THREE.Vector3(0.8, -0.2, -1), connections: [24, 25, 39] },
    { position: new THREE.Vector3(1, -0.3, -1.3), connections: [25, 40] },
    { position: new THREE.Vector3(1.2, -0.4, -1.5), connections: [] },
    
    // Flippers (back left)
    { position: new THREE.Vector3(-0.8, -0.2, 0.8), connections: [27, 28, 41] },
    { position: new THREE.Vector3(-1, -0.3, 1.1), connections: [28, 42] },
    { position: new THREE.Vector3(-1.2, -0.4, 1.3), connections: [] },
    
    // Flippers (back right)
    { position: new THREE.Vector3(-0.8, -0.2, -0.8), connections: [30, 31, 43] },
    { position: new THREE.Vector3(-1, -0.3, -1.1), connections: [31, 44] },
    { position: new THREE.Vector3(-1.2, -0.4, -1.3), connections: [] },
    
    // Tail
    { position: new THREE.Vector3(-1.5, 0, 0), connections: [] },
    
    // Inner shell detail (NEW - more hexagons)
    { position: new THREE.Vector3(0.25, 0.45, 0.15), connections: [13, 17] },
    { position: new THREE.Vector3(-0.25, 0.45, 0.15), connections: [14, 16] },
    { position: new THREE.Vector3(-0.25, 0.45, -0.15), connections: [16, 18] },
    { position: new THREE.Vector3(0.25, 0.45, -0.15), connections: [13, 18] },
    
    // Flipper webbing detail (NEW - front left)
    { position: new THREE.Vector3(0.9, -0.25, 1.15), connections: [21] },
    { position: new THREE.Vector3(1.1, -0.35, 1.4), connections: [22] },
    
    // Flipper webbing detail (NEW - front right)
    { position: new THREE.Vector3(0.9, -0.25, -1.15), connections: [24] },
    { position: new THREE.Vector3(1.1, -0.35, -1.4), connections: [25] },
    
    // Flipper webbing detail (NEW - back left)
    { position: new THREE.Vector3(-0.9, -0.25, 0.95), connections: [27] },
    { position: new THREE.Vector3(-1.1, -0.35, 1.2), connections: [28] },
    
    // Flipper webbing detail (NEW - back right)
    { position: new THREE.Vector3(-0.9, -0.25, -0.95), connections: [30] },
    { position: new THREE.Vector3(-1.1, -0.35, -1.2), connections: [31] },
    
    // Eyes (NEW)
    { position: new THREE.Vector3(1.6, 0.15, 0.3), connections: [] },  // Left eye
    { position: new THREE.Vector3(1.6, 0.15, -0.3), connections: [] }, // Right eye
  ];

  useFrame((state, delta) => {
    time.current += delta * speed;
    
    if (groupRef.current) {
      // ULTRA-REALISTIC FLIPPER SWIMMING
      const strokeCycle = (time.current * 0.8 + phase) % (Math.PI * 2);
      const isDownstroke = Math.sin(strokeCycle) > 0;
      
      // Forward momentum (stronger during downstroke)
      const thrust = isDownstroke ? 0.08 : 0.02;
      const direction = new THREE.Vector3(
        Math.cos(groupRef.current.rotation.y),
        0,
        Math.sin(groupRef.current.rotation.y)
      ).normalize();
      
      groupRef.current.position.x += direction.x * thrust;
      groupRef.current.position.z += direction.z * thrust;
      
      // Bobbing motion (natural buoyancy)
      groupRef.current.position.y = initialPosition[1] + Math.sin(time.current * 0.6 + phase) * 1.5;
      
      // Banking into turns
      const turnRate = Math.sin(time.current * 0.2 + phase) * 0.015;
      groupRef.current.rotation.y += turnRate;
      groupRef.current.rotation.z = -turnRate * 5; // Bank angle
      
      // Keep within bounds (circular path)
      const distFromCenter = Math.sqrt(
        groupRef.current.position.x ** 2 + 
        groupRef.current.position.z ** 2
      );
      if (distFromCenter > 8) {
        // Turn back toward center
        const angleToCenter = Math.atan2(-groupRef.current.position.z, -groupRef.current.position.x);
        groupRef.current.rotation.y = angleToCenter;
      }
      
      // BIO-LUMINESCENT PARTICLES (from flippers)
      if (isDownstroke && Math.random() > 0.7) {
        particles.current.push({
          position: groupRef.current.position.clone(),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.15,
            -0.03,
            (Math.random() - 0.5) * 0.15
          ),
          life: 1.5,
          maxLife: 1.5
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
      if (trail.current.length > 8) trail.current.shift();
      
      // Limit particle count
      if (particles.current.length > 15) {
        particles.current = particles.current.slice(-15);
      }
    }
  });

  return (
    <group ref={groupRef} position={initialPosition} scale={1.0}>
      <LEDConstellation
        points={turtlePoints}
        color="#00FF88"  // Green
        glowIntensity={2.0}
        lineWidth={0.03}
        dotSize={0.09}
      />
      
      {/* Render particles */}
      {particles.current.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial 
            color="#00FF88" 
            transparent 
            opacity={particle.life / particle.maxLife}
          />
        </mesh>
      ))}
    </group>
  );
};
