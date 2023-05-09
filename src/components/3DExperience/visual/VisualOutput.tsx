import { colorModeState } from '@store/atoms';
import { selectedImageOutputSelector } from '@store/selectors';
import React, { useEffect, useMemo, useRef, useImperativeHandle, useCallback, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';
import * as THREE from 'three';

interface Props {

}

interface Refs {
  instancesMesh: React.RefObject<THREE.InstancedMesh>
  clearColor: () => void
}

export const VisualOutput =  React.memo(React.forwardRef<Refs, Props>(( props, ref ) => {
  const imageOut = useRecoilValue(selectedImageOutputSelector);
  const colorMode = useRecoilValue(colorModeState);

  const instanceRef = useRef<any>()

  useImperativeHandle(ref, () => {
    return {
      instancesMesh: instanceRef,
      clearColor: clearColor
    }
  }, [instanceRef.current])

  const colorsDefault = useMemo<Float32Array>(() => (
    new Float32Array(imageOut.rgb1dOut.flatMap(pixel => [1, 1, 1]))
  ), [imageOut])

  const renderedGeometry = useMemo<JSX.Element>(() => (
    <boxGeometry args={[1, 1, 1]}>
      {/* <instancedBufferAttribute attach="attributes-color" args={[colorsDefault, 3]} /> */}
    </boxGeometry>
  ), [colorsDefault])

  const renderedMaterial = useRef<JSX.Element>(
    <meshStandardMaterial 
      // vertexColors
      toneMapped={true}
      metalness={1}
      roughness={1}
      side={THREE.DoubleSide}
      depthWrite
      depthTest
      transparent
      opacity={0.1}
    />
  )

  const clearColor = useCallback(() => {
    const color = new THREE.Color(1, 1, 1);
    if (instanceRef.current.count > 0) {
      for (let y = 0; y < imageOut.h; y++) {
        for (let x = 0; x < imageOut.w; x++) {
          const index = (y * imageOut.w + x);
          instanceRef.current.setColorAt(index, color);
        }
      }
      instanceRef.current.instanceColor.needsUpdate = true
    }
  }, [instanceRef.current, imageOut])

  const configPosition = useCallback(() => {
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color(1, 1, 1);
    if (instanceRef.current.count > 0) {
      for (let y = 0; y < imageOut.h; y++) {
        for (let x = 0; x < imageOut.w; x++) {
          const index = (y * imageOut.w + x);
          matrix.setPosition(x, -y, 15);
          instanceRef.current.setMatrixAt(index, matrix);
          instanceRef.current.setColorAt(index, color);
        }
      }
      instanceRef.current.instanceMatrix.needsUpdate = true
      instanceRef.current.instanceColor.needsUpdate = true
    }
  }, [instanceRef.current, imageOut])

  useLayoutEffect(() => {
    configPosition()
  }, [instanceRef.current, imageOut])

  return (
    <group>
      <instancedMesh ref={instanceRef} args={[undefined, undefined, imageOut.pixelCount]}>
        { renderedGeometry }
        { renderedMaterial.current }
      </instancedMesh>
    </group>
  )
}))
