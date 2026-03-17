/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
 useFBO,
 useGLTF,
 MeshTransmissionMaterial,
} from '@react-three/drei';
import { easing } from 'maath';

const ModeWrapper = memo(function ModeWrapper({
 children,
 glb,
 geometryKey,
 lockToBottom = false,
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
 const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
 easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

 if (modeProps.scale == null) {
 const maxWorld = v.width * 0.9;
 ref.current.scale.setScalar(Math.min(0.25, maxWorld));
 }

 gl.setRenderTarget(buffer);
 gl.render(scene, camera);
 gl.setRenderTarget(null);
 });

 const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

 return (
 <>
 {createPortal(children, scene)}
 <mesh scale={[vp.width, vp.height, 1]}>
 <planeGeometry />
 <meshBasicMaterial map={buffer.texture} transparent />
 </mesh>
 <mesh ref={ref} scale={scale ?? 0.25} rotation-x={Math.PI / 2} geometry={(nodes as any)[geometryKey]?.geometry}>
 <MeshTransmissionMaterial
 buffer={buffer.texture}
 ior={ior ?? 1.15}
 thickness={thickness ?? 5}
 anisotropy={anisotropy ?? 0.01}
 chromaticAberration={chromaticAberration ?? 0.1}
 transmission={1}
 roughness={0}
 {...extraMat}
 />
 </mesh>
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
 <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
 <Lens modeProps={lensProps} />
 </Canvas>
 </div>
 );
}
