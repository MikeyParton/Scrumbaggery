import styled, { css } from 'styled-components'
import { ButtonBase } from './ButtonStyled'

const ButtonGroup = styled.div`
  display: flex;
  background-color: white;

  ${ButtonBase} {
    &:first-child {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;

      &:last-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }

      ${props => props.straightLeftEdge && css`
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      `}
    }

    &:last-child {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;

      &:first-child {
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
      }

      ${props => props.straightRightEdge && css`
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      `}
    }
  }
`

export default ButtonGroup
