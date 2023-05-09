import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  /* position: absolute;
  top: 5%;
  right: 5%; */
  user-select: none;
`

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  box-sizing: border-box;
  border: none;
  background: none;
  padding: 5px 8px 5px 8px;
  border-radius: 50%;
  border: solid 2px #FFFFFF;
  font-family: Poppins, sans-serif;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;

  &:hover {
    transform: scale(1.1);
    border-color: #C5ABFB;
  }
  &:active {
    transform: scale(0.9);
  }
`

export const StyledShortLocale = styled(motion.div)`
  color: #A882FA;
  font-weight: normal;
`

export const StyledMenuWrapper = styled(motion.div)`
  display: block;
  position: absolute;
  width: 100px;
  right: -30px;
  top: 50px;
  border-radius: 10px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: 100% 0;
  color: #262320;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;
`

export const StyledMenuList = styled.ul`
  list-style: none;
  border-radius: 10px;
  background-color: #FAFAFA;

  li:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  li:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export const StyledItem = styled(motion.li)`
  width: auto;
  padding: 10px 10px 10px 20px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  background-color: #FAFAFA;
  cursor: pointer;

  &:hover {
    background-color: #EDE6FD;
  }

  &:active {
    background-color: #DBCBFD;
  }
`
