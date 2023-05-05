import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledShortLocale,
  StyledMenuWrapper
} from '@style2d/LanguageSwitcher.styled'

interface IShortLocaleProps {
  children: React.ReactNode
  isOpen: boolean
}
export const MotionShortLocale: React.FC<IShortLocaleProps> = React.memo(( props ) => {
  const { children, isOpen } = props;

  const transition = useRef<Transition>({
    duration: 0.2, type: 'spring'
  })

  const variants = useRef<Variants>({
    show: { scale: 1, opacity: 1 },
    hide: { scale: 0, opacity: 0 },
  })

  return (
    <StyledShortLocale
      variants={ variants.current }
      transition={ transition.current }
      initial="show"
      animate={ isOpen ? 'hide' : 'show' }
      exit="hide"
    >
      { children }
    </StyledShortLocale>
  )
})

interface IMenuWrapperProps {
  children: React.ReactNode
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}
export const MotionMenuWrapper: React.FC<IMenuWrapperProps> = React.memo(( props ) => {
  const { children, isOpen, onMouseEnter, onMouseLeave } = props;

  const transition = useRef<Transition>({
    duration:  0.1
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, scale: 0, height: 0 },
    show: { opacity: 1, scale: 1, height: 'auto' },
    exit: { opacity: 0, scale: 0, height: 0 }
  })

  return (
    <StyledMenuWrapper
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      style={{ originX: 0.5, originY: 0 }}
      variants={ variants.current }
      transition={ transition.current }
      initial='hidden'
      animate={ isOpen ? 'show': 'hide' }
      exit='hidden'
    >
      { children }
    </StyledMenuWrapper>
  )
})