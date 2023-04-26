import React, { ReactNode, useMemo } from "react";
import { BiFilterAlt, BiSun, BiCustomize, BiTrendingUp } from 'react-icons/bi'
import { TbLine, TbPuzzle } from 'react-icons/tb'
import { IoDiamondOutline } from 'react-icons/io5'
import { TKernelCategory } from "@type/index";
import {
  isCollapseHozKernelCategoryState
} from '@store/atoms';
import {
  kernelCategoryDataSelector
} from '@store/selectors';
import { useRecoilValue } from "recoil";
import * as S from '@style2d/KernelCategoryItem.styled';
import * as M from '@motion2d/KernelCategoryItem.motion';

type TCategoryIconMap = {
  [key: string]: React.ReactNode;
}

interface Props {
  categoryData: TKernelCategory
}

export const KernelCategoryItem = React.memo(( props: Props ) => {
  const { categoryData } = props

  const kernelCategoryData = useRecoilValue(kernelCategoryDataSelector)
  const isCollapseHoz = useRecoilValue(isCollapseHozKernelCategoryState)

  const categoryIconMap = useMemo<TCategoryIconMap>(() => ({
    filtering: <BiFilterAlt size={'1.5em'} color='#A882FA'/>,
    intensity: <BiSun size={'1.5em'} color='#A882FA'/>,
    edge: <TbLine size={'1.5em'} color='#A882FA'/>,
    segmentation: <TbPuzzle  size={'1.5em'} color='#A882FA'/>,
    enhancement: <BiTrendingUp size={'1.5em'} color='#A882FA'/>,
    special: <IoDiamondOutline size={'1.5em'} color='#83B0F2'/>,
    custom: <BiCustomize size={'1.5em'} color='#83B0F2'/>,
  }), []);

  const maxLengthLabel = useMemo(() => (
    kernelCategoryData.categoryList!.reduce((maxLength , item) => {
      const labelLength = item.label.length
      return labelLength > maxLength ? labelLength : maxLength;
    }, 0)
  ), [])

  return (
    <React.Fragment>
      <S.StyledContainer>
        <M.MotionFlexMain
          isSelected={false}
          isCollapseHoz={isCollapseHoz}>
          <S.StyledFlexChild>
            <S.StyledIconWrapper>
              { categoryIconMap[`${categoryData.id}`]}
            </S.StyledIconWrapper>
            <M.MotionLabelWrapper
              isCollapseHoz={isCollapseHoz}
              maxLength={maxLengthLabel}>
              { categoryData.label }
            </M.MotionLabelWrapper>
          </S.StyledFlexChild>
          <M.MotionCountWrapper
            isCollapseHoz={isCollapseHoz}>
            { kernelCategoryData.dataCountById[`${categoryData.id}`] }
          </M.MotionCountWrapper>
        </M.MotionFlexMain>
      </S.StyledContainer>
    </React.Fragment>
  )
})