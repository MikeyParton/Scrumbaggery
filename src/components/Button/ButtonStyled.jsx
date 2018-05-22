import styled, { css } from 'styled-components'
import { fill, darkLight } from '../../styles/colorHelpers'
import { readableColor } from 'polished'

export const ButtonBase = styled.div`
  ${fill}
  user-select: none;
  display: inline-block;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px;
  border-radius: 5px;
  height: 35px;
  min-width: 35px;
  padding: 0 10px 0 10px;

  // Circle Props
  ${props => props.circle && css`
    border-radius: 25px;
    width: 35px;
    padding: 0;
  `}

  // Block Props
  ${props => props.block && css`width: 100%;`}
`

export const ButtonInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
