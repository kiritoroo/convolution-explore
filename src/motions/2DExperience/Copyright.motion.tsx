import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledSkeletonWrapper,
  StyledContentWrapper
} from '@style2d/Copyright.styled'

interface ISkeletonWrapperProps {
  children: React.ReactNode
}
export const MotionSkeletonWrapper: React.FC<ISkeletonWrapperProps> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 1
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0 },
    enter: { opacity: 0.5 },
    exit: { opacity: 0}
  })

  return (
    <StyledSkeletonWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      { children }
    </StyledSkeletonWrapper>
  )
})

interface IContentWrapper {
  children: React.ReactNode
}
export const MotionContentWrapper: React.FC<IContentWrapper> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 1
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0}
  })

  return (
    <StyledContentWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      { children }
    </StyledContentWrapper>
  )
})
