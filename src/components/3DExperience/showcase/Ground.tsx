import { MeshReflectorMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { useSpring, animated } from '@react-spring/three'
import { useEffect } from 'react'
import { camAnimIntro } from './CameraControls'
import { useThree } from '@react-three/fiber'

export const Ground = () => {
  
  const config = {
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
  }

  return (
    <animated.group scale={1} position={[0, -0.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[0,-1.05,0]}>
        <circleGeometry args={[50, 100]} />
        <MeshReflectorMaterial blur={[5000, 5000]} opacity={1} {...config} />
      </mesh>
    </animated.group>
  )
}