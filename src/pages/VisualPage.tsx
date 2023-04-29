import React, { useEffect } from 'react';
import { Navbar } from '@comp/2DExperience/Navbar';
import { VisualCanvas } from '@comp/3DExperience/visual/VisualCanvas';
import { useSetRecoilState } from 'recoil';
import { cursorVariantState } from '@store/atoms';

interface Props {

}

export default function VisualPage( props: Props ) {

  const setCursorVariant = useSetRecoilState(cursorVariantState);

  useEffect(() => {
    setCursorVariant("default")
  },[])
  
  return (
    <React.Fragment>
      <VisualCanvas/>
      <Navbar/>
    </React.Fragment>
  )
}