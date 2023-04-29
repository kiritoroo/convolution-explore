import { MeshTransmissionMaterial, Center, Text3D } from "@react-three/drei"
import { useControls, button } from 'leva'
import { useSpring, animated } from "@react-spring/three"
import * as THREE from 'three'
import { useEffect } from "react"

interface Props {
  children: React.ReactNode
  args: {
    position: any,
    rotation: any,
  }
}

export const KernelLabel = (props: Props) => {

  return (
    <>
      <animated.group castShadow {...props.args}>
        <Center scale={[0.8, 1, 1]} front top>
          <Text3D
            castShadow
            bevelEnabled
            font="/fonts/Inter_Medium_Regular.json"
            scale={2}
            letterSpacing={-0.03}
            height={0.25}
            bevelSize={0.01}
            bevelSegments={10}
            curveSegments={128}
            bevelThickness={0.01}>
            {props.children}
            <meshStandardMaterial/>
          </Text3D>
        </Center>
      </animated.group>
    </>
  )
}