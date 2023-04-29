import * as THREE from 'three'
import { LayerMaterial, Depth, Noise } from 'lamina'

export const Background = () => {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB="#d3e2ff" colorA="#e4c6ff" alpha={1} mode="normal" near={120} far={150} origin={[100, 100, -100]} />
        <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
      </LayerMaterial>
    </mesh>
  )
}
