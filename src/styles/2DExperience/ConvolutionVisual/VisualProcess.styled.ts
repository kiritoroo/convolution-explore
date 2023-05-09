import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`

export const StyledLabelIn = styled.div`
  font-weight: 300;
  white-space: nowrap;
`

export const StyledMatrixWrapper = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  background: linear-gradient(to bottom, rgb(255, 255, 255, 0.2) 0%, rgb(255, 255, 255, 0.5) 100%);
`

export const StyledFlexMatrixVez = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const StyledFlexMatrixHoz = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

export const StyledMatrixItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledKernelValue = styled.div`
  width: 40px;
  height: 15px;
  background: #E8E9F2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 0.55em;
`

export const StyledInputValue = styled.div`
  width: 40px;
  height: 30px;
  background: #DEDDF1;
`

export const StyledOutputWrapper = styled.div`
margin-top: 10px;
  padding: 10px 10px;
  border-radius: 5px;
  background: linear-gradient(to bottom, rgb(255, 255, 255, 0.2) 0%, rgb(255, 255, 255, 0.5) 100%);
`

export const StyledOutput = styled.div`
  width: 40px;
  height: 40px;
  background: #DEDDF1;
`