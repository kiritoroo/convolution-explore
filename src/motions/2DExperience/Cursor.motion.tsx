import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate
} from 'framer-motion';
import {
  StyledCursorWrapper,
  StyledCusrorBorder,
  StyledCursorDot
} from '@style2d/Cursor.styled'
import useMouse from '@react-hook/mouse-position';

interface ICursorWrapperProps {
  children: React.ReactNode
  variant: string
}
export const MotionCursorWrapper: React.FC<ICursorWrapperProps> = React.memo(( props ) => {
  const { children, variant } = props;

  const ref = React.useRef(document.getElementById('root'));

  const mouse = useMouse(ref, {
    enterDelay: 50,
    leaveDelay: 50
  });

  const mouseXPosition = useMemo<number>(() => mouse.clientX ?? -10, [mouse]);
  const mouseYPosition = useMemo<number>(() => mouse.clientY ?? -10, [mouse]);

  const transition = useRef<Transition>({
    transition: { type: "spring", stiffness: 2, damping: 2, mass: 0.2 }
  })

  const variants = useMemo<Variants>(() => ({
    default: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
    },
    hoverlink: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
    },
    hoverkernel: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
    },
    hoverimage: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2,
    },
    hoveroption: { scale: 1, opacity: 1,
      x: mouseXPosition - 100/2,
      y: mouseYPosition - 30/2
    },
    hidden: {
      opacity: 0, scale: 0
    },
    exit: {
      opacity: 0, scale: 0
    }
  }), [mouseXPosition, mouseYPosition])

  return (
    <StyledCursorWrapper
      variants={ variants }
      style={{ originX: 0.5, originY: 0.5 }}
      transition={ transition.current }
      initial="hidden"
      animate={ variant }
      exit="exit"
    >
      { children }
    </StyledCursorWrapper>
  )
})

interface ICursorBorderProps {
  children: React.ReactNode
  variant: string
}
export const MotionCursorBorder: React.FC<ICursorBorderProps> = React.memo(( props ) => {
  const { children, variant } = props;

  const transition = useRef<Transition>({
    duration: 0.5, ease: "easeInOut"
  })

  const variants = useMemo<Variants>(() => ({
    default: { borderRadius: 50, border: "0px solid white" },
    hoverlink: { borderRadius: 0, border: "1px solid white", scale: 1.5 },
    hoverkernel: { borderRadius: 0, border: "1px solid white", scale: 2 },
    hoverimage: { borderRadius: 50, border: "0px solid white" },
    hoveroption: { borderRadius: 50, border: "2px solid white", scale: 1 }
  }), [])

  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (variant == "hoverlink") {
      animate(scope.current, { rotate: 360 + 45 }, { duration: 5, repeat: Infinity })
    } 
    else if (variant == "hoverkernel") {
      animate(scope.current, { rotate: 360 + 45 }, { duration: 3, repeat: Infinity })
    } 
    else {
      animate(scope.current, { rotate: 45 }, { duration: 0.2 })
    }
  }, [variant])


  return (
    <StyledCusrorBorder
      ref={scope}
      variants={ variants }
      transition={ transition.current }
      animate={ variant }
    >
      { children }
    </StyledCusrorBorder>
  )
})

interface ICursorDotProps {
  variant: string
}
export const MotionCursorDot: React.FC<ICursorDotProps> = React.memo(( props ) => {
  const { variant } = props;

  const transition = useRef<Transition>({
    duration: 0.5, ease: "easeInOut"
  })

  const variants = useMemo<Variants>(() => ({
    default: { scale: 1 },
    hoverlink: { scale: 0.5 },
    hoverkernel: { scale: 0.3 },
    hoverimage: { scale: 0 },
    hoveroption: { scale: 0.3 }
  }), [])

  return (
    <StyledCursorDot
      variants={ variants }
      transition={ transition.current }
      animate={ variant }
    />
  )
})