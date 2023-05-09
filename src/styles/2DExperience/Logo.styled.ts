import styled from "styled-components";
import { motion } from "framer-motion";
import { CssEffectUnderline, CssEffectWave } from "@style/CommonEffect.styled";

export const StyledContainer = styled.div`
  ${CssEffectWave}

  user-select: none;

  &:hover {
    cursor: pointer;
  }
`

export const StyledWord = styled(motion.span)`
  display: inline-block;
  font-size: 2em;
`

export const StyledCharacter = styled(motion.span)`
  display: inline-block;

  /* &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #D0C0F7;
    transform-origin: left;
  } */
`