import { useMemo, useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Text, Center, Float } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

interface Props {
  value: number,
  maxValue: number,
  index: number,
  args: {
    position: number[]
  }
}
export const Block = ( props: Props ) => {
  const { index, value, maxValue, args } = props

  const ref = useRef<any>()

  const geometry = useMemo<THREE.BoxGeometry>(() => {
    return new THREE.BoxGeometry(0.9, 0.9, 0.9)
  }, [])

  const material = useMemo<THREE.MeshStandardMaterial>(() => {
    return new THREE.MeshStandardMaterial({
      metalness:0, 
      roughness: 1,
      transparent: true,
      opacity: 1
    })
  }, [])

  const setMaterialColor = useCallback((value: number, maxValue: number) => {
    material.color = new THREE.Color((maxValue - value/1.1)/maxValue, (maxValue - value)/maxValue, 1)
    // material.color = new THREE.Color(1, 1, 1)
  }, [])

  useEffect(() => {
    setMaterialColor(value, maxValue)
  }, [value, maxValue])
  
  const [ springs, api ] = useSpring(() => ({
    scale: 1,
    position: args.position,
    config: {
      mass: 2, friction: 15
    }
  })) 

  const indices1DCenter2Outside: number[] = Math.indices1DCenter2Outside(3, 3)

  const animEnter = useCallback(() => {
    // api.start({ scale: Math.random() * 3, position: [args.position[0], 10, args.position[2]], delay: index * 50 + 1000 })
    // api.start({ scale: 0.95, position: args.position, delay: index * 50 + 2000, config: { mass: 2, friction: 15 } })

    // api.start({ scale: 0.95, position: [(Math.random() * 10)-3, (Math.random() * 10)-3, (Math.random() * 10)-3], delay: index * 50 + 5000, config: { mass: 1, friction: 15 } })

    // api.start({ scale: 0.9, position: args.position, delay: indices1DCenter2Outside.indexOf(index) * 10, config: { mass: 2, friction: 15 } })
  }, [])
  
  useEffect(() => {
    animEnter()
  }, [])

  // useFrame((state) => {
  //   if (ref.current) {
  //     easing.dampE(ref.current.rotation, [0,ref.current.rotation.y+0.5, 0], 0.25, 1/32)
  //   }
  // })

  return (
    <animated.group ref={ref} scale={springs.scale} position={springs.position.to((x, y, z) => [x, y, z])}>
      {/* <Float floatIntensity={3} rotationIntensity={0} speed={2}> */}
        <Center>
          <Text
            position={[0, 0.5, 0]}
            rotation={[-Math.PI/2, 0, Math.PI/2]}
            font="/fonts/futura/SFUFuturaRegular.TTF"
            fontSize={0.4}
            color={'#bfa7f7'}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle">
            { value }
          </Text>
          <mesh
            geometry={geometry}
            material={material}>
          </mesh>
        </Center>
      {/* </Float> */}
    </animated.group>
  )
}