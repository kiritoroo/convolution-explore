import { useMemo, useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Text, Center, Float } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

interface Props {
  index: number,
  args: {
    position: number[]
  }
}
export const Box = ( props: Props ) => {
  const { index, args } = props

  const ref = useRef<any>()

  const geometry = useMemo<THREE.BoxGeometry>(() => {
    return new THREE.BoxGeometry(0.9, 0.9, 0.9)
  }, [])

  const material = useMemo<THREE.MeshStandardMaterial>(() => {
    return new THREE.MeshStandardMaterial({
      metalness:0, 
      roughness: 1,
      transparent: true,
      opacity: 1,
      color: new THREE.Color(1, 1, 1)
    })
  }, [])

  const [ springs, api ] = useSpring(() => ({
    scale: 0,
    position: args.position,
    config: {
      mass: 2, friction: 15
    }
  })) 

  const indices1DCenter2Outside: number[] = Math.indices1DCenter2Outside(3, 3)

  const animEnter = useCallback(() => {
    // api.start({ scale: Math.random() * 3, position: [args.position[0], 10, args.position[2]], delay: index * 50 + 1000 })
    // api.start({ scale: 0.95, position: args.position, delay: index * 50 + 2000, config: { mass: 2, friction: 15 } })


    api.start({ scale: 0.9, position: args.position, delay: index * 10, config: { mass: 2, friction: 15 } })

        api.start({ scale: 0.95, position: [(Math.random() * 10)-3, (Math.random() * 10)-3, (Math.random() * 10)-3], delay: index * 50 + 1000, config: { mass: 1, friction: 15 } })
  }, [])
  
  useEffect(() => {
    animEnter()
  }, [])

  return (
    <animated.group ref={ref} scale={springs.scale} position={springs.position.to((x, y, z) => [x, y, z])}>
        <Center>
          <mesh
            geometry={geometry}
            material={material}>
          </mesh>
        </Center>
    </animated.group>
  )
}