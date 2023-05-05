import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  padding: 25px 50px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledVisualWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
`

export const StyledLabel = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin-bottom: 10px;
`

export const StyledHint = styled.div`
  font-size: 0.85em;
  font-style: italic;
  font-weight: 300;
  margin-top: 15px;
`

export const StyledButtonListWrapper = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
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