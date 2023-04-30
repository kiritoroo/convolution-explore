import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import * as S from '@style/2DExperience/ConvolutionVisual/VisualOutput.styled';
import { useRecoilValue } from 'recoil';
import { selectedImageOutputSelector } from '@store/selectors';
import { TColor } from '@type/index';

interface Props {

}

export const VisualOutput = React.memo(( props: Props ) => {
  const imageOut = useRecoilValue(selectedImageOutputSelector);
  const pixelSize = imageOut.w == 32 ? 8 : imageOut.w == 48 ? 5 : 4;
  const svgRef = useRef<SVGSVGElement>(null)
  // console.log(imageOut)

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
      <div>Output {imageOut.w}x{imageOut.h}</div>
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
})