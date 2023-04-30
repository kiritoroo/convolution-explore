import React, { useRef, useEffect, useImperativeHandle } from "react";
import * as S from '@style2d/ConvolutionVisual/VisualProcess.styled';
import { useRecoilValue } from "recoil";
import { selectedKernelSelector } from "@store/selectors";

interface Props {

}

interface Refs {
  divRects1d: HTMLDivElement[]
}

export const VisualProcess = React.memo(React.forwardRef<Refs, Props>(( props, ref ) => {
  const kernel = useRecoilValue(selectedKernelSelector);

  const matrixRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => {
    return {
      divRects1d: Array.from(matrixRef.current!.childNodes).flatMap((rowNodes) => {
        return Array.from(rowNodes.childNodes).map((itemNodes) => {
          return itemNodes.childNodes[0] as HTMLDivElement
        })
      })
    }
  }, [matrixRef.current, kernel])

  return (
    <S.StyledContainer>
      <S.StyledLabelIn>Window Slice ({kernel.data?.size}x{kernel.data?.size})</S.StyledLabelIn>
      <S.StyledMatrixWrapper>
        <S.StyledFlexMatrixVez ref={ matrixRef }>
        {Array.from({ length: kernel.data!.size }, (_, i) => (
          <S.StyledFlexMatrixHoz key={i}>
            {Array.from({ length: kernel.data!.size }, (_, j) => (
              <S.StyledMatrixItem key={`${i}-${j}`}>
                <S.StyledInputValue></S.StyledInputValue>
                <S.StyledKernelValue>
                  {kernel.matrix1D[i*kernel.data!.size+j]}
                </S.StyledKernelValue>
              </S.StyledMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
        </S.StyledFlexMatrixVez>
      </S.StyledMatrixWrapper>
    </S.StyledContainer>
  )
}))
