import React, { useCallback } from "react"
import * as S from '@style2d/Navbar.styled';
import { Link, useLocation } from 'react-router-dom'
import { Logo } from "./Logo";
import { useSetRecoilState } from "recoil";
import { cursorVariantState, isLoadingState } from "@store/atoms";
import { LanguageSwitcher } from "@comp2d/LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface Props {

}

export const Navbar = ( props: Props ) => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const location = useLocation();
  const { t } = useTranslation();

  const handleOnLinkClick = useCallback((to: string) => {
    if (location.pathname === to) return;
    setIsLoading(true)
  }, [])

  const setCursorVariant = useSetRecoilState(cursorVariantState);
  
  const handleMouseEnter = useCallback(() => {
    setCursorVariant("hoverlink")
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVariant("default")
  }, [])

  return (
    <React.Fragment>
      <S.StyledContainer>
        <Logo/>

        <S.StyledLinkListWrapper>
          <S.StyledLinkWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link to='/showcase' onClick={() => handleOnLinkClick('/showcase')}>{t('navbar.showcase')}</Link>
          </S.StyledLinkWrapper>

          <S.StyledLinkWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link to='/visual' onClick={() => handleOnLinkClick('/visual')}>{t('navbar.visual')}</Link>
          </S.StyledLinkWrapper>

          <LanguageSwitcher/>
        </S.StyledLinkListWrapper>

      </S.StyledContainer>
    </React.Fragment>
  )
}