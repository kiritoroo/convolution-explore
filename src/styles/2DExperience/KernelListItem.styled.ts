import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  margin: 0 20px;
  margin-bottom: 30px;
  user-select: none;
`

export const StyledLabelWrapper = styled.div`
  border-left: solid 2px #A882FA;
  padding-left: 10px;
  font-weight: 500;
  margin: 10px 0;
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
