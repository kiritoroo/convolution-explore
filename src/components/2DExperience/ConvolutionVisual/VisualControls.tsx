import React, { useEffect, useRef, useCallback, useTransition, useMemo } from 'react';
import * as S from '@style/2DExperience/ConvolutionVisual/VisualControls.styled';
import { VisualInput } from './VisualInput';
import { VisualOutput } from './VisualOutput';
import { VisualProcess } from './VisualProcess';
import { useRecoilValue } from 'recoil';
import { selectedImageInputSelector, selectedImageOutputSelector, selectedKernelSelector } from '@store/selectors';
import { colorModeState, isPaddingModeState } from '@store/atoms';
interface Props {

}

interface VisualInputRefs {
  svgElement: React.RefObject<SVGSVGElement>
  svgRects1d: SVGRectElement[]
}

interface VisualOutputRefs {
  svgElement: React.RefObject<SVGSVGElement>
  svgRects1d: SVGRectElement[]
}

interface VisualProcessRefs {
  divRects1d: HTMLDivElement[]
  divOut: React.RefObject<HTMLDivElement>
}

export const VisualControls = React.memo((props: Props) => {
  const [isPending, startTransition] = useTransition();

  const kernel = useRecoilValue(selectedKernelSelector);  
  const imageIn = useRecoilValue(selectedImageInputSelector);
  const imageOut = useRecoilValue(selectedImageOutputSelector);
  const colorMode = useRecoilValue(colorModeState);
  const isPadding = useRecoilValue(isPaddingModeState);
  const pixelSize = useMemo(() => (
    Math.round(240/imageOut.w
  )), [imageOut])

  const visualInputRef = useRef<VisualInputRefs>(null);
  const visualOutputRef = useRef<VisualOutputRefs>(null);
  const visualProcessRef = useRef<VisualProcessRefs>(null);

  const windowSliceInRect = useRef<SVGRectElement[]>([]);
  const windowSliceOutRect = useRef<SVGRectElement>();
  const windowSliceInColorRed = useRef<number[]>([]);
  const windowSliceInColorGreen = useRef<number[]>([]);
  const windowSliceInColorBlue = useRef<number[]>([]);
  const windowSliceInGray = useRef<number[]>([]);
  const windowSliceOutColorRed = useRef<number>();
  const windowSliceOutColorGreen = useRef<number>();
  const windowSliceOutColorBlue = useRef<number>();
  const windowSliceOutGray = useRef<number>();

  const clearWindowInSlice = () => {
    windowSliceInRect.current.forEach((rect: SVGRectElement) => {
      rect.classList.remove('bounding');
    })
  }

  const clearWindowOutSlice = () => {
    windowSliceOutRect.current?.classList.remove('bounding');
  }

  const setWindowInSlice = useCallback((x: number, y: number) => {
    windowSliceInRect.current = [];
    windowSliceInColorRed.current = [];
    windowSliceInColorGreen.current = [];
    windowSliceInColorBlue.current = [];
    windowSliceInGray.current = [];

    for (let ky=0; ky < kernel.data!.size; ky++) {
      for (let kx=0; kx < kernel.data!.size; kx++) {
        const indexIn1d = ((y+ky) * imageIn.w + (x+kx));
        windowSliceInRect.current.push(visualInputRef.current?.svgRects1d[indexIn1d]!);
        windowSliceInRect.current[windowSliceInRect.current.length - 1].classList.add("bounding");
        
        windowSliceInColorRed.current.push(imageIn.cRed1d[indexIn1d]);
        windowSliceInColorGreen.current.push(imageIn.cGreen1d[indexIn1d]);
        windowSliceInColorBlue.current.push(imageIn.cBlue1d[indexIn1d]);
        windowSliceInGray.current.push(imageIn.gray1d[indexIn1d]);
      }
    }
  }, [kernel.data, imageIn, visualInputRef.current])

  const setWindowOutSlice = useCallback((x: number, y: number) => {
    windowSliceOutRect.current = undefined;
    windowSliceOutColorRed.current = undefined;
    windowSliceOutColorGreen.current = undefined;
    windowSliceOutColorBlue.current = undefined;
    windowSliceOutGray.current = undefined;

    let indexOut2D
    if (isPadding) {
      indexOut2D = { x: x, y: y }
    } else {
      indexOut2D = { x: x + Math.floor(kernel.data!.size/2), y: y + Math.floor(kernel.data!.size/2) }
    }

    const indexOut1d = indexOut2D.y * imageOut.w + indexOut2D.x
    windowSliceOutRect.current = visualOutputRef.current?.svgRects1d[indexOut1d] as SVGRectElement;
    windowSliceOutRect.current.classList.add("bounding");

    windowSliceOutColorRed.current = imageOut.rgb1dOut[indexOut1d].r;
    windowSliceOutColorGreen.current = imageOut.rgb1dOut[indexOut1d].g;
    windowSliceOutColorBlue.current = imageOut.rgb1dOut[indexOut1d].b;
    windowSliceOutGray.current = imageOut.gray1dOut[indexOut1d];
  }, [kernel.data, imageOut, visualOutputRef.current, isPadding])

  const setProcess = useCallback(() => {
    visualProcessRef.current?.divRects1d.forEach((rect, i: number) => {
      colorMode == 'rgb' 
        ? rect.style.background = `rgb(
          ${windowSliceInColorRed.current[i]},
          ${windowSliceInColorGreen.current[i]},
          ${windowSliceInColorBlue.current[i]})`
        : rect.style.background = `rgb(
          ${windowSliceInGray.current[i]},
          ${windowSliceInGray.current[i]},
          ${windowSliceInGray.current[i]})`
    })
    if (visualProcessRef.current?.divOut.current) {
      colorMode == 'rgb'
        ? visualProcessRef.current.divOut.current.style.background = `rgb(
          ${windowSliceOutColorRed.current},
          ${windowSliceOutColorGreen.current},
          ${windowSliceOutColorBlue.current})`
        : visualProcessRef.current.divOut.current.style.background = `rgb(
          ${windowSliceOutGray.current},
          ${windowSliceOutGray.current},
          ${windowSliceOutGray.current})`
    }
  }, [visualProcessRef.current, colorMode])

  const handleRaycaster = useCallback((event: MouseEvent) => {
    const rect = event.target as SVGRectElement;

    let indexX = rect.x.baseVal.value/pixelSize
    let indexY = rect.y.baseVal.value/pixelSize

    if (indexX < imageIn.w-kernel.data!.size+1 && indexY < imageIn.h-kernel.data!.size+1) {
      indexX = rect.x.baseVal.value/pixelSize
      indexY = rect.y.baseVal.value/pixelSize
    } else {
      if (indexX >= imageIn.w-kernel.data!.size+1) {
        indexX = imageIn.w-kernel.data!.size
      }
      if (indexY >= imageIn.h-kernel.data!.size+1) {
        indexY = imageIn.h-kernel.data!.size
      }
    }

    startTransition(() => {
      clearWindowInSlice();
      clearWindowOutSlice();
      setWindowInSlice(Math.round(indexX), Math.round(indexY));
      setWindowOutSlice(Math.round(indexX), Math.round(indexY));
      setProcess();
    }) 
  }, [imageIn, imageOut, kernel.data, colorMode])

  const handleUnRaycaster = useCallback(() => {
    startTransition(() => {
      clearWindowInSlice();
      clearWindowOutSlice();
      setWindowInSlice(0, 0);
      setWindowOutSlice(0, 0);
      setProcess();
    }) 
  }, [imageIn, imageOut, kernel.data])

  useEffect(() => {
    if (visualInputRef) {
      visualInputRef.current?.svgElement.current?.addEventListener("mousemove", handleRaycaster);
      // visualInputRef.current?.svgElement.current?.addEventListener("mouseleave", handleUnRaycaster);
    }

    if (kernel.data && visualInputRef.current && visualOutputRef.current && visualProcessRef.current) {
      startTransition(() => {
        clearWindowInSlice();
        clearWindowOutSlice();
        setWindowInSlice(0, 0);
        setWindowOutSlice(0, 0);
        setProcess();
      }) 
    }

    return (() => {
      visualInputRef.current?.svgElement.current?.removeEventListener("mousemove", handleRaycaster);
      // visualInputRef.current?.svgElement.current?.removeEventListener("mouseleave", handleUnRaycaster);
    })
  }, [kernel, imageIn, imageOut, visualInputRef, visualOutputRef, visualProcessRef, colorMode])

  return (
    <S.StyledContainer>
      <S.StyledLabel>
        Convolution
      </S.StyledLabel>
      <S.StyledVisualWrapper>
        <VisualInput ref={ visualInputRef }/>
        <VisualProcess ref={ visualProcessRef }/>
        <VisualOutput ref={ visualOutputRef }/>
      </S.StyledVisualWrapper>
      <S.StyledHint>
        Hover over the matries to change kernel position
      </S.StyledHint> 
    </S.StyledContainer>
  )
})
