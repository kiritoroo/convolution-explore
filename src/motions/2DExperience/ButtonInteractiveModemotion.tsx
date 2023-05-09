import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledModeWrapperAnim,
  StyledModeWrapperFree
} from '@style/2DExperience/ButtonInteractiveMode.styled'

interface IModelWrapperAnim {
  children: React.ReactNode
  interactiveMode: string
}
export const MotionModelWrapperAnim: React.FC<IModelWrapperAnim> = React.memo(( props ) => {
  const { children, interactiveMode } = props;

  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    enter: { x: 0 },
    exit: { x: "-100%" }
  })

  return (
    <StyledModeWrapperAnim
      variants={ variants.current }
      transition={ transition.current }
      animate={ interactiveMode == "animate" ? "enter" : "exit" }
    >
      { children }
    </StyledModeWrapperAnim>
  )
})

interface IModelModeWrapperFree {
  children: React.ReactNode
  interactiveMode: string
}
export const MotionModeWrapperFree: React.FC<IModelModeWrapperFree> = React.memo(( props ) => {
  const { children, interactiveMode } = props;

  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    enter: { x: "-100%" },
    exit: { x: "100%" }
  })

  return (
    <StyledModeWrapperFree
      variants={ variants.current }
      transition={ transition.current }
      animate={ interactiveMode == "animate" ? "exit" : "enter" }
    >
      { children }
    </StyledModeWrapperFree>
  )
})