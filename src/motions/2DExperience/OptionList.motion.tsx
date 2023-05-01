import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledButtonCollapse,
  StyledIconCollapse,
  StyledModeListWrapper,
  StyledImageListWrapper
} from '@style2d/OptionsList.styled';

interface IButtonCollapseProps {
  children: React.ReactNode,
  isCollapse: boolean,
  onClick: () => void
}
export const MotionButtonCollapse: React.FC<IButtonCollapseProps> = React.memo(( props ) => {
  const { children, isCollapse, onClick } = props
  
  const variants = useRef<Variants>({
    collapse: { borderBottom: 'none 0px #FFFFFF' },
    expand: { borderBottom: 'solid 1px #C5ABFB' }
  });

  const handleClick = useCallback(() => {
    onClick();
  }, [])
  
  return (
    <StyledButtonCollapse
      onClick={handleClick}
      variants={ variants.current }
      animate={ isCollapse ? 'collapse' : 'expand' }
    >
      { children }
    </StyledButtonCollapse>
  )
})

interface IIconCollapseProps {
  isCollapse: boolean
}
export const MotionIconCollapse: React.FC<IIconCollapseProps> = React.memo(( props ) => {
  const { isCollapse } = props

  const transition = useRef<Transition>({
    duration: 0.1, type: 'tween'
  });

  const variants = useRef<Variants>({
    collapse: { rotate: 0 },
    expand: { rotate: 180 }
  });

  return (
    <StyledIconCollapse
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.2 }}
      style={{ originX: 0.5, originY: 0.55 }}
      variants={ variants.current }
      transition={ transition.current }
      animate={ isCollapse ? 'collapse' : 'expand' }
    >
      <svg width="15" height="15" viewBox="0 0 20 20">
        <path d="M0 7 L 20 7 L 10 16" />
      </svg>
    </StyledIconCollapse>
  )
})

interface IModelListWrapperProps {
  children: React.ReactNode
  isCollapse: boolean
}
export const MotionModelListWrapper: React.FC<IModelListWrapperProps> = React.memo(( props ) => {
  const { children, isCollapse } = props;

  const transition = useRef<Transition>({
    duration: 0.5, delay: 0.1, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    collapse: { opacity: 0, y: -100, height: '0', pointerEvents: 'none', margin: "0 0" },
    expand: { opacity: 1, y: 0, height: 'auto', pointerEvents: 'all', margin: "20px 0" }
  });

  return (
    <StyledModeListWrapper
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0.5, originY: 0 }}
      initial={ 'collapse' }
      animate={ isCollapse ? 'collapse' : 'expand' }
    >
      { children }
    </StyledModeListWrapper>
  )
})

interface IImageListWrapperProps {
  children: React.ReactNode
  isCollapse: boolean
}
export const MotionImageListWrapper: React.FC<IImageListWrapperProps> = React.memo(( props ) => {
  const { children, isCollapse } = props;
  
  const transition = useRef<Transition>({
    duration: 0.5, delay: 0.2, type: 'keyframes'
  });

  const variants = useRef<Variants>({
    collapse: { opacity: 0, y: -100, height: '0', pointerEvents: 'none' },
    expand: { opacity: 1, y: 0, height: 'auto', pointerEvents: 'all' }
  });

  return (
    <StyledImageListWrapper
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0.5, originY: 0 }}
      initial={ 'collapse' }
      animate={ isCollapse ? 'collapse' : 'expand' }
    >
      { children }
    </StyledImageListWrapper>
  )
})