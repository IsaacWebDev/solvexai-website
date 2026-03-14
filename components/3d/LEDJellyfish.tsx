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
      // Floating motion
      groupRef.current.position.y = initialPosition[1] + Math.sin(time.current * 0.5 + phase) * 2;
      groupRef.current.position.x = initialPosition[0] + Math.cos(time.current * 0.3 + phase) * 3;
      
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(time.current * 0.2 + phase) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={initialPosition} scale={0.5}>
      <LEDConstellation
        points={jellyfishPoints}
        color={color}
        glowIntensity={2.5}
        lineWidth={0.025}
        dotSize={0.08}
      />
    </group>
  );
};
