import React, { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import * as S from '@style/2DExperience/ConvolutionVisual/VisualOutput.styled';
import { useRecoilValue } from 'recoil';
import { selectedImageOutputSelector } from '@store/selectors';
import { TColor } from '@type/index';

interface Props {

}

interface Refs {
  svgElement: React.RefObject<SVGSVGElement>
  svgRects1d: SVGRectElement[]
}

export const VisualOutput = React.memo(React.forwardRef<Refs, Props>(( props, ref ) => {
  const imageOut = useRecoilValue(selectedImageOutputSelector);
  const pixelSize = Math.round(240/imageOut.w)

  const svgRef = useRef<SVGSVGElement>(null)

  useImperativeHandle(ref, () => {
    return {
      svgElement: svgRef,
      svgRects1d: (svgRef.current?.childNodes ?? []) as SVGRectElement[]
    }
  }, [svgRef.current])

  const fillWhite = useCallback(() => {
    Array.from({ length: imageOut.h }, (_, i) => {
      Array.from({ length: imageOut.h }, (_, j) => {
        const index = i * imageOut.w + j;
        (svgRef.current?.childNodes[index] as SVGRectElement)
          .setAttribute("fill", `rgb(${255}, ${255}, ${255}, ${1})`);
      }
    )})
  }, [imageOut, svgRef.current])

  const fillOutput = useCallback(() => {
    imageOut.rgb2dOut.map((row: TColor[], i: number) => {
      row.map((pixel, j: number) => {
        const index = i * imageOut.w + j;
        (svgRef.current?.childNodes[index] as SVGRectElement)
          .setAttribute("fill", `rgb(${pixel.r}, ${pixel.g}, ${pixel.b}, ${1})`);
      }
    )})
  }, [imageOut, svgRef.current])

  useLayoutEffect(() => {
    if (svgRef.current) {
      fillOutput();
    }
  }, [imageOut, svgRef.current])

  return (
    <S.Styledcontainer>
      <S.StyledLabel>Image Output ({imageOut.w}x{imageOut.h})</S.StyledLabel>
      <S.StyledImageWrapper>
        <S.StyledImage ref={svgRef} width={imageOut.w*pixelSize} height={imageOut.h*pixelSize}>
        {Array.from({ length: imageOut.h }, (_, i) => (
            Array.from({ length: imageOut.w }, (_, j) => (
              <S.StyledPixel 
                key={`${i}-${j}`}
                x={j*pixelSize}
                y={i*pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={`rgb(${255}, ${255}, ${255}, ${0.5})`}>
              </S.StyledPixel>
            ))
          ))}
        </S.StyledImage>
      </S.StyledImageWrapper>
    </S.Styledcontainer>
  )
}))
