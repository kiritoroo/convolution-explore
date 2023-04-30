import styled from "styled-components"

export const StyledContaier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`

export const StyledLabel = styled.div`
  font-weight: 300;
`

export const StyledImage = styled.svg`
  outline: solid 2px #9C70F9;
`

export const StyledPixel = styled.rect`
  stroke: none;
  stroke-width: 0;
  opacity: 1;
  
  &.bounding {
    /* transition: stroke-width 0.1s ease-in-out, opacity 0s ease-in-out; */
    stroke: #A882FA;
    stroke-width: 2;
    opacity: 1;
  }
`

export const StyledImageWrapper = styled.div`
  &:hover {
    cursor: crosshair;
  }
/* 
  &:hover ${StyledPixel}:not(.bounding) {
    opacity: 0.5;
  } */
`