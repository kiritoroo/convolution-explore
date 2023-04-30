import { selectedImageTextureSelector } from "@store/selectors";
import React from "react";
import { useRecoilValue } from "recoil";
import * as S from '@style/2DExperience/ConvolutionVisual/VisualInput.styled';
import { TColor } from "@type/index";

interface Props {

}

export const VisualInput = React.memo((props: Props) => {
  const imageIn = useRecoilValue(selectedImageTextureSelector);
  const pixelSize = imageIn.w == 32 ? 8 : imageIn.w == 48 ? 5 : 4;

  return (
    <S.StyledContaier>
      <div>Input {imageIn.w}x{imageIn.h}</div>
      <S.StyledImageWrapper>
        <S.StyledImage width={imageIn.w*pixelSize} height={imageIn.h*pixelSize}>
          {imageIn.rgb2d.map((row: TColor[], i: number) => (
            row.map((pixel, j: number) => (
              <S.StyledPixel 
                key={`${i}-${j}`}
                x={j*pixelSize}
                y={i*pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={`rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`}>
              </S.StyledPixel>
            ))
          ))}
        </S.StyledImage>
      </S.StyledImageWrapper>
    </S.StyledContaier>
  )
})