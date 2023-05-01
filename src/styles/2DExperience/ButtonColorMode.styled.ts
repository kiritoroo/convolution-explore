import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 80px;
  height: 80px;
  padding: 15px 10px;
  border-radius: 10px;
  box-shadow: rgba(237, 230, 253, 0.2) 0px 8px 24px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`

export const StyledLabel = styled.div`
  font-weight: 300;
  font-size: 0.75em;
`

export const StyledIconWrapper = styled.div`

`