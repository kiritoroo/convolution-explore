import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Transition,
  Variants, 
  useAnimate
} from 'framer-motion';
import {
  StyledImageListWraper,
  StyledImage
} from '@style2d/ImageList.styled';

interface IImageListWrapperProps {
  children: React.ReactNode
}
export const MotionImageListWrapper: React.FC<IImageListWrapperProps> = React.memo(( props ) => {
  const { children } = props;

  const transition = useRef<Transition>({
    duration: 1, staggerChildren: 0.2
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, height: 'auto' },
    show: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 'auto' }
  })

  return (
    <StyledImageListWraper
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate="show"
      exit="exit"
    >
      { children }
    </StyledImageListWraper>
  )
})

interface IImageProps {
  src: string
}
export const MotionImage:React.FC<IImageProps> = React.memo(( props ) => {
  const { src } = props;

  const transition = useRef<Transition>({
    duration: 1
  })

  const variants = useRef<Variants>({
    hidden: { opacity: 0, y: '-100%' },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0 }
  })

  return (
    <StyledImage 
      src={ src }
      variants={ variants.current }
      transition={ transition.current }
    />
  )
})