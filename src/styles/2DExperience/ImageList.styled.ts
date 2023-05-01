import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  width: auto;
  height: auto;
  padding: 15px 10px;
  border-radius: 10px;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  user-select: none;
`

export const StyledImageListWraper = styled(motion.div)`
  max-height: 35vh;
  overflow-y: auto;
  overflow-x: visible;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background: #E8DDFF;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #D5C2FE;
  }
`

export const StyledImageHint = styled.div`
  font-weight: 300;
  font-size: 0.75em;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 50%;
`

export const StyledImageWrapper = styled.div`
  background: linear-gradient(to left, rgb(255, 255, 255, 0.2) 50%, rgb(168, 130, 250, 0.2) 50%) right;
  background-size: 200%;
  transition: .3s ease-out;

  &:hover {
    background-position: left;
    cursor: crosshair;    
  }
`

export const StyledImage = styled(motion.img)`
  width: 64px;
  height: 64px;
  margin: 5px;
  border: 1px solid #A882FA;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  image-rendering: crisp-edges; 
`