import { useSpring, animated } from "@react-spring/three"
import React, { useCallback, useEffect, useMemo, useRef, useTransition } from "react"
import { Float, MeshTransmissionMaterial, Text } from '@react-three/drei'
import { useThree  } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { useRecoilValue } from "recoil"
import { selectedSizeSelector } from "@store/selectors"
import { colorModeState } from "@store/atoms"

interface Props {
  args: {
    position: any
    rotation: any
  },
  index: number,
  value: number,
  valMax: number
}

export const KernelBlock = React.memo((props: Props) => {

  const { args, index, value, valMax } = props

  const [isPending, startTransition] = useTransition();
  const { randIndicesAnim } = useRecoilValue(selectedSizeSelector)
  const colorMode = useRecoilValue(colorModeState)

  const [boxSpring, boxApi] = useSpring(
    () => ({ "scale": 0.2, config: { mass: 2, friction: 10 } }),
    []
  )

  const animInto = useCallback(() => {
    boxApi.start({ 'scale': 1, delay: randIndicesAnim.indexOf(index)*20 })
  }, [index])

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

  const renderedGeometry = useRef<THREE.BoxGeometry>(new THREE.BoxGeometry(0.9, 0.9, 0.9))
  const renderedMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    metalness:0, 
    roughness: 1,
    transparent: true,
    opacity: 1,
    color: colorMode == 'rgb' 
      ? new THREE.Color((valMax - value/1.1)/valMax, (valMax - value)/valMax, 1) 
      : new THREE.Color((valMax - value/1.4)/valMax, (valMax - value/1.4)/valMax, (valMax - value/1.4)/valMax) 
  }), [value, valMax, colorMode])

  const renderedTextMesh = useMemo<JSX.Element>(() => (
    <Text
      position={[0, 0.5, 0]} rotation={[-Math.PI/2, 0, Math.PI/2]}
      font="/fonts/Ki-Medium.ttf" fontSize={0.4}
      color={ '#ffffff' } material-toneMapped={false}
      anchorX="center" anchorY="middle">
      { value }
    </Text>
  ), [value])

  return (
    <animated.group
      onPointerMove={ animHover }
      onPointerLeave={ animLeave }
      { ...args }
      { ...boxSpring }>
      { renderedTextMesh }
      <mesh
        geometry={ renderedGeometry.current }
        material={ renderedMaterial }
      />
    </animated.group>
  )
})
