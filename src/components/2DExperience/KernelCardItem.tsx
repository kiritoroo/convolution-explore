import { TKernelInfo } from '@type/index'
import React, { useCallback, useMemo, useState, useTransition } from 'react'
import * as S from '@style2d/KernelCardItem.styled';

interface Props {
  kernelInfo: TKernelInfo
}

export const KernelCardItem = ( props: Props ) => {
  const { kernelInfo } = props

  const sizeList = useMemo(() => {
    return kernelInfo.dataList.map(item => item.size)
  }, [kernelInfo]) 

  const [ selectedSize, setSelectedSize ] = useState(sizeList[0])
  const [ selectedData, setSelectedData ] = useState(kernelInfo.dataList.find(item => item.size === selectedSize)); 

  const [isPending, startTransition] = useTransition();

  const handleSelectedSize = useCallback((size: number) => {
    startTransition(() => {
      setSelectedSize(size);
      setSelectedData(kernelInfo.dataList.find(item => item.size === size))
    });
  }, []);

  const createMatrix = useCallback((matrix: number[][]) => {
    return (
      <S.StyledFlexMatrixVez>
        {matrix.map((row: number[], i: number) => (
          <S.StyledFlexMatrixHoz key={i}>
            {row.map((value: number, j: number) => (
              <S.StyledMatrixItem
                key={`${i}-${j}`}>
                {value}
              </S.StyledMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
      </S.StyledFlexMatrixVez>
    )
  }, []);

  const createSizeListItem = useCallback((sizeList: number[]) => {
    return sizeList.map((item) => (
      <S.StyledButtonSize
        key={item}
        onClick={() => handleSelectedSize(item)}>
        {item}x{item}
      </S.StyledButtonSize>
    ))
  }, [])

  const renderedSizeListItem = useMemo<JSX.Element[]>(() => {
    return createSizeListItem(sizeList);
  }, [selectedSize])
  
  const renderedMatrix = useMemo<JSX.Element>(() => {
    return createMatrix(selectedData!.matrix);
  }, [selectedData]);

  return (
    <React.Fragment>
      <S.StyledContainer>

        <S.StyledSizeListWrapper>
          { renderedSizeListItem }
        </S.StyledSizeListWrapper>

        <S.StyledMatrixWrapper>
          { renderedMatrix }
        </S.StyledMatrixWrapper>

        <S.StyledLabel>
          { kernelInfo.label }
        </S.StyledLabel>
  
      </S.StyledContainer>
    </React.Fragment>
  )
}