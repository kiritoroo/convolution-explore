import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  isCollapseVezKernelCategoryState,
  isCollapseHozKernelCategoryState,
  selectedCategoryState,
  isFocusKernelInfoState,
  isRenderSceneState,
  cursorVariantState,
  isCollapseVisualState
} from '@store/atoms'
import {
  kernelCategoryDataSelector
} from '@store/selectors'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { KernelCategoryItem } from "@comp2d/KernelCategoryItem";
import { KernelList } from "@comp2d/KernelList"
import * as S from '@style2d/KernelCategory.styled';
import * as M from '@motion2d/KernelCategory.motion';
import { TKernelCategory } from "@type/index";

interface IProps {}

export const KernelCategory = React.memo((props: IProps) => {
  const [ isShowButtonCollapseHoz, setIsShowButtonCollapseHoz ] = useState<boolean>(false)
  const { categoryList } = useRecoilValue(kernelCategoryDataSelector);
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const [ isCollapseVez, setIsCollapseVez ] = useRecoilState(isCollapseVezKernelCategoryState);
  const [ isCollapseHoz, setIsCollapseHoz ] = useRecoilState(isCollapseHozKernelCategoryState);
  const [isFocusKernelInfo, setIsFocusKernelInfo] = useRecoilState(isFocusKernelInfoState)
  const setIsRenderScene = useSetRecoilState(isRenderSceneState);
  const setCursorVariant = useSetRecoilState(cursorVariantState);
  const setIsCollapseVisual = useSetRecoilState(isCollapseVisualState);

  const handleButtonCollapseVezClick = useCallback(() => {
    setIsRenderScene(true)
    setIsCollapseVez((prevState) => !prevState);
    setIsFocusKernelInfo(false)
    setIsCollapseVisual(true)
  }, []);

  const handleButtonCollapseHozClick = useCallback(() => {
    setIsCollapseHoz((prevState) => !prevState);
  }, []);

  const handleBoudingRectCollapseHozMouseMove = useCallback(() => {
    setIsShowButtonCollapseHoz(true);
  }, []);

  const handleBoudingRectCollapseHozMouseLeave = useCallback(() => {
    setIsShowButtonCollapseHoz(false);
  }, []);

  const handleCollapseVez = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setCursorVariant("hoveroption")
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVariant("default")
  }, [])

  useEffect(() => {
    handleCollapseVez()
  }, [isCollapseVez])

  const createCategoryListItem = useCallback((categoryList: TKernelCategory[]) => {
    return categoryList.map((item, index) => (
      <M.MotionCategoryWrapper
        key={item.id}
        isCollapseVez={isCollapseVez}
        index={index}>
        <KernelCategoryItem categoryData={item}/>
      </M.MotionCategoryWrapper>
    ))
  }, [isCollapseVez]);

  const renderedCategoryListItem = useMemo<JSX.Element[]>(() => {
    return createCategoryListItem(categoryList ?? [])
  }, [categoryList, isCollapseVez])

  return (
    <M.MotionContainer
      onMouseEnter={ handleMouseEnter }
      onMouseLeave={ handleMouseLeave }>
      <M.MotionButtonCollapseVez 
        isCollapseVez={isCollapseVez}
        onClick={handleButtonCollapseVezClick}>
        <M.MotionIconCollapseVez 
          isCollapseVez={isCollapseVez}/>
      </M.MotionButtonCollapseVez>

      <S.StyledBoudingRectCollapseHoz
        onMouseMove={handleBoudingRectCollapseHozMouseMove}
        onMouseLeave={handleBoudingRectCollapseHozMouseLeave}>
        <M.MotionButtonCollapseHoz
          isCollapseVez={isCollapseVez}
          isCollapseHoz={isCollapseHoz}
          isShowButtonCollapseHoz={isShowButtonCollapseHoz}
          onClick={handleButtonCollapseHozClick}>
          <M.MotionIconCollapseHoz
            isCollapseHoz={isCollapseHoz}/>
        </M.MotionButtonCollapseHoz>
      </S.StyledBoudingRectCollapseHoz>

      { renderedCategoryListItem }

      <KernelList/>
    </M.MotionContainer>
  )
})