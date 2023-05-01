import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  width: auto;
  height: auto;
`

export const StyledInfoWrapper = styled(motion.div)`
  width: 400px;
  height: auto;
  overflow: hidden;
  user-select: none;
  overflow: hidden;
`

export const StyledInfoLabel = styled(motion.div)`
  font-size: 1.5em;
  font-weight: 500;
`

export const StyledInfoCategory = styled(motion.div)`
  font-style: italic;
`

export const StyledInfoDescription = styled(motion.div)`
  padding: 15px 0;
  font-weight: 300;
`

export const StyledVisualWrapper = styled(motion.div)`
  margin-left: 50px;
`

export const StyledMatrixWrapper = styled(motion.div)`
  margin: 20px 0;
  padding: 25px 10px;
  border-radius: 5px;
  background: linear-gradient(to bottom, rgb(255, 255, 255, 0.2) 0%, rgb(255, 255, 255, 0.5) 100%);
`

export const StyledFlexMatrixVez = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`

export const StyledFlexMatrixHoz = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
`

export const StyledMatrixItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #FAFAFA;
  color: #9C70F9;
  font-weight: 500;
  border-radius: 2px;
  user-select: none;
  border: solid 1px rgb(112, 86, 166, 0.5);
  padding: 0px;
`

export const StyledButtonCollapseVisual = styled(motion.div)`
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

export const StyledIconCollapseVisual = styled(motion.div)`
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

export const StyledBoudingRectCollapseVisualz = styled.div`
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
  user-select: none;
  pointer-events: none;
`