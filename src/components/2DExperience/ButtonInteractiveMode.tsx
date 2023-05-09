import React, { useCallback, useTransition } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { colorModeState, interactiveModeState } from '@store/atoms';
import * as S from '@style/2DExperience/ButtonInteractiveMode.styled';
import * as M from '@motion2d/ButtonInteractiveModemotion';
import { MdLocationDisabled, MdLocationSearching } from 'react-icons/md';

interface Props {

}

export const ButtonInteractiveMode = React.memo(( props: Props ) => {
  const [interactiveMode, setInteractiveMode] = useRecoilState(interactiveModeState);
  const [isPending, startTransition] = useTransition();

  const handleChangeMode = useCallback(() => {
    startTransition(() => {
      interactiveMode == 'animate' ? setInteractiveMode('freedom') : setInteractiveMode('animate')
    })
  }, [interactiveMode])

  return (
    <S.StyledContainer
      onClick={ handleChangeMode }>
      <M.MotionModelWrapperAnim
        interactiveMode={ interactiveMode }>
        <S.StyledIconWrapperAnim>
          <MdLocationDisabled size={'1.5em'} color='#A882FA'/>
        </S.StyledIconWrapperAnim>
        <S.StyledLabelAnim>Animate Mode</S.StyledLabelAnim>
      </M.MotionModelWrapperAnim>

      <M.MotionModeWrapperFree
        interactiveMode={ interactiveMode }>
        <S.StyledIconWrapperFree>
          <MdLocationSearching size={'1.5em'} color='#A882FA'/>
        </S.StyledIconWrapperFree>
        <S.StyledLabelFree>Freedom Mode</S.StyledLabelFree>
      </M.MotionModeWrapperFree>
    </S.StyledContainer>    
  )
}) 