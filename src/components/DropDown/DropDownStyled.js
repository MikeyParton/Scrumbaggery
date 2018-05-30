import styled from 'styled-components'

export const RelativeContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const DropDownContentContainer = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 12px;
  background-color: white;
  width: 200px;
  box-shadow: 0 3px 10px 2px rgba(0,0,0,0.25);
  border-radius: 5px;
  overflow: hidden;
`

export const DropDownOption = styled.div`
  cursor: pointer;
  padding: 16px;

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.colors.primary}
  }
`
