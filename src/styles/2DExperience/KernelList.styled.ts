import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  background: none;
  position: absolute;
  width: auto;
  height: auto;
  left: 100%;
  margin-left: 60px;
  padding: 10px 15px 10px 15px;
  top: 0px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  white-space: nowrap;
`

export const StyledSizeListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px 25px;
  user-select: none;
  border-bottom: solid 1px #C5ABFB;
`

export const StyledButtonSize = styled.div`
  background: #EDE6FD;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: normal;
  
  &:hover {
    cursor: pointer;
  }
`

export const StyledKernelListWrapper = styled(motion.div)`
  height: auto;
  max-height: 70vh;
  margin: 10px 0;
  overflow: hidden auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
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

export const StyledKernelItemWrapper = styled(motion.div)`

`

export const StyledGradientBottom = styled.div`
  width: 100%;
  background: #00ff00;

  &:after {
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20%;
    border-radius: 10px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
    user-select: none;
    pointer-events: none;
  }
`