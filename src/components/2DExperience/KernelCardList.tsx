import React, { useCallback, useMemo } from "react"
import * as S from '@style2d/KernelCardList.styled';
import { KernelCardItem } from "./KernelCardItem";
import { kernelCategoryDataSelector } from "@store/selectors";
import { useRecoilValue } from "recoil";
import { TKernelCategory } from "@type/index";

export const KernelCardList = () => {
  const { categoryList } = useRecoilValue(kernelCategoryDataSelector);

  const createKernelCardList = useCallback((categoryList: TKernelCategory[]) => {
    return categoryList.map((item, index) => 
      item.infoList.map((kernelInfo) => (
        <S.StyledKernelCardWrapper
          key={kernelInfo.id}>
          <KernelCardItem
            kernelInfo={kernelInfo}/>
        </S.StyledKernelCardWrapper>
      ))
    )
  }, [])

  const renderedKernelCardList = useMemo<JSX.Element[][]>(() => {
    return createKernelCardList(categoryList ?? [])
  }, [categoryList])

  return (
    <React.Fragment>
        <S.StyledContainer>
          <S.StyledKernelCardListWrapper>
            { renderedKernelCardList }
          </S.StyledKernelCardListWrapper>
        </S.StyledContainer>
    </React.Fragment>
  )
}