import styled, { css } from 'styled-components'
import { fill, darkLight } from '../../styles/colorHelpers'
import { readableColor } from 'polished'

export const ButtonGroup = styled.div`
  display: flex;
`

export const ButtonBase = styled.button`
  font-size: inherit;
  font-size: inherit;
  border: none;
  ${fill}
  ${props => props.disabled && `background-color: grey;`}
  user-select: none;
  display: inline-block;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border-radius: 5px;
  height: 35px;
  min-width: 38px;
  padding: 0 10px 0 10px;

  &:focus {
    outline: 0;
  }

  // Circle Props
  ${props => props.circle && css`
    border-radius: 25px;
    width: 35px;
    padding: 0;
  `}

  // Block Props
  ${props => props.block && css`width: 100%;`}

  // Transparent Props
  ${props => props.fill !== 'transparent' && css`
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px;
  `}
`

export const ButtonInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
