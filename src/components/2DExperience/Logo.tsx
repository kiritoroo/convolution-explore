import React from "react"
import * as S from '@style2d/Logo.styled';
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef, useEffect, useCallback } from 'react';
import { Variant, useAnimation, useInView } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cursorVariantState, isLoadingState } from "@store/atoms";

interface Props {

}

export const Logo = ( props: Props ) => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  const text = useRef<string>('Convolution')

  const ctrls = useAnimation();
  
  const ref = useRef<any>(null)

  const isInView = useInView(ref, { once: true })

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogoClick = useCallback(() => {
    if (location.pathname === '/') {
      return;
    }
    
    setIsLoading(true)
    navigate('/');
  }, []);

  useEffect(() => {
    if (!isLoading) {
      ctrls.start("visible");
    }
    if (isLoading) {
      ctrls.start("hidden");
    }
  }, [isLoading]);

  const wordAnimation = {
    hidden: {},
    visible: {},
  };
  
  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: -5
    },
  };

  const setCursorVariant = useSetRecoilState(cursorVariantState);
  
  const handleMouseEnter = useCallback(() => {
    setCursorVariant("hoverlink")
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVariant("default")
  }, [])

  return (
    <React.Fragment>
      <S.StyledContainer  
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        onClick={handleLogoClick}>
        {text.current.split(" ").map((word, index) => {
          return (
            <S.StyledWord
              ref={ref}
              key={index}
              initial="hidden"
              animate={ctrls}
              variants={wordAnimation}
              transition={{
                type: 'spring',
                eae: 'easeIn',
                delayChildren: index * 0.25,
                staggerChildren: 0.1
              }}
            >
              {word.split("").map((character, index) => {
                return (
                  <S.StyledCharacter
                    key={index}
                    variants={characterAnimation}
                  >
                    {character}
                  </S.StyledCharacter>
                );
              })}
            </S.StyledWord>
          );
        })}
      </S.StyledContainer>
    </React.Fragment>
  )
}