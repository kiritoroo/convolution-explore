import { useFrame, useThree } from '@react-three/fiber';
import { emitEvent } from '@util/Event';
import { useEffect } from 'react';
import * as THREE from 'three';
import { camAnimIntro } from './CameraControls';

export const Rig = ({ v = new THREE.Vector3() }) => {
  const { camera } = useThree()

  useEffect(() => {
    camAnimIntro(camera, () => {})
  }, [])

  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
  })
}