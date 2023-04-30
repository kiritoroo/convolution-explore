import React from 'react';
import * as S from '@style/2DExperience/ConvolutionVisual/VisualControls.styled';
import { VisualInput } from './VisualInput';
import { VisualOutput } from './VisualOutput';
interface Props {

}

export const VisualControls = React.memo((props: Props) => {

  return (
    <S.StyledContainer>
      <S.StyledLabel>
        Convolution
      </S.StyledLabel>
      <S.StyledVisualWrapper>
        <VisualInput/>
        <VisualOutput/>
      </S.StyledVisualWrapper>
      <S.StyledHint>
        Hover over the matries to change kernel position
      </S.StyledHint> 
    </S.StyledContainer>
  )
})
