import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';

import {
  StyledContainer
} from '@style2d/LoadingBox.styled'

interface IContainerProps {
  children: React.ReactNode
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 1, ease: "easeInOut"
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 1 },
    enter: { opacity: 1, transition: transition.current },
    exit: { opacity: 0, transition: transition.current }
  })

  return (
    <StyledContainer
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={ variants.current }
    >
      { children }
    </StyledContainer>
  )
})