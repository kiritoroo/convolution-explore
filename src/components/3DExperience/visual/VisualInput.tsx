import { useRef, useEffect, useMemo, useCallback, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { useRecoilValue } from 'recoil';
import { selectedImageInputSelector } from '@store/selectors';
import { Center } from '@react-three/drei'
import { colorModeState, isPaddingModeState } from '@store/atoms';
import { ThreeEvent } from '@react-three/fiber';

interface Props {
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
}

export const VisualInput = (props: Props) => {
  const { onPointerMove } = props;

  const image = useRecoilValue(selectedImageInputSelector);
  const colorMode = useRecoilValue(colorModeState);
  const isPaddingMode = useRecoilValue(isPaddingModeState);

  const ref = useRef<any>()

  const colors = useMemo<Float32Array>(() => (
    colorMode == 'rgb'
      ? new Float32Array(image.rgb1d.flatMap(pixel => [pixel.r/255, pixel.g/255, pixel.b/255]))
      : new Float32Array(Array.from(image.gray1d).flatMap((pixel) => [pixel/255, pixel/255, pixel/255]))
  ), [image, colorMode])

  const renderedGeometry = useMemo<JSX.Element>(() => (
    <boxGeometry args={[1, 1, 1]}>
      <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
    </boxGeometry>
  ), [colors])

  const renderedMaterial = useRef<JSX.Element>(
    <meshStandardMaterial vertexColors toneMapped={true} metalness={1} roughness={1}/>
  )

  const configPosition = useCallback(() => {
    const matrix = new THREE.Matrix4();
    if (ref.current) {
      for (let y = 0; y < image.h; y++) {
        for (let x = 0; x < image.w; x++) {
          const index = (y * image.w + x);
          matrix.setPosition(x, -y, 0);
          ref.current.setMatrixAt(index, matrix);
        }
      }
      ref.current.instanceMatrix.needsUpdate = true
    }
  }, [ref.current, image])

  useLayoutEffect(() => {
    configPosition()
  }, [ref.current, image])

  return (
    // <Center position={[-image.w/2, image.h/2, 0]}>
    // <Center position={[0, 0, 0]}>
      <group onPointerMove={onPointerMove}>
        <instancedMesh ref={ref} args={[undefined, undefined, image.pixelCount]}>
          { renderedGeometry }
          { renderedMaterial.current }
        </instancedMesh>
      </group>
    // </Center>
  )
}