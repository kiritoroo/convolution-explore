import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled(motion.div)`

`

export const StyledHint = styled.div`
  position: absolute;
  width: max-content;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s;
  z-index: 200;
`

export const StyledPointWrapper = styled.div`
  position: relative;
  &:hover ${StyledHint} {
    opacity: 1;
  }
`

export const StyledPoint = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgb(255, 255, 255, 0.5);
  border: 2px solid rgb(255, 255, 255, 0.9);
  text-align: center;
  line-height: 40px;
  font-weight: 400;
  font-size: 12px;
  user-select: none;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.3, 1.3);
    cursor: pointer;
  }
`

export const StyledContentWrapper = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  right: 50%;
  transform: translateX(50%);
  padding: 10px 25px;
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  font-size: 14px;
  user-select: none;
  pointer-events: none;
  transition: all 0.3s;
  z-index: 200;
`

export const StyledLabelWrapper = styled.div`
  border-left: solid 2px #A882FA;
  padding-left: 10px;
  font-weight: 500;
  margin: 10px 0;
  white-space: nowrap;
`

export const StyledMatrixWrapper = styled(motion.div)`
  padding: 25px 50px;
  border-radius: 5px;
  background: linear-gradient(to bottom, rgb(255, 255, 255, 0.2) 0%, rgb(255, 255, 255, 0.5) 100%);
  
  &:hover {
    cursor: pointer;
  }
`

export const StyledFlexMatrixVez = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const StyledFlexMatrixHoz = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3px;
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
