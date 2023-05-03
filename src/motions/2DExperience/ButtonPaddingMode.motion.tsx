import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledModeWrapperPadding,
  StyledModeWrapperNoPadding
} from '@style2d/ButtonPaddingMode.styled'

interface IModeWrapperPadding {
  children: React.ReactNode
  isPadding: boolean
}
export const MotionModeWrapperPadding: React.FC<IModeWrapperPadding> = React.memo(( props ) => {
  const { children, isPadding } = props;

  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    enter: { x: "-95%" },
    exit: { x: "100%" }
  })

  return (
    <StyledModeWrapperPadding
      variants={ variants.current }
      transition={ transition.current }
      animate={ isPadding ? "enter" : "exit" }
    >
      { children }
    </StyledModeWrapperPadding>
  )
})

interface IModeWrapperNoPadding {
  children: React.ReactNode
  isPadding: boolean
}
export const MotionModeWrapperNoPadding: React.FC<IModeWrapperNoPadding> = React.memo(( props ) => {
  const { children, isPadding } = props;
  
  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    enter: { x: 0 },
    exit: { x: "-120%" }
  })

  return (
    <StyledModeWrapperNoPadding
      variants={ variants.current }
      transition={ transition.current }
      animate={ isPadding ? "exit" : "enter" }
    >
      { children }
    </StyledModeWrapperNoPadding>
  )
})
