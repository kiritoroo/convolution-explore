import React from 'react';
import * as S from '@style2d/ButtonColorMode.styled';
import { VscColorMode } from "react-icons/vsc";

interface Props {

}

export const ButtonColorMode = React.memo(( props: Props ) => {

  return (
    <S.StyledContainer>
      <S.StyledIconWrapper>
        <VscColorMode size={'2em'} color='#A882FA'/>
      </S.StyledIconWrapper>
      <S.StyledLabel>RGB</S.StyledLabel>
    </S.StyledContainer>    
  )
}) 