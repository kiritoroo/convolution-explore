import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledButtonCollapseVez,
  StyledIconCollapseVez,
  StyledButtonCollapseHoz,
  StyledIconCollapseHoz,
  StyledCategoryListWrapper,
  StyledCategoryWrapper
} from '@style2d/KernelCategory.styled'

interface IButtonCollapseVezProps {
  children: React.ReactNode,
  isCollapseVez: boolean,
  onClick: () => void
}
export const MotionButtonCollapseVez: React.FC<IButtonCollapseVezProps> = React.memo(( props ) => {
  const { children, isCollapseVez, onClick } = props
  
  const variants = useRef<Variants>({
    collapse: { borderBottom: 'none 0px #FFFFFF' },
    expand: { borderBottom: 'solid 1px #C5ABFB' }
  });

  const handleClick = useCallback(() => {
    onClick();
  }, [])
  
  return (
    <StyledButtonCollapseVez
      onClick={handleClick}
      variants={ variants.current }
      animate={ isCollapseVez ? 'collapse' : 'expand' }
    >
      { children }
    </StyledButtonCollapseVez>
  )
})

interface IIconCollapseVezProps {
  isCollapseVez: boolean
}
export const MotionIconCollapseVez: React.FC<IIconCollapseVezProps> = React.memo(( props ) => {
  const { isCollapseVez } = props

  const transition = useRef<Transition>({
    duration: 0.1, type: 'tween'
  });

  const variants = useRef<Variants>({
    collapse: { rotate: 0 },
    expand: { rotate: 180 }
  });

  return (
    <StyledIconCollapseVez
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
      style={{ originX: 0.5, originY: 0.55 }}
      variants={ variants.current }
      transition={ transition.current }
      animate={ isCollapseVez ? 'collapse' : 'expand' }
    >
      <svg width="15" height="15" viewBox="0 0 20 20">
        <path d="M0 7 L 20 7 L 10 16" />
      </svg>
    </StyledIconCollapseVez>
  )
})

interface IButtonCollapseHozProps {
  children: React.ReactNode,
  isCollapseVez: boolean,
  isCollapseHoz: boolean,
  isShowButtonCollapseHoz: boolean,
  onClick: () => void
}
export const MotionButtonCollapseHoz: React.FC<IButtonCollapseHozProps> = React.memo(( props ) => {
  const { children, isCollapseVez, isCollapseHoz, isShowButtonCollapseHoz, onClick } = props

  const variants = useRef<Variants>({
    collapse: { opacity: 0, scale: 1, left: -10, pointerEvents: 'none' },
    expand: { opacity: 1, scale: 1, left: 0, pointerEvents: 'all' }
  });

  const handleClick = useCallback(() => {
    onClick();
  }, [])
  
  return (
    <StyledButtonCollapseHoz
      onClick={handleClick}
      variants={ variants.current }
      initial={ !isCollapseVez && (!isCollapseHoz || isShowButtonCollapseHoz) ? 'expand' : 'collapse' }
      animate={ !isCollapseVez && (!isCollapseHoz || isShowButtonCollapseHoz) ? 'expand' : 'collapse' }
    >
      { children }
    </StyledButtonCollapseHoz>
  )
})

interface IIconCollapseHozProps {
  isCollapseHoz: boolean
}
export const MotionIconCollapseHoz: React.FC<IIconCollapseHozProps> = React.memo(( props ) => {
  const { isCollapseHoz } = props

  const transition = useRef<Transition>({
    duration: 0.1, type: 'tween'
  });

  const variants = useRef<Variants>({
    collapse: { rotate: -90 },
    expand: { rotate: 90 }
  });

  return (
    <StyledIconCollapseHoz
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
      style={{ originX: 0.5, originY: 0.55 }}
      variants={ variants.current }
      transition={ transition.current }
      initial={ isCollapseHoz ? 'collapse' : 'expand' }
      animate={ isCollapseHoz ? 'collapse' : 'expand' }
    >
      <svg width="15" height="15" viewBox="0 0 20 20">
        <path d="M0 7 L 20 7 L 10 16" />
      </svg>
    </StyledIconCollapseHoz>
  )
})

interface ICategoryListWrapperProps {
  children: React.ReactNode
}
export const MotionCategoryListWrapper: React.FC<ICategoryListWrapperProps> = React.memo(( props ) => {
  const { children } = props

  return (
    <StyledCategoryListWrapper>
      { children }
    </StyledCategoryListWrapper>
  )
})

interface ICategoryWrapperProps {
  children: React.ReactNode
  isCollapseVez: boolean
  index: number
}
export const MotionCategoryWrapper: React.FC<ICategoryWrapperProps> = React.memo(( props ) => {
  const { children, isCollapseVez, index } = props

  const transition = useRef<Transition>({
    duration: 0.2, delay: index * 0.05, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    collapse: { opacity: 0, scale: 0, height: 0, width: 0 },
    expand: { opacity: 1, scale: 1, height: 'auto' }
  });

  const [scope, animate] = useAnimate()

  const handleAnimateCollapseVez = useCallback((isCollapse: boolean) => {
    if (isCollapse) {
      animate(scope.current, { width: 0 }, { duration: 0.3, delay: index * 0.06 })
    } else {
      animate(scope.current, { width: 'auto' }, { duration: 0.5, delay:  -0.1 })
    }
  }, [])

  useEffect(() => {
    handleAnimateCollapseVez(isCollapseVez)
  }, [isCollapseVez])

  return (
    <StyledCategoryWrapper
      ref={scope}
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0.5, originY: 0 }}
      initial={ isCollapseVez ? 'collapse' : 'expand' }
      animate={ isCollapseVez ? 'collapse' : 'expand' }
    >
      { children }
    </StyledCategoryWrapper>
  )
})
