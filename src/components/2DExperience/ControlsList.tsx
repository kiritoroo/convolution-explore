import React, { useCallback, useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import * as S from '@style2d/ControlsList.styled';
import * as M from '@motion2d/ControlsList.motion';
import { MdWindow } from 'react-icons/md';
import { RiSpeedLine } from 'react-icons/ri';
import { GiResize } from 'react-icons/gi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { kernelCategoryDataSelector, selectedKernelSelector } from '@store/selectors';
import { BsDiamond } from 'react-icons/bs';
import { ISpeedInfo, TKernelInfo } from '@type/index';
import { interactiveModeState, isPlayAnimConvolutionState, isResetAnimConvolutionState, isSnapKernelState, selectedAnimSpeedState, selectedKernelState, selectedSizeState } from '@store/atoms';
import { ButtonInteractiveMode } from './ButtonInteractiveMode';
import { BiPlayCircle, BiRefresh } from 'react-icons/bi';

export const ControlsList = () => {
  const { infoList } = useRecoilValue(kernelCategoryDataSelector);
  const speedList = useRef<ISpeedInfo[]>([
    { id: 'slow', label: 'Slow', speed: 50 },
    { id: 'normal', label: 'Normal', speed: 20 },
    { id: 'Fast', label: 'Fast', speed: 5 },
    { id: 'Flash', label: 'Flash', speed: 3 },
  ])
  const setSelectedKernel = useSetRecoilState(selectedKernelState);
  const selectedKernel = useRecoilValue(selectedKernelSelector);
  const timeOutIds: Array<any> = []
  const interactiveMode = useRecoilValue(interactiveModeState);

  const sizeList = useMemo<number[]>(() => (
    selectedKernel.info!.dataList.map((item => item.size))
  ),[selectedKernel])

  const [isOpenKernelList, setIsOpenKernelList] = useState(false);
  const [isOpenSpeedList, setIsOpenSpeedList] = useState(false);
  const [isOpenSizeList, setisOpenSizeList] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useRecoilState(selectedAnimSpeedState);
  const [selectedSize, setSelectedSize] = useRecoilState(selectedSizeState);
  const [isPlayAnimConvolution, setIsPlayAnimConvolution] = useRecoilState(isPlayAnimConvolutionState);
  const [isResetAnimConvolution, setIsResetAnimConvolution] = useRecoilState(isResetAnimConvolutionState);
  const setInteractiveMode = useSetRecoilState(interactiveModeState);

  const optionKernelLabelRef = useRef<HTMLDivElement>(null);
  const optionSpeedLabelRef = useRef<HTMLDivElement>(null);
  const optionSizeLabelRef = useRef<HTMLDivElement>(null);

  const handleOptionKernelClick = useCallback(() => {
    setIsOpenKernelList((prevState) => !prevState);
    setIsOpenSpeedList(false)
    setisOpenSizeList(false)
  }, [])

  const handleOptionSpeedClick = useCallback(() => {
    setIsOpenKernelList(false);
    setIsOpenSpeedList((prevState) => !prevState)
    setisOpenSizeList(false)
  }, [])

  const handleOptionSizeClick = useCallback(() => {
    setIsOpenKernelList(false);
    setIsOpenSpeedList(false)
    setisOpenSizeList((prevState) => !prevState)
  }, [])

  const handleItemKernelClick = useCallback((info: TKernelInfo) => {
    setSelectedKernel({ info: info, data: info.dataList[0] })
    setSelectedSize(info.dataList[0].size);
  }, [])

  const handleItemSpeedClick = useCallback((info: ISpeedInfo) => {
    setSelectedSpeed(info);
  }, [])

  const handleItemSizeClick = useCallback((size: number) => {
    setSelectedSize(size);
    setSelectedKernel({ info: selectedKernel.info!, data: selectedKernel.info?.dataList.filter((item) => item.size == size)[0]! })
  }, [selectedKernel])

  useLayoutEffect(() => {
    setSelectedSpeed(speedList.current[1])
  }, [])

  useEffect(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpenKernelList) {
        setIsOpenKernelList(false)
      }
    }, 1000))
  }, [isOpenKernelList])

  useEffect(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpenSpeedList) {
        setIsOpenSpeedList(false)
      }
    }, 1000))
  }, [isOpenSpeedList])

  useEffect(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpenSizeList) {
        setisOpenSizeList(false)
      }
    }, 1000))
  }, [isOpenSizeList])

  const handleMouseEnterKernelList = useCallback(() => {
    timeOutIds.forEach((id) => clearTimeout(id))
    setIsOpenKernelList(true)
  }, [timeOutIds])

  const handleMouseLeaveKernelList = useCallback(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpenKernelList) {
        setIsOpenKernelList(false)
      }
    }, 500))
  }, [isOpenKernelList, timeOutIds])

  const handleMouseEnterSpeedList = useCallback(() => {
    timeOutIds.forEach((id) => clearTimeout(id))
    setIsOpenSpeedList(true)
  }, [timeOutIds])

  const handleMouseLeaveSpeedList= useCallback(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpenSpeedList) {
        setIsOpenSpeedList(false)
      }
    }, 500))
  }, [isOpenSpeedList, timeOutIds])

  const handleMouseEnterSizeList = useCallback(() => {
    timeOutIds.forEach((id) => clearTimeout(id))
    setisOpenSizeList(true)
  }, [timeOutIds])

  const handleMouseLeaveSizeList= useCallback(() => {
    timeOutIds.push(setTimeout(() => {
      if (isOpenSizeList) {
        setisOpenSizeList(false)
      }
    }, 500))
  }, [isOpenSizeList, timeOutIds])

  const createKernelList = useCallback((list: TKernelInfo[]) => {
    return (list.map((item, index) => (
      <M.MotionMenuItem 
        key={ item.id }
        index={ index }
        isOpen={ isOpenKernelList }
        isSelect={ selectedKernel.info?.id == item.id }
        onClick={() => handleItemKernelClick(item)}>
        <BsDiamond size={'0.75em'} color='#A882FA'/>
        <S.StyledMenuLabel>{ item.label }</S.StyledMenuLabel>
      </M.MotionMenuItem>
    )))
  }, [isOpenKernelList, selectedKernel])

  const renderedKernelList = useMemo<JSX.Element[]>(() => {
    return createKernelList(infoList)
  }, [infoList, isOpenKernelList, selectedKernel])

  const createSpeedList = useCallback((list: ISpeedInfo[]) => {
    return (list.map((item, index) => (
      <M.MotionMenuItem
        index={index} 
        key={item.id}
        isOpen={ isOpenSpeedList }
        isSelect={ selectedSpeed === item }
        onClick={() => handleItemSpeedClick(item)}>
        <BsDiamond size={'0.75em'} color='#A882FA'/>
        <S.StyledMenuLabel>{ item.label }</S.StyledMenuLabel>
      </M.MotionMenuItem>
    )))
  }, [isOpenSpeedList, selectedSpeed])

  const renderedSpeedList = useMemo<JSX.Element[]>(() => {
    return createSpeedList(speedList.current)
  }, [speedList.current, isOpenSpeedList, selectedSpeed])

  const createSizeList = useCallback((list: number[]) => {
    return (list.map((item, index) => (
      <M.MotionMenuItem
        index={index} 
        key={item}
        isOpen={ isOpenSizeList }
        isSelect={ selectedSize === item }
        onClick={() => handleItemSizeClick(item)}>
        <BsDiamond size={'0.75em'} color='#A882FA'/>
        <S.StyledMenuLabel>{ item }</S.StyledMenuLabel>
      </M.MotionMenuItem>
    )))
  }, [isOpenSizeList, selectedSize])

  const renderedSizeList = useMemo<JSX.Element[]>(() => {
    return createSizeList(sizeList)
  }, [sizeList, isOpenSizeList, selectedSize])

  const handlePlayClick = useCallback(() => {
    setInteractiveMode('animate')
    setIsPlayAnimConvolution(true)
    setIsResetAnimConvolution(false)
  }, [])

  const handleResetClick = useCallback(() => {
    setInteractiveMode('animate')
    setIsPlayAnimConvolution(false)
    setIsResetAnimConvolution(true)
  }, [])

  return (
    <React.Fragment>
      <M.MotionContainer>
        <S.StyledOptionWrapper>
          <S.StyledOptionButton onClick={ handleOptionKernelClick }>
            <MdWindow size={'1.5em'} color='#A882FA'/>
            <S.StyledOptionLabel ref={ optionKernelLabelRef }>
              { selectedKernel.info?.label }
            </S.StyledOptionLabel>
          </S.StyledOptionButton>

          <M.MotionMenuWrapper
            onMouseEnter={ handleMouseEnterKernelList }
            onMouseLeave={ handleMouseLeaveKernelList }
            isOpen={ isOpenKernelList }>
            <S.StyledMenuList>
              { renderedKernelList }
            </S.StyledMenuList>
            <S.StyledGradientBottom/>
          </M.MotionMenuWrapper>
        </S.StyledOptionWrapper>

        <S.StyledOptionWrapper>
          <S.StyledOptionButton onClick={ handleOptionSpeedClick }>
            <RiSpeedLine size={'1.5em'} color='#A882FA'/>
            <S.StyledOptionLabel ref={ optionSpeedLabelRef }> {selectedSpeed?.label} </S.StyledOptionLabel>
          </S.StyledOptionButton>

          <M.MotionMenuWrapper
            onMouseEnter={ handleMouseEnterSpeedList }
            onMouseLeave={ handleMouseLeaveSpeedList }
            isOpen={ isOpenSpeedList }>
            <S.StyledMenuList>
              { renderedSpeedList }
            </S.StyledMenuList>
            <S.StyledGradientBottom/>
          </M.MotionMenuWrapper>
        </S.StyledOptionWrapper>

        <S.StyledOptionWrapper>
          <S.StyledOptionButton onClick={ handleOptionSizeClick }>
            <GiResize size={'1.5em'} color='#A882FA'/>
            <S.StyledOptionLabel ref={ optionSizeLabelRef }>Kernel Size: { selectedSize }</S.StyledOptionLabel>
          </S.StyledOptionButton>

          <M.MotionMenuWrapper
            onMouseEnter={ handleMouseEnterSizeList }
            onMouseLeave={ handleMouseLeaveSizeList }
            isOpen={ isOpenSizeList }>
            <S.StyledMenuList>
              { renderedSizeList }
            </S.StyledMenuList>
          </M.MotionMenuWrapper>
        </S.StyledOptionWrapper>
        
        <S.StyledOptionWrapper style={{ marginTop: '20px' }}>
          <ButtonInteractiveMode/>
        </S.StyledOptionWrapper>

        <S.StyledButtonListWrapper>
          <S.StyledButtonPlayWrapper onClick={ handlePlayClick }>
            <BiPlayCircle size={'1.25em'} color='#A882FA'></BiPlayCircle>
          </S.StyledButtonPlayWrapper>
          <S.StyledButtonRefreshWrapper onClick={ handleResetClick }>
            <BiRefresh size={'1.25em'} color='#A882FA'></BiRefresh>
          </S.StyledButtonRefreshWrapper >
        </S.StyledButtonListWrapper>
      </M.MotionContainer>
      <M.MotioHintSnap isSnapMode={ interactiveMode == 'freedom' }>Press <S.StyledBold>Space</S.StyledBold> key to <S.StyledBold>Snap/Un Snap</S.StyledBold></M.MotioHintSnap>
    </React.Fragment>
  )
}