import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  user-select: none;
  pointer-events: none;
`

export const StyledCursorWrapper = styled(motion.div)`
  width: 100px;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

export const StyledCusrorBorder = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  rotate: 45deg;
  height: 30px;
  width: 30px;
  border: 2px solid white;
`

export const StyledCursorDot = styled(motion.div)`
  height: 10px;
  width: 10px;
  border-radius: 200px;
  background-color: #D0C0F7;
`

export const StyledLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  margin: auto;
  font-size: 15px;
  color: #fff;
`
