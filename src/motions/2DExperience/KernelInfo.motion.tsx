import React, { Children, useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledContainer,
  StyledInfoWrapper,
  StyledInfoLabel,
  StyledInfoCategory,
  StyledInfoDescription
} from '@style2d/KernelInfo.styled';

interface IContainer {
  children: React.ReactNode
  isFocusKernel: boolean
  onClick: () => void
}
export const MotionContainer: React.FC<IContainer> = React.memo(( props) => {
  const { children, isFocusKernel, onClick } = props;

  const transition = useRef<Transition>({
    duration: 0.5
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, pointerEvents: 'none' },
    enter: { opacity: 1, pointerEvents: 'all' },
    exit: { opacity: 0, pointerEvents: 'none' },
  })

  return (
    <StyledContainer
      onClick={ onClick }
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate={ isFocusKernel ? "enter" : "hidden" }
      exit="exit"
      >
      { children }
    </StyledContainer>
  )
})

interface IInfoWrapperProps {
  children: React.ReactNode
  isFocusKernel: boolean
}
export const MotionInfoWrapper: React.FC<IInfoWrapperProps> = React.memo(( props ) => {
  const { children, isFocusKernel } = props;

  const transition = useRef<Transition>({
    duration: 0.5, staggerChildren: 0.05
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, height: 'auto' },
    show: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 'auto' }
  })

  return (
    <StyledInfoWrapper
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate="show"
      exit="exit"
    >
      { children }
    </StyledInfoWrapper>
  )
})

interface IInfoLabelProps {
  children: React.ReactNode
}
export const MotionInfoLabel: React.FC<IInfoLabelProps> = React.memo(( props) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 0.5
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, y: '100%' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  })

  return (
    <StyledInfoLabel
      variants={ variants.current }
      transition={ transition.current }
    >
      { children }
    </StyledInfoLabel>
  )
})

interface IInfoCategoryProps {
  children: React.ReactNode
}
export const MotionInfoCategory: React.FC<IInfoCategoryProps> = React.memo(( props) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 0.5
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, y: '100%' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  })

  return (
    <StyledInfoCategory
      variants={ variants.current }
      transition={ transition.current }
    >
      { children }
    </StyledInfoCategory>
  )
})

interface IInfoDescriptionProps {
  children: React.ReactNode
}
export const MotionInfoDescription: React.FC<IInfoDescriptionProps> = React.memo(( props) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 0.5
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, y: '100%' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  })

  return (
    <StyledInfoDescription
      variants={ variants.current }
      transition={ transition.current }
    >
      { children }
    </StyledInfoDescription>
  )
})