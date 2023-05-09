import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledContentWrapper,
  StyledMatrixItem
} from '@style3d/VisualContent/WindowInput.styled'

interface IContentWrapper {
  children: React.ReactNode
  isShow: boolean
}
export const MotionContentWrapper: React.FC<IContentWrapper> = React.memo(( props) => {
  const { children, isShow } = props;

  const transition = useRef<Transition>({
    duration: 0.2
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
  })

  return (
    <StyledContentWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate={ isShow ? "enter" : "hidden" }
      exit="hidden"
    >
      { children }
    </StyledContentWrapper>
  )
})

interface IMatrixItemProps {
  children: React.ReactNode
  delay: number
  isShow: boolean
}
export const MotionMatrixItem: React.FC<IMatrixItemProps> = React.memo(( props ) => {
  const { children, delay, isShow } = props

  const [scope, animate] = useAnimate()

  const handleAnimSelect = useCallback(() => {
    animate(scope.current, { scale: 0.2 }, { duration: 0.2 })
    setTimeout(() => {
      animate(scope.current, { scale: 1 }, { duration: 0.3, delay: (delay * 0.02), type: 'spring', mass: 1.5 })
    }, 200)
  }, [])

  useEffect(() => {
    if (isShow) {
      handleAnimSelect();
    }
  }, [isShow])

  return (
    <StyledMatrixItem
      ref={scope}>
      { children }
    </StyledMatrixItem>
  )
})