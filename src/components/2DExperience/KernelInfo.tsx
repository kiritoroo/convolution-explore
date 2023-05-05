import React, { useCallback, useMemo, useTransition } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedKernelSelector } from "@store/selectors";
import { isCollapseVezKernelCategoryState, isCollapseVisualState, isFocusKernelInfoState, isRenderSceneState } from "@store/atoms";
import * as S from '@style2d/KernelInfo.styled';
import * as M from '@motion2d/KernelInfo.motion';
import { VisualControls } from "./ConvolutionVisual/VisualControls";
import { useTranslation } from "react-i18next";

interface Props {

}

export const KernelInfo = React.memo(( props: Props ) => {
  const kernel = useRecoilValue(selectedKernelSelector)
  const [isPending, startTransition] = useTransition();
  const setIsCollapseVezKernelCategory = useSetRecoilState(isCollapseVezKernelCategoryState);
  const [isFocusKernel, setIsFocusKernelInfo] = useRecoilState(isFocusKernelInfoState);
  const setIsRenderScene = useSetRecoilState(isRenderSceneState);
  const [isCollapseVisual, setIsCollapseVisual] = useRecoilState(isCollapseVisualState);
  const { t } = useTranslation();

  const handleOnUnSelect = useCallback(() => {
    setIsRenderScene(true)
    startTransition(() => {
      setIsFocusKernelInfo(false)
      setIsCollapseVisual(true)
      setIsCollapseVezKernelCategory(false)
    })
  }, [])

  const handleButtonCollapseVisualClick = useCallback(() => {
    setIsCollapseVisual((prevState) => !prevState);
  }, [])

  const createMatrix = useCallback((matrix: number[][]) => {
    return (
      <S.StyledFlexMatrixVez>
        {matrix.map((row: number[], i: number) => (
          <S.StyledFlexMatrixHoz key={i}>
            {row.map((value: number, j: number) => (
              <S.StyledMatrixItem 
                key={`${i}-${j}`}>
                { Number.isInteger(value) ? value: value.toFixed(1) }
              </S.StyledMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
      </S.StyledFlexMatrixVez>
    )
  }, []);
  
  const renderedMatrix = useMemo<JSX.Element>(() => {
    return createMatrix(kernel.data!.matrix);
  }, [kernel.data]);

  return (
    <React.Fragment>
      <M.MotionContainer 
        isFocusKernel={isFocusKernel }>
        <M.MotionInfoWrapper 
          onClick={ handleOnUnSelect }
          isCollapse={ isCollapseVisual }
          isFocusKernel={isFocusKernel}>
          <M.MotionInfoLabel>
            { t(`kernelinfo.${kernel.info?.categoryid}.info.${kernel.info?.id}.label`) } ({kernel.data?.size}x{kernel.data?.size})
          </M.MotionInfoLabel>
          <M.MotionInfoCategory>
            { t(`kernelinfo.${kernel.info?.categoryid}.short`) }
          </M.MotionInfoCategory>
          <M.MotionMatrixWrapper
            isCollapse={ isCollapseVisual }>
            { renderedMatrix }
          </M.MotionMatrixWrapper>
          <M.MotionInfoDescription
            isCollapse={ isCollapseVisual }>
            { t(`kernelinfo.${kernel.info?.categoryid}.info.${kernel.info?.id}.description`) }
          </M.MotionInfoDescription>
        </M.MotionInfoWrapper>

        <M.MotionVisualWrapper
          onClick={ () => {} }
          // onClick={ handleOnUnSelect }
          isCollapse={ isCollapseVisual }>
          <VisualControls/>
        </M.MotionVisualWrapper>

        <S.StyledBoudingRectCollapseVisualz>
          <M.MotionButtonCollapseVisual
            isCollapse={ isCollapseVisual }
            onClick={ handleButtonCollapseVisualClick }>
              <M.MotionIconCollapseVisual
              isCollapse={ isCollapseVisual }/>
          </M.MotionButtonCollapseVisual>
        </S.StyledBoudingRectCollapseVisualz>
      </M.MotionContainer>
    </React.Fragment>
  )
})
