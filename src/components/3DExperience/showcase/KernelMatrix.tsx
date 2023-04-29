import React, { Suspense, useContext, useEffect, useRef, forwardRef, useImperativeHandle, SetStateAction, useLayoutEffect, useState, useCallback, useMemo, useTransition } from "react"
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { Float, Center } from '@react-three/drei'
import { KernelLabel } from '@comp3d/showcase/KernelLabel'
import { KernelBlock } from "@comp3d/showcase/KernelBlock";
import { 
  selectedKernelSelector,
  selectedSizeSelector
} from "@store/selectors";
import { useRecoilValue } from "recoil";
import { camAnimSelectKernel } from "./CameraControls";

interface ChildProps {

}

export const KernelMatrix = (props: ChildProps) => {
  const selectedKernel = useRecoilValue(selectedKernelSelector)
  const { randIndicesAnim } = useRecoilValue(selectedSizeSelector)
  const [isPending, startTransition] = useTransition();
  
  const ref = useRef<any>()
  const { camera } = useThree()

  const useLerpedMouse = () => {
    const mouse = useThree((state) => state.mouse)
    const lerped = useRef(mouse.clone())
    const previous = new THREE.Vector2()
    useFrame((state) => {
      previous.copy(lerped.current)
      lerped.current.lerp(mouse, 0.05)
      if (!previous.equals(lerped.current)) state.performance.regress()
    })
    return lerped
  }

  const mouse = useLerpedMouse()

  useFrame((state) => {
    if (ref.current) {
      startTransition(() => {
        ref.current.rotation.y = (mouse.current.x * Math.PI) / 10
        ref.current.rotation.x = (mouse.current.y * Math.PI) / 200
    })
    }
  })

  useEffect(() => {
    startTransition(() => {
      camAnimSelectKernel(camera, selectedKernel.data!.size, () => {})
    })
  }, [selectedKernel.data])

  const createMatrix = useCallback((matrix: number[][]) => {
    const valMax = Math.maxOfMatrix(matrix ?? [])
    return (
      matrix.map((row: number[], i: number) => (
        row.map((value: number, j: number) => (
          <KernelBlock
            key={`${i}-${j}-${value}-${matrix[0].length}`}
            args={{ 
              position: [i, 0, -j],
              rotation: [0, 0, 0]}}
            value={value}
            valMax={valMax}
            index={i*selectedKernel.data!.size+j}/>
        ))
      ))
    )
  }, [])

  const renderedMatrix = useMemo<JSX.Element[][]>(() => {
    return createMatrix(selectedKernel.data?.matrix ?? []);
  }, [selectedKernel.data])

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <Float position={[-selectedKernel.data!.size/3, 0.5, selectedKernel.data!.size/3]} floatIntensity={3} rotationIntensity={0} speed={1}>
        { renderedMatrix }
      </Float>
    </group>
    )
}