import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  width: 150px;
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

export const StyledModeWrapperAnim = styled(motion.div)`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 10px 20px;
  gap: 10px;
`

export const StyledLabelAnim = styled.div`
  font-weight: 300;
  font-size: 0.75em;
  white-space: nowrap;
`

export const StyledIconWrapperAnim = styled.div`

`

export const StyledModeWrapperFree = styled(motion.div)`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 10px 20px;
  gap: 10px;
`

export const StyledLabelFree = styled.div`
  font-weight: 300;
  font-size: 0.75em;
  white-space: nowrap;
`

export const StyledIconWrapperFree = styled.div`

`