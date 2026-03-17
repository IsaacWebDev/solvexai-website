/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

function GlassLens() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();
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
    
    const v = viewport.getCurrentViewport(state.camera, [0, 0, 5]);
    const targetX = (mouse.x * v.width) / 2;
    const targetY = (mouse.y * v.height) / 2;
    
    // Smooth follow with easing
    easing.damp3(meshRef.current.position, [targetX, targetY, 0], 0.2, delta);
  });

  return (
    <>
      {/* Main glass lens sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshTransmissionMaterial
          // Glass properties for maximum refraction
          transmission={1}
          thickness={0.2}
          roughness={0}
          ior={1.5}
          chromaticAberration={0.02}
          anisotropy={0.2}
          distortion={0}
          distortionScale={0}
          temporalDistortion={0}
          // Mirror-like properties
          clearcoat={1}
          clearcoatRoughness={0}
          // Color
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.5}
          // Performance
          samples={6}
          resolution={512}
        />
      </mesh>
    </>
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
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <GlassLens />
      </Canvas>
    </div>
  );
}
