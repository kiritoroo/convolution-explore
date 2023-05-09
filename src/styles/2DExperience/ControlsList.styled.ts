import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled(motion.div)`
  position: absolute;
  top: 12%;
  left: 2%;
  width: auto;
  height: auto;
  display: flex;
  padding: 15px 25px;
  border-radius: 10px;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  flex-direction: column;
  user-select: none;
  gap: 10px;
`

export const StyledOptionWrapper = styled.div`
  position: relative;
  width: auto;
  height: auto;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    cursor: pointer;
    background-color: #EDE6FD;
  }

  &:active {
    background-color: #DBCBFD;
  }
`

export const StyledOptionButton = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 10px 20px;
  gap: 10px;
`

export const StyledOptionLabel = styled.div`
  font-size: 0.75em;
`

export const StyledMenuWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: absolute;
  top: 0%;
  left: 100%;
  transform: translateX(35px);
  width: auto;
  height: auto;
  white-space: nowrap;
  padding: 20px 10px;
`

export const StyledMenuList = styled.ul`
  list-style: none;
  border-radius: 10px;
  overflow: hidden auto;
  scroll-behavior: smooth;
  height: auto;
  max-height: 30vh;

  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background: #E8DDFF;
    border-radius: 15px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #D5C2FE;
  }
  
  li:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  li:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export const StyledMenuItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  
  &:hover {
    background: #EDE6FD !important; 
  }

  &:active {
    background: #DBCBFD !important;
  }
`

export const StyledMenuLabel = styled.div`
  padding-left: 10px;
  font-size: 0.85em;
`

export const StyledGradientBottom = styled.div`
  width: 100%;
  background: #00ff00;

  &:after {
    content: "";
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20%;
    border-radius: 10px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 90%);
    user-select: none;
    pointer-events: none;
  }
`
export const StyledHintSnap = styled(motion.div)`
  display: inline-block;
  width: 100vw;
  position: absolute;
  bottom: 50px;
  transform: translateX(42%);
  font-size: 0.85em;
  font-style: italic;
  user-select: none;
  pointer-events: none;
`

export const StyledBold = styled.span`
  font-size: 1em;
  font-weight: 600;
  color: #A882FA;
`

export const StyledButtonListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

export const StyledButtonPlayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background: rgb(255, 255, 255, 0.8);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:active {
    transition: all 0.1s ease-in-out;
    transform: scale(0.8);
  }
`

export const StyledButtonRefreshWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background: rgb(255, 255, 255, 0.8);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:active {
    transition: all 0.1s ease-in-out;
    transform: scale(0.8);
  }
`