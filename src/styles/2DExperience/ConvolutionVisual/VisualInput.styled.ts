import styled from "styled-components"

export const StyledContaier = styled.div`

`

export const StyledImageWrapper = styled.div`

`

export const StyledImage = styled.svg`
  outline: solid 2px #9C70F9;
`

export const StyledPixel = styled.rect`
  stroke: none;
  stroke-width: 0;
  opacity: 1;
  
  &.bounding {
    transition: stroke-width 0.2s ease-in-out, opacity 0s ease-in-out;
    stroke: #A882FA;
    stroke-width: 2;
    opacity: 1;
  }
`
