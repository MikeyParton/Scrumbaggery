import styled, { css } from 'styled-components'
import { rgba } from 'polished'

export const InputBase = styled.input`
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.default};
  padding: 10px;
  font-size: 14px;

  &:focus {
    outline: 0;
    ${props => {
      const color = props.theme.colors['primaryLightXXX']
      return css`
        box-shadow: 0 4px 8px 0 ${rgba(color, 0.2)}, 0 6px 20px 0 ${rgba(color, 0.2)};
        border: 1px solid ${color};
      `
    }}
  }
`
