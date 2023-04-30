import React, { useCallback, useTransition } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedKernelSelector } from "@store/selectors";
import { isCollapseVezKernelCategoryState, isFocusKernelInfoState, isRenderSceneState } from "@store/atoms";
import * as S from '@style2d/KernelInfo.styled';
import * as M from '@motion2d/KernelInfo.motion';
import { VisualControls } from "./ConvolutionVisual/VisualControls";

interface Props {

}

export const KernelInfo = React.memo(( props: Props ) => {
  const selectedKernel = useRecoilValue(selectedKernelSelector)
  const [isPending, startTransition] = useTransition();
  const setIsCollapseVezKernelCategory = useSetRecoilState(isCollapseVezKernelCategoryState)
  const [isFocusKernel, setIsFocusKernelInfo] = useRecoilState(isFocusKernelInfoState)
  const setIsRenderScene = useSetRecoilState(isRenderSceneState);

  const handleOnUnSelect = useCallback(() => {
    setIsRenderScene(true)
    startTransition(() => {
      setIsFocusKernelInfo(false)
      setIsCollapseVezKernelCategory(false)
    })
  }, [])

  return (
    <React.Fragment>
      <M.MotionContainer 
        isFocusKernel={isFocusKernel }
        onClick={ handleOnUnSelect }>
        <M.MotionInfoWrapper isFocusKernel={isFocusKernel}>
          <M.MotionInfoLabel>
            { selectedKernel.info?.label } ({selectedKernel.data?.size}x{selectedKernel.data?.size})
          </M.MotionInfoLabel>
          <M.MotionInfoCategory>
            { selectedKernel.info?.categoryid }
          </M.MotionInfoCategory>
          <M.MotionInfoDescription>
            { selectedKernel.info?.description }
          </M.MotionInfoDescription>
        </M.MotionInfoWrapper>

        <S.StyledVisualWrapper>
          <VisualControls/>
        </S.StyledVisualWrapper>
      </M.MotionContainer>
    </React.Fragment>
  )
})
