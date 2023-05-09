import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedKernelSelector } from "@store/selectors";
import { TKernelData, TKernelInfo } from "@type/index";
import * as S from '@style3d/VisualContent/WindowInput.styled';
import * as M from '@motion3d/WindowInput.motion';

interface Props {
  isSnap: boolean
  kernelInfo: TKernelInfo
  kernelData: TKernelData 
}

export const WindowInput = (props: Props) => {
  const { kernelInfo, kernelData, isSnap } = props;
  const [isShowContent, setIsShowContent] = useState(false);

  const randIndicesAnim= useMemo<number[]>(() => (
    kernelData.size ? Math.indices1DCenter2Outside(kernelData.size, kernelData.size) : []
  ), [kernelData])
  
  // useEffect(() => {
  //   setIsShowContent(isSnap);
  // }, [isSnap])

  const createMatrix = useCallback((matrix: number[][]) => {
    return (
      <S.StyledFlexMatrixVez>
        {matrix.map((row: number[], i: number) => (
          <S.StyledFlexMatrixHoz key={i}>
            {row.map((value: number, j: number) => (
              <M.MotionMatrixItem 
                key={`${i}-${j}-${Math.random()*value}-${matrix[0].length}`}
                delay={randIndicesAnim.indexOf(i*matrix[0].length+j)}
                isShow={isShowContent}>
                { Number.isInteger(value) ? value: value.toFixed(1) }
              </M.MotionMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
      </S.StyledFlexMatrixVez>
    )
  }, [isShowContent, randIndicesAnim]);
  
  const renderedMatrix = useMemo<JSX.Element>(() => {
    return createMatrix(kernelData!.matrix);
  }, [kernelData, isShowContent, randIndicesAnim]);

  return (
    <S.StyledContainer>
      <S.StyledPointWrapper>
        <S.StyledHint>Kernel Info</S.StyledHint>
        <M.MotionContentWrapper
          isShow={ isShowContent }>
          <S.StyledLabelWrapper>
            {kernelInfo.label} ({kernelData.size}x{kernelData.size})
          </S.StyledLabelWrapper>
          { renderedMatrix }
        </M.MotionContentWrapper>
        <S.StyledPoint onClick={() => setIsShowContent(!isShowContent)}/>
      </S.StyledPointWrapper>
    </S.StyledContainer>
  )
} 