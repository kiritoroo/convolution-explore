import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  width: 80px;
  height: 80px;
  padding: 15px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  user-select: none;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
`

export const StyledModeWrapperRGB = styled(motion.div)`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledLabelRGB = styled.div`
  font-weight: 300;
  font-size: 0.75em;
`

export const StyledIconWrapperRGB = styled.div`

`

export const StyledModeWrapperGray = styled(motion.div)`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledLabelGray = styled.div`
  font-weight: 300;
  font-size: 0.75em;
`

export const StyledIconWrapperGray = styled.div`

`