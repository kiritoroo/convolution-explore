import React, { useCallback, useEffect, useState } from "react";
import {
  isCollapseVezKernelCategoryState,
  isCollapseHozKernelCategoryState
} from '@store/atoms'
import {
  kernelCategoryDataSelector
} from '@store/selectors'
import { useRecoilState, useRecoilValue } from "recoil";
import { KernelCategoryItem } from "@comp2d/KernelCategoryItem";
import * as S from '@style2d/KernelCategory.styled';
import * as M from '@motion2d/KernelCategory.motion';

interface IProps {}

export const KernelCategory = React.memo((props: IProps) => {
  const [isShowButtonCollapseHoz, setisShowButtonCollapseHoz] = useState<boolean>(false)
  const kernelCategoryData = useRecoilValue(kernelCategoryDataSelector);
  const [ isCollapseVez, setIsCollapseVez ] = useRecoilState(isCollapseVezKernelCategoryState);
  const [ isCollapseHoz, setIsCollapseHoz ] = useRecoilState(isCollapseHozKernelCategoryState);
  
  const handleButtonCollapseVezClick = useCallback(() => {
    setIsCollapseVez((prevState) => !prevState);
  }, []);

  const handleButtonCollapseHozClick = useCallback(() => {
    setIsCollapseHoz((prevState) => !prevState);
  }, []);

  return (
    <React.Fragment>
      <S.StyledContainer>
        <M.MotionButtonCollapseVez 
          isCollapseVez={isCollapseVez}
          onClick={handleButtonCollapseVezClick}>
          <M.MotionIconCollapseVez 
            isCollapseVez={isCollapseVez}/>
        </M.MotionButtonCollapseVez>

        <S.StyledBoudingRectCollapseHoz
          onMouseMove={() => setisShowButtonCollapseHoz(true)}
          onMouseLeave={() => setisShowButtonCollapseHoz(false)}>
          <M.MotionButtonCollapseHoz
            isCollapseVez={isCollapseVez}
            isCollapseHoz={isCollapseHoz}
            isShowButtonCollapseHoz={isShowButtonCollapseHoz}
            onClick={handleButtonCollapseHozClick}>
            <M.MotionIconCollapseHoz
              isCollapseHoz={isCollapseHoz}/>
          </M.MotionButtonCollapseHoz>
        </S.StyledBoudingRectCollapseHoz>

        {/* <M.MotionCategoryListWrapper> */}
          {kernelCategoryData.categoryList && kernelCategoryData.categoryList.map((item, index) => (
            <M.MotionCategoryWrapper
             key={item.id}
             isCollapseVez={isCollapseVez}
             index={index}>
              <KernelCategoryItem categoryData={item}/>
            </M.MotionCategoryWrapper>
          ))}
        {/* </M.MotionCategoryListWrapper> */}
      </S.StyledContainer>
    </React.Fragment>
  )
})