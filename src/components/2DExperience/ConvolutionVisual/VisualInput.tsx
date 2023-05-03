import { selectedImageInputSelector } from "@store/selectors";
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as S from '@style/2DExperience/ConvolutionVisual/VisualInput.styled';
import { TColor } from "@type/index";
import { colorModeState, cursorVariantState, selectedImageInfoState } from "@store/atoms";

interface Props {

}

interface Refs {
  svgElement: React.RefObject<SVGSVGElement>
  svgRects1d: SVGRectElement[]
}

export const VisualInput = React.memo(React.forwardRef<Refs, Props>(( props, ref ) => {
  const imageIn = useRecoilValue(selectedImageInputSelector);
  const setCursorVariant = useSetRecoilState(cursorVariantState);
  const selectedImageInfo = useRecoilValue(selectedImageInfoState);
  const colorMode = useRecoilValue(colorModeState);

  const svgRef = useRef<SVGSVGElement>(null)

  useImperativeHandle(ref, () => {
    return {
      svgElement: svgRef,
      svgRects1d: (svgRef.current?.childNodes ?? []) as SVGRectElement[]
    }
  }, [svgRef.current])

  const handleMouseEnter = useCallback(() => {
    setCursorVariant("hoverimage")
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVariant("default")
  }, [])

  const createImageSVGRGB = useCallback(( matrix: TColor[][] ) => {
    const pixelSize = Math.ceil(240/matrix[0].length)
    return (
      <S.StyledImage ref={svgRef} width={matrix[0].length*pixelSize} height={matrix.length*pixelSize}>
        {matrix.map((row: TColor[], i: number) => (
          row.map((pixel, j: number) => (
            <S.StyledPixel 
              key={`${i}-${j}`}
              x={j*pixelSize} y={i*pixelSize}
              width={pixelSize} height={pixelSize}
              fill={`rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`}>
            </S.StyledPixel>
          ))
        ))}
      </S.StyledImage>
    )
  }, [])

  const createImageSVGGray = useCallback(( matrix: number[][] ) => {
    const pixelSize = Math.ceil(240/matrix[0].length)
    return (
      <S.StyledImage ref={svgRef} width={matrix[0].length*pixelSize} height={matrix.length*pixelSize}>
        {matrix.map((row: number[], i: number) => (
          row.map((pixel, j: number) => (
            <S.StyledPixel 
              key={`${i}-${j}`}
              x={j*pixelSize} y={i*pixelSize}
              width={pixelSize} height={pixelSize}
              fill={`rgb(${pixel}, ${pixel}, ${pixel})`}>
            </S.StyledPixel>
          ))
        ))}
      </S.StyledImage>
    )
  }, [])

  const renderedImageSVG = useMemo<JSX.Element>(() => {
    return colorMode == 'rgb' 
      ? createImageSVGRGB(imageIn.rgb2d)
      : createImageSVGGray(imageIn.gray2d)
  }, [imageIn, colorMode])

  return (
    <S.StyledContaier>
      <S.StyledLabel>Image Input ({imageIn.w}x{imageIn.h})</S.StyledLabel>
      <S.StyledImageWrapper
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }>
        { renderedImageSVG }
        <S.StyledImageInfo>
          Art by: {selectedImageInfo.by}
        </S.StyledImageInfo>
      </S.StyledImageWrapper>
    </S.StyledContaier>
  )
}))
