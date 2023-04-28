import React, { useCallback, useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import { 
  Transition,
  Variants 
} from 'framer-motion';
import {
  StyledFlexMain,
  StyledFlexChild,
  StyledLabelWrapper,
  StyledCountWrapper
} from '@style2d/KernelCategoryItem.styled'

interface IFlexMainProps {
  children: React.ReactNode
  isCollapseHoz: boolean
  isSelected: boolean
}
export const MotionFlexMain: React.FC<IFlexMainProps> = React.memo(( props ) => {
  const { children, isCollapseHoz, isSelected } = props

  const transition = useRef<Transition>({
    duration: 2, repeat: Infinity, ease: "linear"
  });

  const variants = useRef<Variants>({
    unselect: { background:
      "linear-gradient(to right, rgb(237, 230, 253, 0.5) 0%, rgb(255, 255, 255, 0.2) 100%)"
    },
    selected: !isCollapseHoz ? { background: [
      "linear-gradient(to right, rgb(197, 171, 251, 0.5) -200%, rgb(255, 255, 255, 0.2) -100%, rgb(197, 171, 251, 0.5) 0%, rgb(255, 255, 255, 0.2) 100%)",
      "linear-gradient(to right, rgb(197, 171, 251, 0.5) -100%, rgb(255, 255, 255, 0.2) 0%, rgb(197, 171, 251, 0.5) 100%, rgb(255, 255, 255, 0.2) 200%)",
      "linear-gradient(to right, rgb(197, 171, 251, 0.5) 0%, rgb(255, 255, 255, 0.2) 100%, rgb(197, 171, 251, 0.5) 200%, rgb(255, 255, 255, 0.2) 300%)"
    ]} : { background: [
      "linear-gradient(to right, rgb(216, 199, 252, 0.5) -200%, rgb(255, 255, 255, 0.2) -100%, rgb(216, 199, 252, 0.5) 0%, rgb(255, 255, 255, 0.2) 100%)",
      "linear-gradient(to right, rgb(216, 199, 252, 0.5) -100%, rgb(255, 255, 255, 0.2) 0%, rgb(216, 199, 252, 0.5) 100%, rgb(255, 255, 255, 0.2) 200%)",
      "linear-gradient(to right, rgb(216, 199, 252, 0.5) 0%, rgb(255, 255, 255, 0.2) 100%, rgb(216, 199, 252, 0.5) 200%, rgb(255, 255, 255, 0.2) 300%)"
    ]},
  });


  return (
    <StyledFlexMain
      variants={variants.current}
      transition={transition.current}
      initial={"hidden"}
      animate={ isSelected ? "selected" : "unselect" }
    >
      { children }
    </StyledFlexMain>
  )
}) 

interface ILabelWrapperProps {
  children: React.ReactNode
  isCollapseHoz: boolean,
  maxLength: number
}
export const MotionLabelWrapper: React.FC<ILabelWrapperProps> = React.memo(( props ) => {
  const { children, isCollapseHoz, maxLength } = props
  const labelRef = useRef<any>(null);
  const [ fontSize, setFontSize ] = useState<number>(0);

  const transition = useRef<Transition>({});

  const variants = useMemo<Variants>(() => ({
    hidden: { opacity: 1, scaleX: 1, width: "auto", height: 'auto' },
    collapse: { opacity: 0, scaleX: 0, width: 0, height: 0 },
    expand: { opacity: 1, scaleX: 1, width: maxLength * fontSize/2+10, height: 'auto' }
  }), [maxLength, fontSize]);

  useLayoutEffect(() => {
    if (labelRef.current) {
      setFontSize(parseFloat(window.getComputedStyle(labelRef.current).getPropertyValue("font-size")));
    }
  }, [labelRef.current]);

  return (
    <StyledLabelWrapper
      ref={labelRef}
      variants={ variants }
      transition={ transition.current }
      style={{ originX: 0, originY: 0.5 }}
      initial={ "hidden" }
      animate={ isCollapseHoz ? "collapse" : "expand" }
    >
      { children }
    </StyledLabelWrapper>
  )
})

interface ICountWrapperProps {
  children: React.ReactNode
  isCollapseHoz: boolean
}
export const MotionCountWrapper: React.FC<ICountWrapperProps> = React.memo(( props ) => {
  const { children, isCollapseHoz } = props

  const transition = useRef<Transition>({});

  const variants = useRef<Variants>({
    collapse: { opacity: 0, scale: 0, width: 0, height: 0, marginLeft: 0 },
    expand: { opacity: 1, scale: 1, width: '25px', height: '25px', marginLeft: 20 }
  });

  return (
    <StyledCountWrapper
      variants={ variants.current }
      transition={ transition.current }
      style={{ originX: 0, originY: 0.5 }}
      initial={ "collapse" }
      animate={ isCollapseHoz ? "collapse" : "expand" }
    >
      { children }
    </StyledCountWrapper>
  )
})