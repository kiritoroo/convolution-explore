import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled(motion.div)`
  position: absolute;
  top: 12%;
  left: 5%;
  width: auto;
  height: auto;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  user-select: none;
`

export const StyledCategoryListWrapper = styled(motion.div)`
  width: auto;
  height: auto;
`

export const StyledCategoryWrapper = styled(motion.div)`
  width: auto;
  height: auto;
`

export const StyledButtonCollapseVez = styled(motion.button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  font-size: 1em;
  user-select: none;
`

export const StyledIconCollapseVez = styled(motion.div)`
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

export const StyledButtonCollapseHoz = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  top: 45%;
  border-radius: 10px;
  background: #FFFFFF;
  margin-left: 10px;
`

export const StyledIconCollapseHoz = styled(motion.div)`
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: #A882FA;
  transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    cursor: pointer;
  }
`

export const StyledBoudingRectCollapseHoz = styled.div`
  background: none;
  position: absolute;
  left: 100%;
  transform: translateX(-20px);
  top: 0%;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

