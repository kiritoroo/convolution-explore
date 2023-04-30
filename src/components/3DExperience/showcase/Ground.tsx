import { MeshReflectorMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { useSpring, animated } from '@react-spring/three'
import { useEffect, useRef } from 'react'
import { camAnimIntro } from './CameraControls'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three';

export const Ground = () => {
  
  const config = useRef<any>({
    blur: [1000, 1000],
    resolution: 1024,
    mirror: 0.8, 
    mixBlur: 10,
    mixStrength: 2,
    minDepthThreshold: 0.8,
    maxDepthThreshold: 1.2,
    depthScale: 0,
    depthToBlurRatioBias: 0.2,
    distortion: 0,
    color: '#FFFFFF',
    metalness: 0,
    roughness: 1
  })

  const geometry = useRef<THREE.CircleGeometry>(
    new THREE.CircleGeometry(50, 64)
  )

  return (
    <animated.group scale={1} position={[0, -0.2, 0]}>
      <mesh 
        rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
        position={[0,-1.05,0]}
        geometry={geometry.current}>
        <MeshReflectorMaterial { ...config.current } />
      </mesh>
    </animated.group>
  )
}