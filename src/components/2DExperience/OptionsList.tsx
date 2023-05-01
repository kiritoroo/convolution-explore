import React, { useCallback, useMemo } from "react";
import { assets } from "@asset/index";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cursorVariantState, isCollapseOptionListState } from "@store/atoms";
import { ImageList } from "./ImageList";
import { ButtonColorMode } from "./ButtonColorMode";
import { ButtonPaddingMode } from "./ButtonPaddingMode";
import * as S from '@style2d/OptionsList.styled';
import * as M from '@motion2d/OptionList.motion';

interface Props {

}

export const OptionsList = React.memo(( props ) => {
  const [isCollapseOption, setIsCollapseOption] = useRecoilState(isCollapseOptionListState);
  const setCursorVariant = useSetRecoilState(cursorVariantState);

  const handleButtonCollapseClick = useCallback(() => {
    setIsCollapseOption((prevState) => !prevState);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setCursorVariant("hoveroption")
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVariant("default")
  }, [])

  return (
    <S.StyledContainer
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }>
      <M.MotionButtonCollapse 
        isCollapse={ isCollapseOption }
        onClick={ handleButtonCollapseClick }>
        <M.MotionIconCollapse 
          isCollapse={isCollapseOption}/>
      </M.MotionButtonCollapse>

      <M.MotionModelListWrapper
        isCollapse={ isCollapseOption }>
        <ButtonColorMode/>
        <ButtonPaddingMode/>
      </M.MotionModelListWrapper>

      <M.MotionImageListWrapper
        isCollapse={ isCollapseOption }>
        <ImageList/>
      </M.MotionImageListWrapper>
    </S.StyledContainer>
  )
})