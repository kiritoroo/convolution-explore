import React, { useEffect, useLayoutEffect, useTransition } from 'react';
import { Navbar } from '@comp/2DExperience/Navbar';
import { VisualCanvas } from '@comp/3DExperience/visual/VisualCanvas';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cursorVariantState, isLoadingState, resourcesState, selectedImageInfoState, selectedImageTextureState, selectedKernelState, selectedSizeState } from '@store/atoms';
import { assets } from "@asset/index"
import { OptionsList } from '@comp/2DExperience/OptionsList';
import { ControlsList } from '@comp/2DExperience/ControlsList';
import { kernelCategoryDataSelector } from '@store/selectors';

interface Props {

}

export default function VisualPage( props: Props ) {
  const { infoList } = useRecoilValue(kernelCategoryDataSelector);
  const assetsResouces = useRecoilValue(resourcesState);
  const setCursorVariant = useSetRecoilState(cursorVariantState);
  const setSelectedImageTexture = useSetRecoilState(selectedImageTextureState);
  const setSelectedImageInfo = useSetRecoilState(selectedImageInfoState);
  const setSelectedKernel = useSetRecoilState(selectedKernelState);
  const setSelectedSize = useSetRecoilState(selectedSizeState);
  const isLoading = useRecoilValue(isLoadingState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCursorVariant("default")
  },[])

  useEffect(() => {
    if (infoList.length != 0) {
      setSelectedKernel({ info: infoList[0], data: infoList[0].dataList[0] })
      setSelectedSize(infoList[0].dataList[0].size);
    }
  }, [infoList])

  useEffect(() => {
    if (Object.keys(assetsResouces).length > 0) {
      startTransition(() => {
        setSelectedImageTexture(assetsResouces["art-48pixel-1"]);
        setSelectedImageInfo({by: assets[0].by, name: "art-48pixel-1"});
      })
    }
  }, [assetsResouces])

  return (
    <React.Fragment>
      <VisualCanvas/>
      { !isLoading && <OptionsList/> }
      { !isLoading && <Navbar/> }
      { !isLoading && <ControlsList/> }
    </React.Fragment>
  )
}