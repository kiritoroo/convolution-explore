import { useRecoilValue } from 'recoil'
import { Block } from './Block2'
import { kernelCategoryDataSelector } from '@store/selectors'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Float } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three';

interface Props {
  // args: {
  //   position: any
  //   rotation: any
  //   scale: any
  // }
}

export const Matrix = ( props: Props) => {
  // const { args } = props

  const ref = useRef<any>()

  const { dataListBySize } = useRecoilValue(kernelCategoryDataSelector);

  const matrixSize = useMemo<number>(() => 3, []);

  const matrixList = useMemo<number[][][]>(() => {
    return dataListBySize[matrixSize].map(kernel => kernel.matrix)
  }, [])

  const [ selectedMatrix, setSelectedMatrix ] = useState<number[][]>(matrixList[Math.floor(Math.random() * matrixList.length)]);

  const maxOfMatrix = useMemo<number>(() => {
    return Math.maxOfMatrix(selectedMatrix) 
  }, [selectedMatrix])

  const { viewport, camera } = useThree()

  const [speed] = useState(() => 0.1 + Math.random() / 10)
  const position = useMemo(() => {
    const z = Math.random() * -30
    const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
    return new THREE.Vector3(THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z)
  }, [viewport])

  return (
    <group position={[0,0.5,-5]} rotation={[Math.PI/2,-Math.PI/2,0]} ref={ref}>
      <Float position={position} speed={speed} rotationIntensity={10} floatIntensity={40} dispose={null}>
      <Center>
        {selectedMatrix.map((row: number[], i: number) => (
          row.map((value: number, j: number) => (
            <Block
              key={`${i}-${j}-${value}`}
              index={i*matrixSize+j}
              args={{ 
                position: [i, 0, -j]}}
              value={value}
              maxValue={maxOfMatrix}/>
          ))
        ))}
      </Center>
      </Float>
    </group>
  )
}