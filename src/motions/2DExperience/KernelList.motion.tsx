import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledContainer,
  StyledKernelListWrapper,
  StyledKernelItemWrapper
} from '@style2d/KernelList.styled'

interface IContainerProps {
  children: React.ReactNode,
  isShow: boolean
}

export const MotionContainer: React.FC<IContainerProps> = React.memo(( props ) => {
  const { children, isShow } = props

  const transition = useRef<Transition>({
    duration: 0.3, ease: 'easeInOut'
  });

  const variants = useRef<Variants>({
    hidden: { opacity: 0, x: "50%", pointerEvents: 'none' },
    enter: { opacity: 1, x: "0%", pointerEvents: 'all', transition: transition.current },
    exit: { opacity: 0, x: "50%", pointerEvents: 'none', transition: transition.current }
  });

  return (
    <StyledContainer
      variants={ variants.current }
      initial="hidden"
      animate={ isShow ? "enter" : "exit" }
    >
      { children }
    </StyledContainer>
  )
})

interface IKernelListWrapperProps {
  children: React.ReactNode
  selectedSize: number | undefined
}
export const MotionKernelListWrapper: React.FC<IKernelListWrapperProps> = React.memo(( props ) => {
  const { children, selectedSize } = props
  const [selectedSizePrev, setSelectedSizePrev] = useState(selectedSize ?? 0)

  const [scope, animate] = useAnimate()

  const handleAnimateSelectSize = useCallback((size: number, sizePrev: number) => {
    animate(scope.current, { overflow: 'hidden auto' }, { duration: 0.5 })
    if (sizePrev < size) {
      if (size == 3) animate(scope.current, { width: 270 }, { duration: 0.2, delay: 0 })
      if (size == 5) animate(scope.current, { width: 350 }, { duration: 0.2, delay: 0 })
      if (size == 7) animate(scope.current, { width: 450 }, { duration: 0.2, delay: 0 })
    }
    else if (sizePrev > size) {
      if (size == 3) animate(scope.current, { width: 270 }, { duration: 0.3, delay: 0.2 })
      if (size == 5) animate(scope.current, { width: 350 }, { duration: 0.3, delay: 0.2 })
      if (size == 7) animate(scope.current, { width: 450 }, { duration: 0.3, delay: 0.2 })
    }
    animate(scope.current, { overflow: 'hidden auto'}, { duration: 0.1, delay: 0.5 })
    setSelectedSizePrev(size)
  }, [])

  useEffect(() => {
    handleAnimateSelectSize(selectedSize ?? 0, selectedSizePrev);
  }, [selectedSize])

  return (
    <StyledKernelListWrapper
      ref={scope}
    >
      { children }
    </StyledKernelListWrapper>
  )
})

interface IKernelItemWrapper {
  children: React.ReactNode
  index: number
}
export const MotionKernelItemWrapper: React.FC<IKernelItemWrapper> = React.memo(( props ) => {
  const { children, index } = props

  const transition = useRef<Transition>({
    delay: index * 0.15 + 0.05, type: 'spring'
  });

  const variants = useRef<Variants>({
    hidden: { opacity: 0, x: -50 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  });

  return (
    <StyledKernelItemWrapper
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0.5, originY: 0 }}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      { children }
    </StyledKernelItemWrapper>
  )
})
