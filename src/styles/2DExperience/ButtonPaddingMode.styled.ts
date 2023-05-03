import { motion } from "framer-motion";
import styled from "styled-components";

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

export const StyledModeWrapperPadding = styled(motion.div)`
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledLabelPadding = styled.div`
  font-weight: 300;
  font-size: 0.75em;
`

export const StyledIconWrapperPadding = styled.div`

`

export const StyledModeWrapperNoPadding = styled(motion.div)`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledLabelNoPadding = styled.div`
  font-weight: 300;
  font-size: 0.75em;
  white-space: nowrap;
`

export const StyledIconWrapperNoPadding = styled.div`

`