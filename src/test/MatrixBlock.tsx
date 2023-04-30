import { useRecoilValue } from 'recoil'
import { Block } from './Block'
import { kernelCategoryDataSelector } from '@store/selectors'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center } from '@react-three/drei'

interface Props {

}

export const Matrix = ( props: Props) => {
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


  let intervalId: any

  const [intervalTime, setIntervalTime] = useState<number>(500);

  // const randomMatrix = useCallback(() => {
  //   intervalId = setInterval(() => {
  //     setSelectedMatrix(matrixList[Math.floor(Math.random() * matrixList.length)]);
  //     setIntervalTime(intervalTime * 0.9);
  //   }, intervalTime);
  // }, [intervalTime]);

  // useEffect(() => {
  //   randomMatrix()
  //   return () => clearInterval(intervalId);
  // }, [intervalTime])

  // useFrame((state) => {
  //   if (ref.current) {
  //     ref.current.rotation.x += 0.02
  //     ref.current.rotation.y += 0.01
  //   }
  // })

  return (
    <group ref={ref}>
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
    </group>
  )
}