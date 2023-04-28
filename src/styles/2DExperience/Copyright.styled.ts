import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  user-select: none;
  font-size: 1.25em;
`

export const StyledSkeletonWrapper = styled(motion.div)`

`

export const StyledSkeletonInlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`

export const StyledContentWrapper = styled(motion.div)`

`