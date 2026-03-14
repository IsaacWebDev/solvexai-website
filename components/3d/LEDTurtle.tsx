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

  // Turtle constellation pattern
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
    { position: new THREE.Vector3(0.5, 0.5, 0.3), connections: [14, 15, 17] },
    { position: new THREE.Vector3(0, 0.5, 0.5), connections: [15, 16] },
    { position: new THREE.Vector3(-0.5, 0.5, 0.3), connections: [16, 17] },
    { position: new THREE.Vector3(-0.5, 0.5, -0.3), connections: [17, 18] },
    { position: new THREE.Vector3(0, 0.5, 0), connections: [18, 19] },  // Center
    { position: new THREE.Vector3(0, 0.5, -0.5), connections: [19, 13] },
    { position: new THREE.Vector3(0.5, 0.5, -0.3), connections: [13] },
    
    // Flippers (front left)
    { position: new THREE.Vector3(0.8, -0.2, 1), connections: [21, 22] },
    { position: new THREE.Vector3(1, -0.3, 1.3), connections: [22] },
    { position: new THREE.Vector3(1.2, -0.4, 1.5), connections: [] },
    
    // Flippers (front right)
    { position: new THREE.Vector3(0.8, -0.2, -1), connections: [24, 25] },
    { position: new THREE.Vector3(1, -0.3, -1.3), connections: [25] },
    { position: new THREE.Vector3(1.2, -0.4, -1.5), connections: [] },
    
    // Flippers (back left)
    { position: new THREE.Vector3(-0.8, -0.2, 0.8), connections: [27, 28] },
    { position: new THREE.Vector3(-1, -0.3, 1.1), connections: [28] },
    { position: new THREE.Vector3(-1.2, -0.4, 1.3), connections: [] },
    
    // Flippers (back right)
    { position: new THREE.Vector3(-0.8, -0.2, -0.8), connections: [30, 31] },
    { position: new THREE.Vector3(-1, -0.3, -1.1), connections: [31] },
    { position: new THREE.Vector3(-1.2, -0.4, -1.3), connections: [] },
    
    // Tail
    { position: new THREE.Vector3(-1.5, 0, 0), connections: [] },
  ];

  useFrame((state, delta) => {
    time.current += delta * speed;
    
    if (groupRef.current) {
      // Swimming motion (forward + up/down)
      groupRef.current.position.x = initialPosition[0] + Math.sin(time.current * 0.3 + phase) * 5;
      groupRef.current.position.y = initialPosition[1] + Math.cos(time.current * 0.4 + phase) * 1.5;
      
      // Gentle rotation (swimming angle)
      groupRef.current.rotation.z = Math.sin(time.current * 0.3 + phase) * 0.2;
      groupRef.current.rotation.y = Math.sin(time.current * 0.2 + phase) * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={initialPosition} scale={0.5}>
      <LEDConstellation
        points={turtlePoints}
        color="#00FF88"  // Green
        glowIntensity={2.0}
        lineWidth={0.03}
        dotSize={0.09}
      />
    </group>
  );
};
