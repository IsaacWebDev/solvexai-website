'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface ConstellationPoint {
  position: THREE.Vector3;
  connections: number[];  // Indices of connected points
}

interface LEDConstellationProps {
  points: ConstellationPoint[];
  color: string;
  glowIntensity?: number;
  lineWidth?: number;
  dotSize?: number;
}

export const LEDConstellation = ({
  points,
  color,
  glowIntensity = 2.0,
  lineWidth = 0.02,
  dotSize = 0.08
}: LEDConstellationProps) => {
  return (
    <>
      {/* Dots (LED points) */}
      {points.map((point, i) => (
        <group key={`dot-${i}`} position={point.position}>
          {/* Core dot */}
          <mesh>
            <sphereGeometry args={[dotSize, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={glowIntensity}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Glow aura */}
          <mesh scale={1.5}>
            <sphereGeometry args={[dotSize, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Lines (connecting LED points) */}
      {points.map((point, i) =>
        point.connections.map((connIdx) => {
          if (connIdx <= i) return null; // Avoid duplicate lines
          
          const endPoint = points[connIdx];
          return (
            <Line
              key={`line-${i}-${connIdx}`}
              points={[point.position, endPoint.position]}
              color={color}
              lineWidth={lineWidth}
              transparent
              opacity={0.6}
            />
          );
        })
      )}

      {/* Point light for glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1}
        color={color}
        distance={10}
      />
    </>
  );
};
