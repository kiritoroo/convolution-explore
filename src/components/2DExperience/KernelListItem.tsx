import React, { useCallback, useEffect, useMemo, useState } from "react"
import * as S from '@style2d/KernelListItem.styled';
import * as M from '@motion2d/KernelListItem.motion';
import { TKernelData, TKernelInfo } from "@type/index";
import { selectedKernelState } from "@store/atoms";
import { selectedKernelSelector } from "@store/selectors";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

interface Props {
  info: TKernelInfo
  data: TKernelData
}

export const KernelListItem = React.memo(( props: Props ) => {
  const { info, data } = props

  const [ isSelected, setIsSelected ] = useState(false)
  const selectedKernel = useRecoilValue(selectedKernelSelector)
  const setSelectedKernel = useSetRecoilState(selectedKernelState)
  const { t } = useTranslation();

  const handleMatrixClick = useCallback(() => {
    setSelectedKernel( {info, data} )
  }, [])

  const handleIsSelected = useCallback(() => {
    selectedKernel.data?.matrix === data.matrix
      ? setIsSelected(true)
      : setIsSelected(false)
  }, [selectedKernel])

  useEffect(() => {
    handleIsSelected()
  }, [selectedKernel])

  const createMatrix = useCallback((matrix: number[][]) => {
    return (
      <S.StyledFlexMatrixVez>
        {matrix.map((row: number[], i: number) => (
          <S.StyledFlexMatrixHoz key={i}>
            {row.map((value: number, j: number) => (
              <M.MotionMatrixItem 
                key={`${i}-${j}`}
                index={i*data.size+j}
                isSelected={isSelected}>
                { Number.isInteger(value) ? value: value.toFixed(1) }
              </M.MotionMatrixItem>
            ))}
          </S.StyledFlexMatrixHoz>
        ))}
      </S.StyledFlexMatrixVez>
    )
  }, [isSelected]);
  
  const renderedMatrix = useMemo<JSX.Element>(() => {
    return createMatrix(data.matrix);
  }, [data.matrix, data.size, isSelected]);

  return (
    <React.Fragment>
      <S.StyledContainer>
        <S.StyledLabelWrapper>
          { t(`kernelinfo.${info.categoryid}.info.${info.id}.label`) }
        </S.StyledLabelWrapper>

        <M.MotionMatrixWrapper
          onClick={handleMatrixClick}
          isSelected={ isSelected }>
          { renderedMatrix }
        </M.MotionMatrixWrapper>
      </S.StyledContainer>
    </React.Fragment>
  )
})