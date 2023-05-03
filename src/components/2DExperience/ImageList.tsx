import React, { useCallback, useMemo, useTransition } from "react";
import { assets } from "@asset/index";
import * as S from '@style2d/ImageList.styled';
import * as M from '@motion2d/ImageList.motion';

import { useRecoilValue, useSetRecoilState } from "recoil";
import { colorModeState, cursorContentState, isCollapseVezKernelCategoryState, isCollapseVisualState, isFocusKernelInfoState, resourcesState, selectedImageInfoState, selectedImageTextureState } from "@store/atoms";

interface Props {

}

export const ImageList = React.memo(( props: Props ) => {
  const setImageTexture = useSetRecoilState(selectedImageTextureState);
  const setImageInfo = useSetRecoilState(selectedImageInfoState);
  const assetsResouces = useRecoilValue(resourcesState);
  const [isPending, startTransition] = useTransition();
  const setIsCollapseVisual = useSetRecoilState(isCollapseVisualState);
  const setIsFocusKernelInfo = useSetRecoilState(isFocusKernelInfoState);
  const setIsCollapseVezKernelCategory = useSetRecoilState(isCollapseVezKernelCategoryState);
  const colorMode = useRecoilValue(colorModeState);

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
      <M.MotionImageWrapper
        onClick={ () => handleSelectImage(item.name, item.by) }
        key={ index }>
        < S.StyledImage
          colorMode={ colorMode }
          src={item.path}/>
      </M.MotionImageWrapper>
    ))
  }, [colorMode])

  const renderedImageListItem = useMemo<JSX.Element[]>(() => {
    return createImageListItem()
  }, [colorMode])

  return (
    <S.StyledContainer>
      <M.MotionImageListWrapper>
      { renderedImageListItem }
      </M.MotionImageListWrapper>
    </S.StyledContainer>
  )
})