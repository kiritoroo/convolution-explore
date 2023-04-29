import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Transition,
  Variants, 
  AnimatePresence,
  useAnimate,
  AnimationControls
} from 'framer-motion';
import { 
  StyledWord,
  StyledCharacter
} from '@style2d/Logo.styled'

interface IWordProps {
  children: React.ReactNode
  index: number
  animCtrl: AnimationControls
}
export const MotionWord: React.FC<IWordProps> = React.memo(( props ) => {
  const { children, index, animCtrl } = props

  const transition = useRef<Transition>({
    type: 'spring', eae: 'easeIn', delayChildren: index * 0.25, staggerChildren: 0.1
  })

  const variants = useRef<Variants>({
    hidden: {},
    visible: {}
  })

  return (
    <StyledWord
      variants={ variants.current }
      transition={ transition.current }
      initial="hidden"
      animate={ animCtrl }
    >
      { children }
    </StyledWord>
  )
})

interface ICharacterProps {
  children: React.ReactNode
}
export const MotionCharacter: React.FC<ICharacterProps> = React.memo(( props ) => {
  const { children } = props

  const variants = useRef<Variants>({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: -5 }
  })

  return (
    <StyledCharacter
      variants={ variants.current }
    >
      { children }
    </StyledCharacter>
  )
})