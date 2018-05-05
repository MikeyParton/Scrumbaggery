import styled, { css } from 'styled-components'
import { fill, darkLight } from '../../styles/colorHelpers'

export const ButtonBase = styled.div`
  ${fill}
  ${darkLight}
  user-select: none;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px;
  border-radius: ${props => props.circle ? 25 : 5}px;
  ${props => props.block && css`width: 100%;`}
`
