import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledModeWrapperRGB,
  StyledModeWrapperGray
} from '@style2d/ButtonColorMode.styled'

interface IModelWrapperRGB {
  children: React.ReactNode
  colorMode: string
}
export const MotionModelWrapperRGB: React.FC<IModelWrapperRGB> = React.memo(( props ) => {
  const { children, colorMode } = props;

  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    enter: { x: 0 },
    exit: { x: "-100%" }
  })

  return (
    <StyledModeWrapperRGB
      variants={ variants.current }
      transition={ transition.current }
      animate={ colorMode == "rgb" ? "enter" : "exit" }
    >
      { children }
    </StyledModeWrapperRGB>
  )
})

interface IModelModeWrapperGray {
  children: React.ReactNode
  colorMode: string
}
export const MotionModeWrapperGray: React.FC<IModelModeWrapperGray> = React.memo(( props ) => {
  const { children, colorMode } = props;

  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    enter: { x: "-100%" },
    exit: { x: "100%" }
  })

  return (
    <StyledModeWrapperGray
      variants={ variants.current }
      transition={ transition.current }
      animate={ colorMode == "rgb" ? "exit" : "enter" }
    >
      { children }
    </StyledModeWrapperGray>
  )
})