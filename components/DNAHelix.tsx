'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HelixStrandProps {
  radius: number;
  height: number;
  turns: number;
  color: string;
  offset: number;
}

function HelixStrand({ radius, height, turns, color, offset }: HelixStrandProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const points = 200;
    const positions = new Float32Array(points * 3);
    const colors = new Float32Array(points * 3);
    const colorObj = new THREE.Color(color);
    
    for (let i = 0; i < points; i++) {
      const t = i / points;
      const angle = t * turns * Math.PI * 2 + offset;
      const y = (t - 0.5) * height;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Gradient from bright to dim
      const intensity = 0.5 + Math.sin(t * Math.PI) * 0.5;
      colors[i * 3] = colorObj.r * intensity;
      colors[i * 3 + 1] = colorObj.g * intensity;
      colors[i * 3 + 2] = colorObj.b * intensity;
    }
    
    return { positions, colors };
  }, [radius, height, turns, color, offset]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.003;
      pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionBars({ radius, height, turns }: { radius: number; height: number; turns: number }) {
  const barsRef = useRef<THREE.Group>(null);
  
  const bars = useMemo(() => {
    const barCount = 40;
    const barData = [];
    
    for (let i = 0; i < barCount; i++) {
      const t = i / barCount;
      const angle = t * turns * Math.PI * 2;
      const y = (t - 0.5) * height;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      
      barData.push({ x1, y, z1, x2, z2 });
    }
    
    return barData;
  }, [radius, height, turns]);
  
  useFrame((state) => {
    if (barsRef.current) {
      barsRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <group ref={barsRef}>
      {bars.map((bar, i) => {
        const midX = (bar.x1 + bar.x2) / 2;
        const midZ = (bar.z1 + bar.z2) / 2;
        const length = Math.sqrt(
          Math.pow(bar.x2 - bar.x1, 2) + Math.pow(bar.z2 - bar.z1, 2)
        );
        const angle = Math.atan2(bar.z2 - bar.z1, bar.x2 - bar.x1);
        
        return (
          <mesh key={i} position={[midX, bar.y, midZ]} rotation={[0, angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, length, 8]} />
            <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

interface DNAHelixProps {
  speed?: number;
  opacity?: number;
  mouseParallax?: boolean;
}

function DNAHelixScene({ speed = 1, opacity = 1 }: DNAHelixProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group scale={speed}>
        <HelixStrand
          radius={1.5}
          height={10}
          turns={3}
          color="#00F0FF"
          offset={0}
        />
        <HelixStrand
          radius={1.5}
          height={10}
          turns={3}
          color="#0088FF"
          offset={Math.PI}
        />
        <ConnectionBars radius={1.5} height={10} turns={3} />
      </group>
      
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={opacity * 0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

export default function DNAHelix({ speed = 1, opacity = 0.3, mouseParallax = true }: DNAHelixProps) {
  return (
    <div className="absolute inset-0 z-0" style={{ opacity, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <DNAHelixScene speed={speed} opacity={opacity} />
      </Canvas>
    </div>
  );
}
