import { MeshTransmissionMaterial, Text } from "@react-three/drei"
import { useControls } from "leva"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/three';
import { Depth, Fresnel, LayerMaterial } from "lamina";

interface Props {
  args: {
    position: any
    rotation: any
  }
  children: React.ReactNode
}

export const Caption = (props: Props) => {
  const { children, args} = props

  const ref = useRef<any>()

  const { width } = useThree((state) => state.viewport)

  // const config = useControls('Text folder', {
  //   backside: false,
  //   samples: { value: 16, min: 1, max: 32, step: 1 },
  //   resolution: { value: 512, min: 64, max: 2048, step: 64 },
  //   transmission: { value: 0.8, min: 0, max: 1 },
  //   roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
  //   clearcoat: { value: 0.85, min: 0, max: 1, step: 0.01 },
  //   clearcoatRoughness: { value: 0.9, min: 0, max: 1, step: 0.01 },
  //   thickness: { value: 200, min: 0, max: 200, step: 0.01 },
  //   backsideThickness: { value: 200, min: 0, max: 200, step: 0.01 },
  //   ior: { value: 2, min: 1, max: 5, step: 0.01 },
  //   chromaticAberration: { value: 1, min: 0, max: 1 },
  //   anisotropy: { value: 3, min: 0, max: 10, step: 0.01 },
  //   distortion: { value: 0.3, min: 0, max: 1, step: 0.01 },
  //   distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
  //   temporalDistortion: { value: 0.3, min: 0, max: 1, step: 0.01 },
  //   attenuationDistance: { value: 5, min: 0, max: 10, step: 0.01 },
  //   attenuationColor: '#ffffff',
  //   color: '#ffffff',
  // }, { collapsed: true })

  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2)
    const cos = Math.cos(state.clock.elapsedTime / 2)
    ref.current.layers[0].origin.set(cos / 2, 0, 0)
    ref.current.layers[1].origin.set(cos, sin, cos)
    ref.current.layers[2].origin.set(sin, cos, sin)
    ref.current.layers[3].origin.set(cos, sin, cos)
  })

  return (
    <Text
      { ...args }
      lineHeight={1}
      font="/fonts/futura/SFUFuturaRegular.TTF"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle">
      {/* <MeshTransmissionMaterial {...config} color={'#ffffff'} toneMapped={false} /> */}
      <LayerMaterial ref={ref} toneMapped={false}>
        <Depth colorA="#6fa2ff" colorB="black" alpha={1} mode="normal" near={0.5 * 0.5} far={0.5} origin={[0, 0, 0]} />
        <Depth colorA="#69b1f5" colorB="#e4cdff" alpha={1} mode="add" near={2 * 0.5} far={2} origin={[0, 1, 1]} />
        <Depth colorA="#5d96ff" colorB="#ffffff" alpha={1} mode="add" near={3 * 0.5} far={3} origin={[0, 1, -1]} />
        <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * 0.5} far={1.5} origin={[1, -1, -1]} />
        <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
      </LayerMaterial>
      {children}
    </Text>
  )
}