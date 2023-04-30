import { useSpring, animated } from "@react-spring/three"
import { useCallback, useEffect, useMemo, useRef, useTransition } from "react"
import { Float, MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useThree  } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useRecoilValue } from "recoil"
import { selectedSizeSelector } from "@store/selectors"

interface Props {
  args: {
    position: any
    rotation: any
  },
  index: number,
  value: number,
  valMax: number
}

export const KernelBlock = (props: Props) => {

  const { args, index, value, valMax } = props

  const { randIndicesAnim } = useRecoilValue(selectedSizeSelector)
  const [isPending, startTransition] = useTransition();

  const [boxSpring, boxApi] = useSpring(
    () => ({ "scale": 0.2, config: { mass: 2, friction: 10 } }),
    []
  )
  const { width } = useThree((state) => state.viewport)

  const animInto = useCallback(() => {
    boxApi.start({ 'scale': 1, delay: randIndicesAnim.indexOf(index)*20 })
  }, [])

  const animHover = useCallback(() => {
    startTransition(() => {
      boxApi.start({ 'scale': 1.1 })
    })
  }, [])

  const animLeave = useCallback(() => {
    startTransition(() => {
      boxApi.start({ 'scale': 1 })
    })
  }, [])

  useEffect(() => {
    startTransition(() => {
      animInto()
    })
  }, [boxApi])

  const geometry = useRef<THREE.BoxGeometry>(new THREE.BoxGeometry(0.9, 0.9, 0.9))
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    metalness:0, 
    roughness: 1,
    transparent: true,
    opacity: 1,
    color: new THREE.Color((valMax - value/1.1)/valMax, (valMax - value)/valMax, 1)
  }), [value, valMax])

  return (
    <animated.group
      // onClick={() => (console.log('click'))}
      onPointerMove={animHover}
      onPointerLeave={animLeave}
      // castShadow
      { ...args }
      { ...boxSpring }>
      <Text
        position={[0, 0.5, 0]}
        rotation={[-Math.PI/2, 0, Math.PI/2]}
        font="/fonts/Ki-Medium.ttf"
        fontSize={0.4}
        color={'#bfa7f7'}
        material-toneMapped={false}
        anchorX="center"
        anchorY="middle">
        {props.value}
      </Text>
      <mesh
      //  castShadow
      geometry={geometry.current}
      material={material}
      >
        {/* <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial metalness={0} roughness={1} transparent={true} opacity={1} /> */}
      </mesh>
    </animated.group>
  )
}