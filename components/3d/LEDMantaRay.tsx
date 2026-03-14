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
    
    if (groupRef.current) {
      // Gliding motion
      groupRef.current.position.x = initialPosition[0] + Math.sin(time.current * 0.2 + phase) * 6;
      groupRef.current.position.y = initialPosition[1] + Math.cos(time.current * 0.35 + phase) * 2;
      
      // Wing flap simulation (scale Y)
      if (wingRef.current) {
        wingRef.current.scale.y = 1 + Math.sin(time.current * 1.5 + phase) * 0.15;
      }
      
      // Banking rotation
      groupRef.current.rotation.z = Math.sin(time.current * 0.2 + phase) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={initialPosition} scale={0.5}>
      <group ref={wingRef}>
        <LEDConstellation
          points={mantaPoints}
          color="#00A3FF"  // Blue
          glowIntensity={2.2}
          lineWidth={0.028}
          dotSize={0.085}
        />
      </group>
    </group>
  );
};
