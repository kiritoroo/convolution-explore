import React, { useCallback, useTransition } from 'react';
import { VscColorMode } from "react-icons/vsc";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { colorModeState } from '@store/atoms';
import * as S from '@style2d/ButtonColorMode.styled';
import * as M from '@motion2d/ButtonColorMode.motion';

interface Props {

}

export const ButtonColorMode = React.memo(( props: Props ) => {
  const [colorMode, setColorMode] = useRecoilState(colorModeState);
  const [isPending, startTransition] = useTransition();

  const handleChangeColorMode = useCallback(() => {
    startTransition(() => {
      colorMode == 'rgb' ? setColorMode('gray') : setColorMode('rgb')
    })
  }, [colorMode])

  return (
    <S.StyledContainer
      onClick={ handleChangeColorMode }>
      <M.MotionModelWrapperRGB
        colorMode={ colorMode }>
        <S.StyledIconWrapperRGB>
          <VscColorMode size={'2em'} color='#A882FA'/>
        </S.StyledIconWrapperRGB>
        <S.StyledLabelRGB>RGB</S.StyledLabelRGB>
      </M.MotionModelWrapperRGB>

      <M.MotionModeWrapperGray
        colorMode={ colorMode }>
        <S.StyledIconWrapperGray>
          <VscColorMode size={'2em'} color='#aaaaaa'/>
        </S.StyledIconWrapperGray>
        <S.StyledLabelGray>Gray</S.StyledLabelGray>
      </M.MotionModeWrapperGray>
    </S.StyledContainer>    
  )
}) 