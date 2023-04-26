import React, { useRef } from 'react';
import { 
  Transition,
  Variants
} from 'framer-motion';
import {
  StyledDotWrapper,
  StyledDot
} from '@style2d/Loading.styled'

interface IDotWrapperProps {
  children: React.ReactNode
}
export const MotionDotWrapper: React.FC<IDotWrapperProps> = ( props ) => {
  const { children } = props
  
  const transition = useRef<Transition>({
    staggerChildren: 0.2
  });
  
  const variants = useRef<Variants>({
    start: { transition: transition.current },
    end: { transition: transition.current }
  });

  return (
    <StyledDotWrapper 
      variants={ variants.current }
      initial="start"
      animate="end"
    >
      { children }
    </StyledDotWrapper>
  )
}

interface IDotProps {
}
export const MotionDot: React.FC<IDotProps> = () => {
  const transition = useRef<Transition>({
    duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut"
  });
  
  const variants = useRef<Variants>({
    start: { y: "0%" },
    end: { y: "100%" }
  });

  return (
    <StyledDot 
      variants={ variants.current } 
      transition={ transition.current }
    />
  )
}

