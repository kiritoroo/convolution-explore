import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  margin: 10px 10px;
  width: auto;
  height: auto;

  &:hover {
    cursor: pointer;
  }
`

export const StyledFlexMain = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
  background: linear-gradient(to right, rgb(237, 230, 253, 0.5) 0%, rgb(255, 255, 255, 0.2) 100%);
  width: auto;
  height: auto;
`

export const StyledFlexChild = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
  width: auto;
  height: auto;
`

export const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
`

export const StyledLabelWrapper = styled(motion.div)`
  width: auto;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.9rem;
`

export const StyledCountWrapper = styled(motion.div)`
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #FFFFFF;
  color: #A882FA;
  font-size: 0.75em;
  font-weight: bold;
`