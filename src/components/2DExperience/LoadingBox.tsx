import React from "react"
import * as S from '@style2d/LoadingBox.styled';

interface Props {

}

export const LoadingBox = ( props: Props ) => {

  const trans = { duration: 1, ease: "easeInOut" };
  const variants = {
    hidden: { opacity: 1 },
    enter: { opacity: 1, transition: trans },
    exit: { opacity: 0, transition: trans }
  };

  return (
    <React.Fragment>
      <S.StyledContainer
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}>
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
      </S.StyledContainer>
    </React.Fragment>
  )
}