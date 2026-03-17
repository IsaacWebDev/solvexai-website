/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
 useFBO,
 useGLTF,
 MeshTransmissionMaterial,
 Environment
} from '@react-three/drei';
import { easing } from 'maath';

const ModeWrapper = memo(function ModeWrapper({
 children,
 glb,
 geometryKey,
 followPointer = true,
 modeProps = {},
}: any) {
 const ref = useRef<THREE.Mesh>(null);
 const { nodes } = useGLTF(glb);
 const buffer = useFBO();
 const { viewport: vp } = useThree();
 const [scene] = useState(() => new THREE.Scene());

 useFrame((state, delta) => {
 if (!ref.current) return;
   
 const { gl, viewport, pointer, camera } = state;
 const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

 const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
 const destY = followPointer ? (pointer.y * v.height) / 2 : 0;
 easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

 if (modeProps.scale == null) {
 const maxWorld = v.width * 0.9;
 ref.current.scale.setScalar(Math.min(0.25, maxWorld));
 } else {
   ref.current.scale.setScalar(modeProps.scale);
 }

 gl.setRenderTarget(buffer);
 gl.render(scene, camera);
 gl.setRenderTarget(null);
 });

 const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;
 const geometry = (nodes as any)[geometryKey]?.geometry;

 return (
 <>
 {createPortal(children, scene)}
 <mesh scale={[vp.width, vp.height, 1]}>
 <planeGeometry />
 <meshBasicMaterial map={buffer.texture} transparent />
 </mesh>
 {geometry && (
 <mesh ref={ref} rotation-x={Math.PI / 2} geometry={geometry}>
 <MeshTransmissionMaterial
 buffer={buffer.texture}
 ior={ior ?? 1.15}
 thickness={thickness ?? 2}
 anisotropy={anisotropy ?? 0.01}
 chromaticAberration={chromaticAberration ?? 0.05}
 transmission={1}
 roughness={0}
 clearcoat={1}
 clearcoatRoughness={0}
 samples={6}
 resolution={512}
 {...extraMat}
 />
 </mesh>
 )}
 </>
 );
});

function Lens({ modeProps, ...p }: any) {
 return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

export default function FluidGlass({ 
  mode = 'lens',
  lensProps = {
    scale: 0.25,
    ior: 1.15,
    thickness: 2,
    chromaticAberration: 0.05,
    anisotropy: 0.01
  }
}: any) {
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
     toneMapping: THREE.ACESFilmicToneMapping,
     toneMappingExposure: 1
   }}
 >
 <Environment preset="city" />
 <ambientLight intensity={0.5} />
 <directionalLight position={[10, 10, 5]} intensity={1} />
 <Lens modeProps={lensProps} />
 </Canvas>
 </div>
 );
}
