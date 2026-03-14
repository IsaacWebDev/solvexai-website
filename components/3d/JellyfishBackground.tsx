'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const Jellyfish = ({ 
  initialPosition = [8, 0, -5], 
  speed = 1.0,
  phase = 0
}: { 
  initialPosition?: [number, number, number];
  speed?: number;
  phase?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const [particles, setParticles] = useState<Array<{
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    life: number;
  }>>([]);

  useFrame((state, delta) => {
    time.current += delta * speed;  // Speed multiplier
    
    if (groupRef.current) {
      // Floating motion (sine wave) - use initial position as base
      groupRef.current.position.y = initialPosition[1] + Math.sin(time.current * 0.5 + phase) * 2;
      groupRef.current.position.x = initialPosition[0] + Math.cos(time.current * 0.3 + phase) * 3;
      
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(time.current * 0.2 + phase) * 0.3;
    }

    // Emit bioluminescent particles
    if (Math.random() > 0.8 && groupRef.current) {
      setParticles(prev => [...prev, {
        position: groupRef.current!.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          -0.05,
          (Math.random() - 0.5) * 0.1
        ),
        life: 2.0
      }].slice(-50)); // Keep max 50 particles
    }

    // Update particles
    setParticles(prev => prev
      .map(p => ({
        ...p,
        position: p.position.clone().add(p.velocity),
        life: p.life - delta
      }))
      .filter(p => p.life > 0)
    );
  });

  // Jellyfish body (dome)
  const bodyGeometry = new THREE.SphereGeometry(1.5, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2);

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

  // Subsurface veins (internal structure)
  const veins = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return {
      start: new THREE.Vector3(0, 0, 0),
      end: new THREE.Vector3(
        Math.cos(angle) * 1.2,
        -0.5,
        Math.sin(angle) * 1.2
      )
    };
  });

  return (
    <group ref={groupRef} position={initialPosition}>
      {/* Body - ULTRA-REALISTIC with subsurface scattering */}
      <mesh geometry={bodyGeometry}>
        <meshPhysicalMaterial
          color="#8B5CF6"
          transmission={0.95}  // Almost transparent
          thickness={2.0}
          roughness={0.05}
          metalness={0.0}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.33}  // Water-like refraction
          emissive="#8B5CF6"
          emissiveIntensity={3.0}  // Strong bioluminescence
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Volumetric glow aura (outer) */}
      <mesh geometry={bodyGeometry} scale={1.3}>
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner glow (core) */}
      <mesh geometry={bodyGeometry} scale={0.9}>
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Subsurface veins (internal glowing structure) */}
      {veins.map((vein, i) => (
        <Line
          key={`vein-${i}`}
          points={[vein.start, vein.end]}
          color="#00F0FF"
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}

      {/* Tentacles */}
      {tentacles.map((t, i) => (
        <Tentacle key={i} x={t.x} z={t.z} phase={t.phase} />
      ))}

      {/* Bio-luminescent particle trail */}
      {particles.map((particle, i) => (
        <mesh key={`particle-${i}`} position={particle.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={particle.life / 2.0}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
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
      // Procedural compound wave motion (more realistic)
      ref.current.rotation.x = 
        Math.sin(time.current * 2 + phase) * 0.4 +
        Math.sin(time.current * 3.5 + phase * 1.3) * 0.15;
      
      ref.current.rotation.z = 
        Math.cos(time.current * 1.8 + phase) * 0.3 +
        Math.cos(time.current * 2.7 + phase * 0.8) * 0.12;
    }
  });

  return (
    <group>
      {/* Main tentacle - translucent */}
      <mesh ref={ref} position={[x, -1, z]}>
        <cylinderGeometry args={[0.08, 0.02, 4, 16]} />
        <meshPhysicalMaterial
          color="#3B82F6"
          transmission={0.7}
          thickness={0.5}
          roughness={0.1}
          ior={1.33}
          emissive="#3B82F6"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Tentacle glow aura */}
      <mesh ref={ref} position={[x, -1, z]} scale={1.2}>
        <cylinderGeometry args={[0.1, 0.03, 4, 8]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default function JellyfishBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        {/* Jellyfish 1 - Top Right (fast) */}
        <Jellyfish 
          initialPosition={[8, 2, -5]} 
          speed={1.0}
          phase={0}
        />
        
        {/* Jellyfish 2 - Bottom Left (slow) */}
        <Jellyfish 
          initialPosition={[-6, -3, -8]} 
          speed={0.7}
          phase={Math.PI}
        />
        
        {/* Jellyfish 3 - Center (medium) */}
        <Jellyfish 
          initialPosition={[0, 0, -10]} 
          speed={1.3}
          phase={Math.PI / 2}
        />
        
        <ambientLight intensity={0.3} />
        
        {/* Bloom Post-Processing for bioluminescent glow */}
        <EffectComposer>
          <Bloom
            intensity={2.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            radius={1.0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
