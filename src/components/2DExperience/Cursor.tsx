import React, { useRef, useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { cursorContentState, cursorVariantState } from "@store/atoms";
import useMouse from "@react-hook/mouse-position";
import { Transition, Variants, animate, useAnimate } from "framer-motion";
import * as S from '@style2d/Cursor.styled';
import * as M from '@motion2d/Cursor.motion';

interface Props {

}

export const Cursor = ( props: Props ) => {
  const cursorContent = useRecoilValue(cursorContentState);
  const cursorVariant = useRecoilValue(cursorVariantState);

  return (
    <S.StyledContainer>
      <M.MotionCursorWrapper
        variant={ cursorVariant }>
        <M.MotionCursorBorder
          variant={ cursorVariant }>
          <M.MotionCursorDot variant={ cursorVariant }/>
        </M.MotionCursorBorder>

        <S.StyledLabelWrapper>
          { cursorContent }
        </S.StyledLabelWrapper>
      </M.MotionCursorWrapper>
    </S.StyledContainer>
  )
}