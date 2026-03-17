/* eslint-disable react/no-unknown-property */
'use client'
import * as THREE from 'three';
import { useRef, useState, useEffect, memo, useMemo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
 useFBO,
 MeshTransmissionMaterial,
} from '@react-three/drei';
import { easing } from 'maath';

interface FluidGlassProps {
  mode?: 'lens' | 'bar' | 'cube';
  lensProps?: Record<string, any>;
  barProps?: Record<string, any>;
  cubeProps?: Record<string, any>;
}

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: FluidGlassProps) {
 const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
 const modeProps = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

 return (
 <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
 <Wrapper modeProps={modeProps} />
 </Canvas>
 );
}

const ModeWrapper = memo(function ModeWrapper({
 children,
 geometryType,
 geometryKey,
 lockToBottom = false,
 followPointer = true,
 modeProps = {},
 ...props
}: any) {
 const ref = useRef<THREE.Mesh>(null);
 const buffer = useFBO();
 const { viewport: vp } = useThree();
 const [scene] = useState(() => new THREE.Scene());

 // Create geometry based on type
 const geometry = useMemo(() => {
   if (geometryType === 'cylinder') {
     return new THREE.CylinderGeometry(1, 1, 0.5, 64);
   } else if (geometryType === 'cube') {
     return new THREE.BoxGeometry(1, 1, 1);
   }
   return new THREE.CylinderGeometry(1, 1, 0.5, 64);
 }, [geometryType]);

 useFrame((state, delta) => {
 if (!ref.current) return;
   
 const { gl, viewport, pointer, camera } = state;
 const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

 const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
 const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
 easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

 if (modeProps.scale == null) {
 const maxWorld = v.width * 0.9;
 const desired = maxWorld / 1;
 ref.current.scale.setScalar(Math.min(0.25, desired));
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
 <mesh ref={ref} scale={scale ?? 0.25} rotation-x={Math.PI / 2} geometry={geometry} {...props}>
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
 return <ModeWrapper geometryType="cylinder" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: any) {
 return <ModeWrapper geometryType="cube" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: any) {
 const defaultMat = {
 transmission: 1,
 roughness: 0,
 thickness: 10,
 ior: 1.15,
 color: '#ffffff',
 attenuationColor: '#ffffff',
 attenuationDistance: 0.25
 };

 return (
 <ModeWrapper
 geometryType="cube"
 geometryKey="Cube"
 lockToBottom
 followPointer={false}
 modeProps={{ ...defaultMat, ...modeProps }}
 {...p}
 />
 );
}


