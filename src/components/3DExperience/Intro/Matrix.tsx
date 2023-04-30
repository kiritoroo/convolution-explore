import { useRecoilValue } from 'recoil'
import { Box } from './Box'
import { kernelCategoryDataSelector } from '@store/selectors'
import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center } from '@react-three/drei'

interface Props {
  args: {
    position: any
    rotation: any
  }
}

export const Matrix = ( props: Props) => {
  const { args } = props
  const ref = useRef<any>()

  const matrixSize = useMemo<number>(() => 3, []);

  return (
    <group ref={ref} {...args}>
      <Center>
        {Array.from({ length: matrixSize }, (_, i) => 
          Array.from({ length: matrixSize }, (_, j) => (
            <Box
            key={`${i}-${j}`}
            index={i*matrixSize+j}
            args={{ 
              position: [i, 0, -j]}}/>
          )
        ))}
      </Center>
    </group>
  )
}