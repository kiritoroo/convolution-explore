import React, { useMemo } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef, useEffect, useCallback } from 'react';
import { Variant, useAnimation, useInView } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { cursorVariantState, isLoadingState } from "@store/atoms";
import * as S from '@style2d/Logo.styled';
import * as M from '@motion2d/Logo.motion';
import { useTranslation } from "react-i18next";

interface Props {

}

export const Logo = ( props: Props ) => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const { t, i18n } = useTranslation();
  const text = useMemo<string>(() => (
    t('navbar.title')
  ), [i18n.language])

  const animCtrl = useAnimation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = useCallback(() => {
    if (location.pathname === '/') return;
    setIsLoading(true)
    navigate('/');
  }, []);

  const setCursorVariant = useSetRecoilState(cursorVariantState);
  
  const handleMouseEnter = useCallback(() => {
    setCursorVariant("hoverlink")
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVariant("default")
  }, [])

  const handleLoading = useCallback((isLoading: boolean) => {
    if (!isLoading) {
      animCtrl.start("visible");
    }
    if (isLoading) {
      animCtrl.start("hidden");
    }
  }, [])

  useEffect(() => {
    handleLoading(isLoading);
  }, [isLoading, text]);

  const createCharacters = useCallback((content: string) => {
    return content.split(" ").map((word, index) => (
      <M.MotionWord
        key={ index }
        animCtrl={ animCtrl }
        index={ index }>
        {word.split("").map((character, index) => (
          <M.MotionCharacter
            key={ index }>
            { character }
          </M.MotionCharacter>
        ))}
      </M.MotionWord>
    ))
  }, [animCtrl])

  const renderedCharacters = useMemo<JSX.Element[]>(() => {
    return createCharacters(text);
  }, [text])

  return (
    <React.Fragment>
      <S.StyledContainer  
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        onClick={handleLogoClick}>
        { renderedCharacters }
      </S.StyledContainer>
    </React.Fragment>
  )
}