import React, { useEffect } from 'react'
import * as S from '@style2d/Loading.styled'
import * as M from '@motion2d/Loading.motion'

interface IProps {
}

export const Loading = React.memo((props: IProps) => {

  useEffect(() => {
    console.log('Loading re:render')
  }, [])

  return (
    <React.Fragment>
      <S.StyledContainer>
        <M.MotionDotWrapper>
          <M.MotionDot/>
          <M.MotionDot/>
          <M.MotionDot/>
        </M.MotionDotWrapper>
      </S.StyledContainer>
    </React.Fragment>
  )
})
