'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Jellyfish = () => {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    
    if (groupRef.current) {
      // Floating motion (sine wave)
      groupRef.current.position.y = Math.sin(time.current * 0.5) * 2;
      groupRef.current.position.x = Math.cos(time.current * 0.3) * 3;
      
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(time.current * 0.2) * 0.3;
    }
  });

  // Jellyfish body (dome)
  const bodyGeometry = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);

  // Tentacles
  const tentacles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 1.2;
    
    return {
      x: Math.cos(angle) * radius,
      z: Math.sin(angle) * radius,
      phase: i * 0.5
    };
  });

  return (
    <group ref={groupRef} position={[8, 0, -5]}>
      {/* Body */}
      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Inner glow */}
      <mesh geometry={bodyGeometry} scale={0.9}>
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Tentacles */}
      {tentacles.map((t, i) => (
        <Tentacle key={i} x={t.x} z={t.z} phase={t.phase} />
      ))}

      {/* Lighting */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#8B5CF6" distance={10} />
    </group>
  );
};

const Tentacle = ({ x, z, phase }: { x: number; z: number; phase: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    
    if (ref.current) {
      // Wave motion
      ref.current.rotation.x = Math.sin(time.current * 2 + phase) * 0.3;
      ref.current.rotation.z = Math.cos(time.current * 1.5 + phase) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[x, -1, z]}>
      <cylinderGeometry args={[0.08, 0.02, 4, 8]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
};

export default function JellyfishBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <Jellyfish />
        <ambientLight intensity={0.3} />
      </Canvas>
    </div>
  );
}
