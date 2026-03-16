/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
 useFBO,
 MeshTransmissionMaterial,
} from '@react-three/drei';
import { easing } from 'maath';

// Simple cylinder geometry as lens (matches ReactBits lens.glb shape)
function Lens({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Mesh>(null);
  const buffer = useFBO();
  const { viewport, camera, gl } = useThree();
  const [scene] = useState(() => new THREE.Scene());
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
    if (!ref.current) return;
    
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    
    // Follow mouse with smooth easing (exact ReactBits behavior)
    const destX = (mouseX.current * v.width) / 2;
    const destY = (mouseY.current * v.height) / 2;
    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
    
    // Auto-scale to fit viewport
    const maxWorld = v.width * 0.9;
    const desired = maxWorld / 1;
    ref.current.scale.setScalar(Math.min(0.25, desired));
    
    // Render scene to FBO buffer
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return (
    <>
      {/* Portal children into separate scene for refraction */}
      {createPortal(children, scene)}
      
      {/* Background plane showing buffer texture */}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      
      {/* Glass lens cylinder (matches ReactBits lens geometry) */}
      <mesh 
        ref={ref} 
        scale={0.25} 
        rotation-x={Math.PI / 2}
      >
        <cylinderGeometry args={[1, 1, 0.5, 64]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={1.15}
          thickness={5}
          anisotropy={0.01}
          chromaticAberration={0.1}
          transmission={1}
          roughness={0}
          color="#ffffff"
          attenuationColor="#ffffff"
          attenuationDistance={0.25}
        />
      </mesh>
    </>
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
      style={{ mixBlendMode: 'normal' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 15 }} 
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Lens>
          {/* Empty - lens refracts background content */}
        </Lens>
      </Canvas>
    </div>
  );
}
