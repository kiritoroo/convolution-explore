import { useEffect } from 'react';
import * as THREE from 'three'
import { LayerMaterial, Depth, Noise } from 'lamina'
import { camAnimIntro } from './CameraControls'
import { useThree } from '@react-three/fiber';

export const Background = () => {
  const { camera } = useThree()

  useEffect(() => {
    camAnimIntro(camera, () => {})
  }, [])
  return (
    <mesh scale={100}>
      <boxGeometry args={[2, 2, 2]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB="#f1f6ff" colorA="#f1e0ff" alpha={1} mode="normal" near={120} far={150} origin={[100, 100, -100]} />
      </LayerMaterial>
    </mesh>
  )
}
