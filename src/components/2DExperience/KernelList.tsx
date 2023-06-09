import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { resourcesState, selectedImageTextureState, selectedSizeState } from "@store/atoms";
import { selectedCategorySelector } from "@store/selectors";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { KernelListItem } from "@comp2d/KernelListItem";
import * as S from '@style2d/KernelList.styled';
import * as M from '@motion2d/KernelList.motion';
import { TKernelData, TKernelInfo } from "@type/index";

interface Props {}

export const KernelList = React.memo(( props: Props ) => {
  const selectedCategory = useRecoilValue(selectedCategorySelector);
  const [lastSelectedCategory, setLastSelectedCategory] = useState(selectedCategory)
  
  const { category: currCategory, sizeList: currSizeList } = selectedCategory
  const { sizeList: lastSizeList, dataListBySizeObj: lastDataListBySizeObj } = lastSelectedCategory

  const [selectedSize, setSelectedSize] = useRecoilState(selectedSizeState)
  const setSelectedImageTexture = useSetRecoilState(selectedImageTextureState);
  const assetsResouces = useRecoilValue(resourcesState);

  const [isPending, startTransition] = useTransition();

  const handleSelectCategory = useCallback(() => {
    if (selectedCategory.category) {
      startTransition(() => {
        setLastSelectedCategory(selectedCategory)
        setSelectedSize(selectedCategory.sizeList[0] ?? undefined)
      })
    }
  }, [selectedCategory]);

  const handleSelectedSize = useCallback((size: number) => {
    startTransition(() => {
      setSelectedSize(size);
    });
    // startTransition(() => {
    //   setSelectedImageTexture(assetsResouces[`default-${size}`])
    // });
  }, []);

  useEffect(() => {
    handleSelectCategory()
  }, [selectedCategory])

  const createSizeListItem = useCallback((sizeList: number[]) => {
    return sizeList.map((item) => (
      <S.StyledButtonSize
        key={item}
        onClick={() => handleSelectedSize(item)}>
        {item}x{item}
      </S.StyledButtonSize>
    ))
  }, [])

  const createKernelListItem = useCallback((dataList: {info: TKernelInfo, data: TKernelData}[]) => {
    return (dataList).map((item, index) => (
      <M.MotionKernelItemWrapper
        key={`${item.info.id}-${item.data.size}`}
        index={index}>
        <KernelListItem
          info={item.info}
          data={item.data}/>
      </M.MotionKernelItemWrapper>
    ))
  }, [])

  const renderedSizeListItem = useMemo<JSX.Element[]>(() => {
    return createSizeListItem(lastSizeList);
  }, [lastSizeList])

  const renderedKernelListItem = useMemo<JSX.Element[]>(() => {
    return createKernelListItem(lastDataListBySizeObj[`${selectedSize}`] || [])
  }, [lastDataListBySizeObj, selectedSize])

  return (
    <React.Fragment>
      <M.MotionContainer
        isShow={currCategory!=null}>
        <S.StyledSizeListWrapper>
          { renderedSizeListItem }
        </S.StyledSizeListWrapper>
 
        <M.MotionKernelListWrapper
          selectedSize={selectedSize}>
          { renderedKernelListItem }
        </M.MotionKernelListWrapper>
        <S.StyledGradientBottom/>
      </M.MotionContainer>
    </React.Fragment>
  )
})
