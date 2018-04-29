import styled from 'styled-components'

export const CircleButtonBase = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: ${(props) =>
    (props.primary && props.theme.colors.primary) ||
      props.theme.colors.default
  };
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px;
`
