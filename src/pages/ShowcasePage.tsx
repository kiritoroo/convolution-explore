import React, { useEffect, useLayoutEffect, useTransition } from 'react';
import { Navbar } from '@comp/2DExperience/Navbar';
import { KernelCategory } from "@comp2d/KernelCategory"
import { ShowcaseCanvas } from '@comp/3DExperience/showcase/ShowcaseCanvas';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { KernelCardList } from '@comp/2DExperience/KernelCardList';
import { cursorVariantState, isFocusKernelInfoState, kernelCategoryDataState } from '@store/atoms';
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { LoadingBox } from '@comp/2DExperience/LoadingBox';
import { isLoadingState } from '@store/atoms';
import { AnimatePresence } from 'framer-motion';
import { KernelInfo } from '@comp/2DExperience/KernelInfo';

interface Props {

}

export default function ShowcasePage( props: Props ) {
  const setKernelCategoryData = useSetRecoilState(kernelCategoryDataState);
  const [isPending, startTransition] = useTransition();
  const isLoading = useRecoilValue(isLoadingState);
  const isFocusKernelInfo = useRecoilValue(isFocusKernelInfoState);

  useLayoutEffect(() => {
    startTransition(() => {
      setKernelCategoryData((prevData) => prevData ? prevData : data)
    })
  }, [])

  const setCursorVariant = useSetRecoilState(cursorVariantState);

  useEffect(() => {
    setCursorVariant("default")
  },[])

  return (
    <React.Fragment>
      <ShowcaseCanvas/>
      <AnimatePresence>
        { <KernelInfo/> }
      </AnimatePresence>
      { !isLoading && <KernelCategory/> }
      {/* <KernelCardList/> */}
      { !isLoading &&  <Navbar/> }
    </React.Fragment>
  )
}