'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (groupRef.current) {
        // Rotate based on scroll (0-360 degrees)
        groupRef.current.rotation.y = latest * Math.PI * 2;
      }
    });
  }, [scrollYProgress]);

  const helixGeometry = () => {
    const points = [];
    const numPoints = 200;
    const height = 20;
    const radius = 2;

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * height;
      const angle = (i / numPoints) * Math.PI * 8; // 4 full rotations

      // Strand 1
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          t - height / 2,
          Math.sin(angle) * radius
        )
      );

      // Strand 2 (opposite side)
      points.push(
        new THREE.Vector3(
          Math.cos(angle + Math.PI) * radius,
          t - height / 2,
          Math.sin(angle + Math.PI) * radius
        )
      );
    }

    return points;
  };

  const points = helixGeometry();

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 12]}>  {/* 15° lean */}
      {/* DNA Strands */}
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={
              i % 3 === 0 ? '#8B5CF6' :  // Purple
              i % 3 === 1 ? '#3B82F6' :  // Blue
              '#00F0FF'  // Cyan
            }
            emissive={
              i % 3 === 0 ? '#8B5CF6' :
              i % 3 === 1 ? '#3B82F6' :
              '#00F0FF'
            }
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connecting bars (rungs) */}
      {points.filter((_, i) => i % 2 === 0).map((point, i) => {
        const oppositePoint = points[i * 2 + 1];
        if (!oppositePoint) return null;

        const midPoint = new THREE.Vector3()
          .addVectors(point, oppositePoint)
          .multiplyScalar(0.5);

        const direction = new THREE.Vector3()
          .subVectors(oppositePoint, point);
        const length = direction.length();

        return (
          <mesh key={`rung-${i}`} position={midPoint}>
            <cylinderGeometry args={[0.03, 0.03, length, 8]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Lighting */}
      <pointLight position={[5, 0, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, 0, -5]} intensity={1} color="#3B82F6" />
      <ambientLight intensity={0.4} />
    </group>
  );
};

export default function DNABackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <DNAHelix />
      </Canvas>
    </div>
  );
}
