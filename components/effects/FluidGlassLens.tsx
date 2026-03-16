/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

function Lens() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, camera, size } = useThree();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Capture webpage as texture
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateTexture = () => {
      canvas.width = size.width;
      canvas.height = size.height;
      
      // This won't work due to CORS, but we'll use a different approach
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    };

    updateTexture();
    const interval = setInterval(updateTexture, 100);
    return () => clearInterval(interval);
  }, [size]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const v = viewport.getCurrentViewport(camera, [0, 0, 5]);
    
    // Smooth mouse following
    const destX = (mouseX.current * v.width) / 2;
    const destY = (mouseY.current * v.height) / 2;
    easing.damp3(meshRef.current.position, [destX, destY, 0], 0.2, delta);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Sphere for lens effect (not cylinder) */}
      <sphereGeometry args={[0.8, 64, 64]} />
      <MeshTransmissionMaterial
        // EXACT ReactBits glass settings
        background={texture || undefined}
        backside={false}
        samples={16}
        resolution={1024}
        transmission={1}
        roughness={0}
        thickness={0.5}
        ior={1.45}
        chromaticAberration={0.03}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        color="#ffffff"
      />
      {/* Add ring border */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.78, 0.82, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </mesh>
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
      style={{ mixBlendMode: 'screen' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Lens />
      </Canvas>
    </div>
  );
}
