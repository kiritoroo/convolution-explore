import styled from "styled-components"
import { motion } from "framer-motion"

export const StyledContainer = styled.div`
  position: relative;
  width: 30em;
  height: 25  em;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  border: solid 3px #D0C0F7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledLabel = styled.div`
  position: absolute;
  right: -2px;
  bottom: -20px;
  background: #D0C0F7;
  padding: 15px 50px;
  border-radius: 5px;
`

export const StyledMatrixWrapper = styled.div`
  padding: 25px 50px;
  border-radius: 5px;
  background: linear-gradient(to bottom, rgb(255, 255, 255, 0.2) 0%, rgb(255, 255, 255, 0.5) 100%);
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
  width: 2em;
  height: 2em;
  background: #FAFAFA;
  color: #9C70F9;
  font-weight: 500;
  border-radius: 2px;
  user-select: none;
  border: solid 1px rgb(112, 86, 166, 0.5);
  padding: 0px;
`
export const StyledSizeListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 10px 25px;
  user-select: none;
  position: absolute;
  top: 2%;
  left: 2%;
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