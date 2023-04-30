import React from "react"
import * as S from '@style2d/LoadingBox.styled';
import * as M from '@motion2d/LoadingBox.motion';
interface Props {

}

export const LoadingBox = ( props: Props ) => {

  return (
    <React.Fragment>
      <M.MotionContainer>
        <S.StyledCubeWrapper>
          <S.StyledCubeFront/>
          <S.StyledCubeBack/>
          <S.StyledCubeLeft/>
          <S.StyledCubeRight/>
          <S.StyledCubeTop/>
          <S.StyledCubeBottom/>
        </S.StyledCubeWrapper>
        <S.StyledHint>
        </S.StyledHint>
      </M.MotionContainer>
    </React.Fragment>
  )
}