import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isLoadingState } from '@store/atoms';
import { kernelCategory as data } from "@asset/data/kernelCategory";
import * as S from '@style2d/Loading.styled';
import * as M from '@motion2d/Loading.motion';

interface IProps {
}

export const Loading = React.memo((props: IProps) => {
  const isLoading = useRecoilValue(isLoadingState)

  useEffect(() => {
    console.log('Loading re:render')
  }, [])

  return (
    <React.Fragment>
      <S.StyledContainer>
      {isLoading && (
        <M.MotionBackground>
          <M.MotionDotWrapper>
            <M.MotionDot/>
            <M.MotionDot/>
            <M.MotionDot/>
          </M.MotionDotWrapper>
        </M.MotionBackground>
      )}
      </S.StyledContainer>
    </React.Fragment>
  )
})
