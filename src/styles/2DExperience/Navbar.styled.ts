import styled from "styled-components";
import { motion } from "framer-motion";
import { CssEffectWave, CssEffectUnderline } from "@style/CommonEffect.styled";

export const StyledContainer = styled.div`
  position: absolute;
  width: 90%;
  top: 2%;
  left: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  user-select: none;
`

export const StyledLinkListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
`

export const StyledLinkWrapper = styled.div`
  ${CssEffectUnderline}

  display: flex;
  font-size: 1.25em;
  
  a {
    text-decoration: none;
    color: #000;
  }
`