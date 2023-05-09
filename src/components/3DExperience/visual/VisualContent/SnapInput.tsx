import { TColor, TKernelData } from "@type/index";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import * as S from '@style3d/VisualContent/SnapInput.styled';
import * as M from '@motion3d/SnapInput.motion';
import { SetterOrUpdater, useRecoilState } from "recoil";
import { isSnapKernelState } from "@store/atoms";

interface Props {
  isSnap: boolean
  kernelData: TKernelData
  colorMode: string
  snapRGb: TColor[]
  snapGray: number[]
}

export const SnapInput = (props: Props) => {
  const { kernelData, colorMode, snapRGb, snapGray, isSnap } = props;
  const [isShowContent, setIsShowContent] = useState(false);
  
  useEffect(() => {
    setIsShowContent(isSnap);
  }, [isSnap])

  const createMatrixRGB = useCallback((matrix: TColor[]) => {
    return (
      <S.StyledFlexMatrixVez>
        {Array.from({ length: kernelData.size }, (_, i) => (
          <S.StyledFlexMatrixHoz key={i}>
            {Array.from({ length: kernelData.size }, (_, j) => (
              <S.StyledMatrixItem key={`${i}-${j}`}>
                <S.StyledInputColor
                  color={`rgb(
                    ${matrix[i*kernelData.size+j].r},
                    ${matrix[i*kernelData.size+j].g},
                    ${matrix[i*kernelData.size+j].b})`}/>
                <S.StyledInputValue
                  color={`rgb(${matrix[i*kernelData.size+j].r}, 0, 0)`}>
                  { matrix[i*kernelData.size+j].r }
                </S.StyledInputValue>
                <S.StyledInputValue
                  color={`rgb(0, ${matrix[i*kernelData.size+j].g}, 0)`}>
                  { matrix[i*kernelData.size+j].g }
                </S.StyledInputValue>
                <S.StyledInputValue
                  color={`rgb(0, 0, ${matrix[i*kernelData.size+j].g})`}>
                  { matrix[i*kernelData.size+j].b }
                </S.StyledInputValue> 
              </S.StyledMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
      </S.StyledFlexMatrixVez>
    )
  }, [kernelData])

  const createMatrixGray = useCallback((matrix: number[]) => {
    return (
      <S.StyledFlexMatrixVez>
        {Array.from({ length: kernelData.size }, (_, i) => (
          <S.StyledFlexMatrixHoz key={i}>
            {Array.from({ length: kernelData.size }, (_, j) => (
              <S.StyledMatrixItem key={`${i}-${j}`}>
                <S.StyledInputColor
                  color={`rgb(
                    ${matrix[i*kernelData.size+j]},
                    ${matrix[i*kernelData.size+j]},
                    ${matrix[i*kernelData.size+j]})`}/>
                <S.StyledInputValue
                  color={`rgb(
                    ${matrix[i*kernelData.size+j]},
                    ${matrix[i*kernelData.size+j]},
                    ${matrix[i*kernelData.size+j]})`}>
                  { matrix[i*kernelData.size+j] }
                </S.StyledInputValue> 
              </S.StyledMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
      </S.StyledFlexMatrixVez>
    )
  }, [kernelData])

  const renderedMatrixGray = useMemo<JSX.Element>(() => {
    if (snapGray.length > 0) {
      return createMatrixGray(snapGray);
    }
    return <></>
  }, [snapGray])

  const renderedMatrixRGB = useMemo<JSX.Element>(() => {
    if (snapRGb.length > 0) {
      return createMatrixRGB(snapRGb);
    }
    return <></>
  }, [snapRGb])
  
  return (
    <S.StyledContainer>
      <S.StyledPointWrapper>
        <S.StyledHint>Window Input</S.StyledHint>
        <M.MotionContentWrapper
          isShow={ isShowContent }>
          <S.StyledLabelWrapper>
            Input Window
          </S.StyledLabelWrapper>
          { colorMode == 'rgb' ? renderedMatrixRGB : renderedMatrixGray }
        </M.MotionContentWrapper>
        <S.StyledPoint onClick={() => setIsShowContent(!isShowContent)}/>
      </S.StyledPointWrapper>
    </S.StyledContainer>
  )
}