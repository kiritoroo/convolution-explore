import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledMatrixWrapper,
    StyledMatrixItem
} from '@style2d/KernelListItem.styled'
import { useRecoilValue } from 'recoil';
import { selectedSizeSelector } from '@store/selectors';

interface IMatrixWrapperProps {
  children: React.ReactNode
  onClick: () => void
  isSelected: boolean
}
export const MotionMatrixWrapper: React.FC<IMatrixWrapperProps> = React.memo(( props ) => {
  const { children, isSelected, onClick } = props;

  const transition = useRef<Transition>({
    duration: 2, repeat: Infinity, ease: "linear"
  });

  const variants = useRef<Variants>({
    unselect: { background:
      "linear-gradient(to bottom, rgb(255, 255, 255, 0.2) 0%, rgb(255, 255, 255, 0.5) 100%)"
    },
    selected: { background: [
      "linear-gradient(to right, rgb(237, 230, 253, 0.8) -200%, rgb(255, 255, 255, 0.2) -100%, rgb(237, 230, 253, 0.8) 0%, rgb(255, 255, 255, 0.2) 100%)",
      "linear-gradient(to right, rgb(237, 230, 253, 0.8) -100%, rgb(255, 255, 255, 0.2) 0%, rgb(237, 230, 253, 0.8) 100%, rgb(255, 255, 255, 0.2) 200%)",
      "linear-gradient(to right, rgb(237, 230, 253, 0.8) 0%, rgb(255, 255, 255, 0.2) 100%, rgb(237, 230, 253, 0.8) 200%, rgb(255, 255, 255, 0.2) 300%)"
    ]}
  });

  return (
    <StyledMatrixWrapper
      onClick={ onClick }
      variants={ variants.current }
      transition={ transition.current }
      initial="unselect"
      animate={ isSelected ? "selected" : "unselect" }
    >
      { children }
    </StyledMatrixWrapper>
  )
})

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