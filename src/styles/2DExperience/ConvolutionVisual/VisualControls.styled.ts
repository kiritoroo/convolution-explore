import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled.div`
  background: rgba(255, 255, 255, 0.5);
  padding: 25px 50px;
  border-radius: 10px;
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
`

export const StyledHint = styled.div`
  font-size: 0.85em;
  font-style: italic;
  font-weight: 300;
`
