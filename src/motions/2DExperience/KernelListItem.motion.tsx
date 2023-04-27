import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
    StyledMatrixItem
} from '@style2d/KernelListItem.styled'
import { useRecoilValue } from 'recoil';
import { selectedSizeSelector } from '@store/selectors';

interface IMatrixItemProps {
  children: React.ReactNode
  index: number
  isSelected: boolean
}
export const MotionMatrixItem: React.FC<IMatrixItemProps> = React.memo(( props ) => {
  const { children, index, isSelected } = props

  const { randIndicesAnim } = useRecoilValue(selectedSizeSelector)

  const [scope, animate] = useAnimate()

  const handleAnimSelect = useCallback(() => {
    animate(scope.current, { scale: 0.2 }, { duration: 0.2 })
    setTimeout(() => {
      animate(scope.current, { scale: 1 }, { duration: 0.2, delay: (randIndicesAnim.indexOf(index)) * 0.02 })
    }, 200)
  }, [])

  useEffect(() => {
    if (isSelected) {
      handleAnimSelect();
    }
  }, [isSelected])

  return (
    <StyledMatrixItem
      ref={scope}>
      { children }
    </StyledMatrixItem>
  )
})