import React, { useCallback } from "react"
import * as S from '@style2d/Navbar.styled';
import { Link, useLocation } from 'react-router-dom'
import { Logo } from "./Logo";
import { useSetRecoilState } from "recoil";
import { cursorVariantState, isLoadingState } from "@store/atoms";

interface Props {

}

export const Navbar = ( props: Props ) => {
  const setIsLoading = useSetRecoilState(isLoadingState);

  const location = useLocation();

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
            <Link to='/showcase' onClick={() => handleOnLinkClick('/showcase')}>Kernels Showcase</Link>
          </S.StyledLinkWrapper>

          <S.StyledLinkWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link to='/visual' onClick={() => handleOnLinkClick('/visual')}>Visualization</Link>
          </S.StyledLinkWrapper>
        </S.StyledLinkListWrapper>

      </S.StyledContainer>
    </React.Fragment>
  )
}