'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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
    const numPoints = 400;  // 2x more points for smoother helix
    const height = 40;      // 2x taller to cover both sections
    const radius = 2;

    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * height;
      const angle = (i / numPoints) * Math.PI * 16; // 8 full rotations (2x more)

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
    <group ref={groupRef} rotation={[0, 0, Math.PI / 12]} position={[0, 10, 0]}>  {/* Moved up to start earlier */}
      {/* DNA Strands - ULTRA-REALISTIC with subsurface scattering */}
      {points.map((point, i) => (
        <group key={i} position={point}>
          {/* Main sphere - glass-like with subsurface scattering */}
          <mesh>
            <sphereGeometry args={[0.08, 64, 64]} />  {/* 4x smoother geometry */}
            <meshPhysicalMaterial
              color={
                i % 3 === 0 ? '#8B5CF6' :  // Purple
                i % 3 === 1 ? '#3B82F6' :  // Blue
                '#00F0FF'  // Cyan
              }
              transmission={0.9}  // Glass-like transparency
              thickness={0.5}
              roughness={0.1}
              metalness={0.1}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              ior={1.5}  // Index of refraction (realistic glass)
              emissive={
                i % 3 === 0 ? '#8B5CF6' :
                i % 3 === 1 ? '#3B82F6' :
                '#00F0FF'
              }
              emissiveIntensity={2.0}  // Stronger neon glow
            />
          </mesh>
          
          {/* Volumetric glow aura */}
          <mesh scale={1.5}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshBasicMaterial
              color={
                i % 3 === 0 ? '#8B5CF6' :
                i % 3 === 1 ? '#3B82F6' :
                '#00F0FF'
              }
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}  // Neon glow effect
            />
          </mesh>
        </group>
      ))}

      {/* Connecting bars (rungs) - Ultra-realistic */}
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
          <group key={`rung-${i}`} position={midPoint}>
            {/* Main cylinder - glass material */}
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, length, 16]} />
              <meshPhysicalMaterial
                color="#00F0FF"
                transmission={0.8}
                thickness={0.3}
                roughness={0.1}
                metalness={0.1}
                clearcoat={1.0}
                ior={1.5}
                emissive="#00F0FF"
                emissiveIntensity={1.5}
              />
            </mesh>
            
            {/* Glow aura for rungs */}
            <mesh scale={1.3}>
              <cylinderGeometry args={[0.04, 0.04, length, 8]} />
              <meshBasicMaterial
                color="#00F0FF"
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}

      {/* Realistic Lighting - Spotlights instead of point lights */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#8B5CF6"
        castShadow
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#3B82F6"
        castShadow
      />
      <ambientLight intensity={0.4} />
    </group>
  );
};

export default function DNABackground() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <DNAHelix />
        
        {/* Bloom Post-Processing for HDR glow */}
        <EffectComposer>
          <Bloom
            intensity={2.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
