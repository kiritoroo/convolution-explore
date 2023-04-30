import React, { useEffect, useLayoutEffect, useTransition } from 'react';
import { Navbar } from '@comp/2DExperience/Navbar';
import { KernelCategory } from "@comp2d/KernelCategory"
import { ShowcaseCanvas } from '@comp/3DExperience/showcase/ShowcaseCanvas';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { KernelCardList } from '@comp/2DExperience/KernelCardList';
import { cursorVariantState, kernelCategoryDataState } from '@store/atoms';
import { kernelCategory as data } from "@asset/data/kernelCategory";
import { LoadingBox } from '@comp/2DExperience/LoadingBox';
import { isLoadingState } from '@store/atoms';

interface Props {

}

export default function ShowcasePage( props: Props ) {
  const setKernelCategoryData = useSetRecoilState(kernelCategoryDataState);
  const [isPending, startTransition] = useTransition();
  const isLoading = useRecoilValue(isLoadingState);

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
      { !isLoading && <KernelCategory/> }
      {/* <KernelCardList/> */}
      { !isLoading &&  <Navbar/> }
    </React.Fragment>
  )
}