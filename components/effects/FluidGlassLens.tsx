/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { easing } from 'maath';

function Lens() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const v = viewport.getCurrentViewport(state.camera, [0, 0, 5]);
    
    // Smooth mouse following
    const destX = (mouseX.current * v.width) / 2;
    const destY = (mouseY.current * v.height) / 2;
    easing.damp3(meshRef.current.position, [destX, destY, 0], 0.2, delta);
  });

  return (
    <group>
      {/* Glass sphere with refraction */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0}
          ior={1.5}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Visible ring border */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[1.15, 1.25, 64]} />
        <meshBasicMaterial 
          color="#8B5CF6" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh position={[0, 0, -0.05]}>
        <ringGeometry args={[1.25, 1.5, 64]} />
        <meshBasicMaterial 
          color="#3B82F6" 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function FluidGlassLens() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
    >
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          alpha: true,
          antialias: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Lens />
      </Canvas>
    </div>
  );
}
