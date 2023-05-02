import React, { useCallback, useMemo, useTransition } from "react";
import { assets } from "@asset/index";
import * as S from '@style2d/ImageList.styled';
import * as M from '@motion2d/ImageList.motion';

import { useRecoilValue, useSetRecoilState } from "recoil";
import { cursorContentState, isCollapseVezKernelCategoryState, isCollapseVisualState, isFocusKernelInfoState, resourcesState, selectedImageInfoState, selectedImageTextureState } from "@store/atoms";

interface Props {

}

export const ImageList = React.memo(( props: Props ) => {
  const setImageTexture = useSetRecoilState(selectedImageTextureState);
  const setImageInfo = useSetRecoilState(selectedImageInfoState);
  const assetsResouces = useRecoilValue(resourcesState);
  const [isPending, startTransition] = useTransition();
  const setIsCollapseVisual = useSetRecoilState(isCollapseVisualState);
  const setIsFocusKernelInfo = useSetRecoilState(isFocusKernelInfoState);
  const setIsCollapseVezKernelCategory = useSetRecoilState(isCollapseVezKernelCategoryState)

  const handleSelectImage = useCallback((name: string, by: string) => {
    setIsCollapseVezKernelCategory(true)
    setIsFocusKernelInfo(true);
    startTransition(() => {
      setIsCollapseVisual(false);
      setImageTexture(assetsResouces[`${name}`])
      setImageInfo({by: by, name: name})
    })
  }, [])

  const createImageListItem = useCallback(() => {
    return assets.map((item, index) => (
      <S.StyledImageWrapper
        onClick={ () => handleSelectImage(item.name, item.by) }
        key={ index }>
        <M.MotionImage src={item.path}></M.MotionImage>
      </S.StyledImageWrapper>
    ))
  }, [])

  const renderedImageListItem = useMemo<JSX.Element[]>(() => {
    return createImageListItem()
  }, [])

  return (
    <S.StyledContainer>
      <M.MotionImageListWrapper>
      { renderedImageListItem }
      </M.MotionImageListWrapper>
    </S.StyledContainer>
  )
})