/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { easing } from 'maath';

function Lens() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF('/assets/3d/lens.glb');
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const v = viewport.getCurrentViewport(state.camera, [0, 0, 15]);
    const targetX = (mouse.x * v.width) / 2;
    const targetY = (mouse.y * v.height) / 2;
    
    easing.damp3(meshRef.current.position, [targetX, targetY, 15], 0.15, delta);
  });

  const geometry = (nodes as any).Cylinder?.geometry;
  
  if (!geometry) return null;

  return (
    <mesh ref={meshRef} rotation-x={Math.PI / 2} geometry={geometry} scale={0.25}>
      <meshPhysicalMaterial
        transmission={0.95}
        thickness={0.2}
        roughness={0}
        ior={1.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        transparent={true}
        opacity={0.9}
        color="#ffffff"
      />
    </mesh>
  );
}

export default function FluidGlass() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Lens />
      </Canvas>
    </div>
  );
}
