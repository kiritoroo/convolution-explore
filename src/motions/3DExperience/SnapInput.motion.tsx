import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledContentWrapper
} from '@style3d/VisualContent/SnapInput.styled'

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