import styled from "styled-components";
import { motion } from "framer-motion";

export const StyledContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 50px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  width: auto;
  height: auto;
`

export const StyledInfoWrapper = styled(motion.div)`
  width: 400px;
  height: auto;
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
  
`
