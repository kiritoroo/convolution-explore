import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  position: absolute;
  top: 12%;
  right: 2%;
  width: auto;
  height: auto;
  padding: 15px 10px;
  border-radius: 10px;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  user-select: none;
  overflow: hidden;
`

export const StyledModeListWrapper = styled(motion.div)`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

export const StyledImageListWrapper = styled(motion.div)`
`

export const StyledButtonCollapse = styled(motion.button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  font-size: 1em;
  user-select: none;
`

export const StyledIconCollapse = styled(motion.div)`
  padding: 15px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: #A882FA;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    cursor: pointer;
  }

  &:active {
  }
`
