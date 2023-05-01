import React from 'react';
import * as S from '@style2d/ButtonColorMode.styled';
import { RxPadding } from "react-icons/rx";

interface Props {

}

export const ButtonPaddingMode = React.memo(( props: Props ) => {

  return (
    <S.StyledContainer>
      <S.StyledIconWrapper>
        <RxPadding size={'2em'} color='#A882FA'/>
      </S.StyledIconWrapper>
      <S.StyledLabel>Padding</S.StyledLabel>
    </S.StyledContainer>    
  )
}) 