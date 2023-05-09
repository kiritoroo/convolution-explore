import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledContainer,
  StyledMenuWrapper,
  StyledMenuItem,
  StyledHintSnap
} from '@style2d/ControlsList.styled';

interface IContainerProps {
  children: React.ReactNode
}
export const MotionContainer: React.FC<IContainerProps> = React.memo(( props ) => {
  const { children } = props;

  return (
    <StyledContainer>
      { children }
    </StyledContainer>
  )
})

interface IMenuWrapper {
  children: React.ReactNode
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}
export const MotionMenuWrapper: React.FC<IMenuWrapper> = React.memo(( props ) => {
  const { children, isOpen, onMouseEnter, onMouseLeave } = props;

  const transition = useRef<Transition>({
    duration: 0.5, type: 'spring'
  })

  const variants = useRef<Variants>({
    show: { opacity: 1, x: "40px", pointerEvents: 'all', transition: transition.current },
    hide: { opacity: 0, x: "150px", pointerEvents: 'none', transition: { duration: 0.3 } },
  })

  return (
    <StyledMenuWrapper
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
      variants={ variants.current }
      initial='hide'
      animate={ isOpen ? 'show' : 'hide' }
      exit="hide"
    >
      { children }
    </StyledMenuWrapper>
  )
})

interface IMenuItem {
  children: React.ReactNode
  isOpen: boolean
  isSelect: boolean
  index: number
  onClick: () => void
}
export const MotionMenuItem: React.FC<IMenuItem> = React.memo(( props ) => {
  const { children, isOpen, isSelect, index, onClick } = props
  const [scope, animate] = useAnimate()

  const transition = useRef<Transition>({
    delay: index * 0.05 + 0.05, type: 'spring'
  });
 
  const variants = useRef<Variants>({
    hidden: { opacity: 0, x: -50, transition: { delay: 0, duration: 0.3 } },
    enter: { opacity: 1, x: 0, transition: transition.current },
    exit: { opacity: 0, x: -50 }
  });

  useEffect(() => {
    animate(scope.current, { background: isSelect ? '#EDE6FD' : 'rgba(255, 255, 255, 0)' }, { duration: 0.1 })
  }, [isSelect])

  return (
    <StyledMenuItem
      ref={ scope }
      onClick={ onClick } 
      variants={ variants.current }
      style={{ originX: 0.5, originY: 0 }}
      initial="hidden"
      animate={ isOpen ? 'enter' : 'hidden' }
      exit="exit"
    >
      { children }
    </StyledMenuItem>
  )
})

interface IHintSnapProps {
  children: React.ReactNode
  isSnapMode: boolean
}
export const MotioHintSnap: React.FC<IHintSnapProps> = React.memo(( props ) => {
  const { children, isSnapMode } = props;

  const transition = useRef<Transition>({
    duration: 0.2
  })

  const variants = useRef<Variants>({
    show: { opacity: 1 },
    hide: { opacity: 0 },
  })

  return (
    <StyledHintSnap
      variants={ variants.current }
      transition={ transition.current }
      initial='hide'
      animate={ isSnapMode ? 'show' : 'hide' }
      exit="hide"
    >
      { children }
    </StyledHintSnap>
  )
})
