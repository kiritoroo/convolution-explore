import React, { useCallback , useTransition} from 'react';
import { RxPadding, RxStop } from "react-icons/rx";
import * as S from '@style2d/ButtonPaddingMode.styled';
import * as M from '@motion2d/ButtonPaddingMode.motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isPaddingModeState } from '@store/atoms';

interface Props {

}

export const ButtonPaddingMode = React.memo(( props: Props ) => {
  const [isPadding, setIsPadding] = useRecoilState(isPaddingModeState);
  const [isPending, startTransition] = useTransition();

  const handleChangePaddingMode = useCallback(() => {
    startTransition(() => {
      setIsPadding((prevState) => !prevState)
    })
  }, [isPadding])

  return (
    <S.StyledContainer
      onClick={ handleChangePaddingMode }>
      <M.MotionModeWrapperNoPadding
        isPadding={ isPadding }>
        <S.StyledIconWrapperNoPadding>
          <RxStop size={'2em'} color='#A882FA'/>
        </S.StyledIconWrapperNoPadding>
        <S.StyledLabelNoPadding>No Padding</S.StyledLabelNoPadding>
      </M.MotionModeWrapperNoPadding>

      <M.MotionModeWrapperPadding
        isPadding={ isPadding }>
        <S.StyledIconWrapperPadding>
          <RxPadding size={'2em'} color='#A882FA'/>
        </S.StyledIconWrapperPadding>
        <S.StyledLabelPadding>Padding</S.StyledLabelPadding>
      </M.MotionModeWrapperPadding>
    </S.StyledContainer>    
  )
}) 