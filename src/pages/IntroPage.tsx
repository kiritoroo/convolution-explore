import React, { Suspense, useEffect } from 'react';
import { Navbar } from '@comp/2DExperience/Navbar';
import { IntroCanvas } from '@comp3d/Intro/IntroCanvas';
import { LoadingBox } from '@comp/2DExperience/LoadingBox';
import { Copyright } from '@comp/2DExperience/Copyright';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cursorVariantState, isLoadingState } from '@store/atoms';

interface Props {

}

export default function IntroPage( props: Props ) {
  const isLoading = useRecoilValue(isLoadingState);
  const setCursorVariant = useSetRecoilState(cursorVariantState);

  useEffect(() => {
    setCursorVariant("default")
  },[])

  return (
    <React.Fragment>
      <IntroCanvas/>
      { !isLoading && <Navbar/> }
      { !isLoading && <Copyright/> }
    </React.Fragment>
  )
}