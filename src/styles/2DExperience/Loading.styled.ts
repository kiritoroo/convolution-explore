import styled from "styled-components";
import { motion } from 'framer-motion';

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background: white;
`

export const StyledDotWrapper = styled(motion.div)`
  width: 8rem;
  height: 5rem;
  display: flex;
  justify-content: space-around;
`

export const StyledDot = styled(motion.span)`
  display: block;
  width: 1rem;
  height: 1rem;
  background: linear-gradient(to right, rgb(211, 203, 228, 1) 0%, rgb(211, 203, 228, 1) 100%);
  border-radius: 50%;
`
