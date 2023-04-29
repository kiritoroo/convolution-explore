import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const rotatecube = keyframes`
  0% {
    transform: rotateX(315deg) rotateY(180deg) rotateZ(225deg);
  }
  50% {
    transform: rotateX(45deg) rotateY(0deg) rotateZ(135deg);
  }
  100% {
    transform: rotateX(315deg) rotateY(180deg) rotateZ(225deg);
  }
`

const cubesize = '40px'
const halfcubesize = '19px';

export const StyledContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 99999;
`

export const StyledCubeWrapper = styled.div`
  width: ${cubesize};
  height: ${cubesize};
  position: absolute;
  transform-style: preserve-3d;
  animation: ${rotatecube} 5s infinite;
`

export const StyledCubeFace = styled.div`
  width:${cubesize};
  height: ${cubesize};
  display: block;
  position: absolute;
  border: 0.2rem solid #D0C0F7;
  line-height: ${cubesize};
  text-align: center;
  font-size: ${cubesize};
  font-weight: bold;
  border-radius: 2px;
  opacity: 1;
`

export const StyledCubeFront = styled(StyledCubeFace)`
  transform: rotateY(0deg) translateZ(${halfcubesize});
`

export const StyledCubeBack = styled(StyledCubeFace)`
  transform: rotateX(180deg) translateZ(${halfcubesize});
`

export const StyledCubeLeft = styled(StyledCubeFace)`
  transform: rotateY(-90deg) translateZ(${halfcubesize});
`

export const StyledCubeRight = styled(StyledCubeFace)`
  transform: rotateY(90deg) translateZ(${halfcubesize});
`

export const StyledCubeTop = styled(StyledCubeFace)`
  transform: rotateX(90deg) translateZ(${halfcubesize});
`

export const StyledCubeBottom = styled(StyledCubeFace)`
  transform: rotateX(-90deg) translateZ(${halfcubesize});
`

export const StyledHint = styled.div`
    margin-top: 6.5rem;
    font-weight: 500;
    line-height: 0.5rem;
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
    font-family: Futura, sans-serif;
    text-transform: uppercase;
    pointer-events: none;
    user-select: none;
    color: #D0C0F7;
`