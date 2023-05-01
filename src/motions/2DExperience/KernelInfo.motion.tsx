import React, { useCallback, useEffect, useRef } from 'react';
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
  StyledInfoDescription,
  StyledMatrixWrapper,
  StyledButtonCollapseVisual,
  StyledIconCollapseVisual,
  StyledVisualWrapper
} from '@style2d/KernelInfo.styled';

interface IContainer {
  children: React.ReactNode
  isFocusKernel: boolean
}
export const MotionContainer: React.FC<IContainer> = React.memo(( props) => {
  const { children, isFocusKernel } = props;

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
  isCollapse: boolean
  onClick: () => void
}
export const MotionInfoWrapper: React.FC<IInfoWrapperProps> = React.memo(( props ) => {
  const { children, isFocusKernel, isCollapse, onClick } = props;

  const transition = useRef<Transition>({
    duration: 0.5, staggerChildren: 0.05
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, height: 'auto' },
    show: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 'auto' }
  })

  const [scope, animate] = useAnimate()
 
  const handleAnimateCollapseVisual = useCallback((isCollapse: boolean) => {
    if (isCollapse) {
      animate(scope.current, { width: 600 }, { duration: 0.3 })
    } else {
      animate(scope.current, { width: 300 }, { duration: 0.3 })
    }
  }, [])

  useEffect(() => {
    handleAnimateCollapseVisual(isCollapse)
  }, [isCollapse])

  return (
    <StyledInfoWrapper
      ref={ scope }
      onClick={ onClick }
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate={isFocusKernel ? "show" : "hidden"}
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
  isCollapse: boolean
}
export const MotionInfoDescription: React.FC<IInfoDescriptionProps> = React.memo(( props) => {
  const { children, isCollapse } = props;

  const transition = useRef<Transition>({
    duration: 0.5
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, y: '100%' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  })

  const [scope, animate] = useAnimate()

  const handleAnimateCollapseVez = useCallback((isCollapse: boolean) => {
    if (isCollapse) {
      animate(scope.current, { width: 600, fontSize: '1em' }, { duration: 0.3 })
    } else {
      animate(scope.current, { width: 300, fontSize: '0.75em' }, { duration: 0.3 })
    }
  }, [])

  useEffect(() => {
    handleAnimateCollapseVez(isCollapse)
  }, [isCollapse])

  return (
    <StyledInfoDescription
      ref={ scope }
      variants={ variants.current }
      transition={ transition.current }
    >
      { children }
    </StyledInfoDescription>
  )
})

interface IMatrixWrapperPorps {
  children: React.ReactNode
  isCollapse: boolean
}
export const MotionMatrixWrapper: React.FC<IMatrixWrapperPorps> = React.memo(( props ) => {
  const { children, isCollapse } = props;

  const transition = useRef<Transition>({
    duration: 0.5
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 }
  })

  const [scope, animate] = useAnimate()

  const handleAnimateCollapseVez = useCallback((isCollapse: boolean) => {
    if (isCollapse) {
      animate(scope.current, { width: 600, scale: 1, margin: 20 }, { duration: 0.3 })
    } else {
      animate(scope.current, { width: 300, scale: 0.8, margin: 0 }, { duration: 0.3 })
    }
  }, [])

  useEffect(() => {
    handleAnimateCollapseVez(isCollapse)
  }, [isCollapse])

  return (
    <StyledMatrixWrapper
      ref={ scope }
      variants={ variants.current }
      transition={ transition.current }
    >
      { children }
    </StyledMatrixWrapper>
  )
})

interface IButtonCollapseVisualProps {
  children: React.ReactNode,
  isCollapse: boolean,
  onClick: () => void
}
export const MotionButtonCollapseVisual: React.FC<IButtonCollapseVisualProps> = React.memo(( props ) => {
  const { children, isCollapse, onClick } = props

  const variants = useRef<Variants>({
    collapse: { opacity: 1, scale: 1, left: -10, pointerEvents: 'all' },
    expand: { opacity: 1, scale: 1, left: 0, pointerEvents: 'all' }
  });

  const handleClick = useCallback(() => {
    onClick();
  }, [])
  
  return (
    <StyledButtonCollapseVisual
      onClick={handleClick}
      variants={ variants.current }
      initial={ !isCollapse ? 'expand' : 'collapse' }
      animate={ !isCollapse ? 'expand' : 'collapse' }
    >
      { children }
    </StyledButtonCollapseVisual>
  )
})

interface IIconCollapseVisualProps {
  isCollapse: boolean
}
export const MotionIconCollapseVisual: React.FC<IIconCollapseVisualProps> = React.memo(( props ) => {
  const { isCollapse } = props

  const transition = useRef<Transition>({
    duration: 0.1, type: 'tween'
  });

  const variants = useRef<Variants>({
    collapse: { rotate: -90 },
    expand: { rotate: 90 }
  });

  return (
    <StyledIconCollapseVisual
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
      style={{ originX: 0.5, originY: 0.55 }}
      variants={ variants.current }
      transition={ transition.current }
      initial={ 'collapse' }
      animate={ isCollapse ? 'collapse' : 'expand' }
    >
      <svg width="15" height="15" viewBox="0 0 20 20">
        <path d="M0 7 L 20 7 L 10 16" />
      </svg>
    </StyledIconCollapseVisual>
  )
})

interface IVisualWrapperProps {
  children: React.ReactNode
  isCollapse: boolean
  onClick: () => void
}
export  const MotionVisualWrapper: React.FC<IVisualWrapperProps> = React.memo(( props ) => {
  const { children, isCollapse, onClick } = props;
  const transition = useRef<Transition>({
    duration: 0.3, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    collapse: { opacity: 0, scale: 0, height: 0, width: '0', marginLeft: 0 },
    expand: { opacity: 1, scale: 1, height: 'auto', width: 'auto', marginLeft: 50 }
  });

  return (
    <StyledVisualWrapper
      onClick={ onClick }
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0.5, originY: 0 }}
      initial={ 'collapse' }
      animate={ isCollapse ? 'collapse' : 'expand' }
    >
      { children }
    </StyledVisualWrapper>
  )
})