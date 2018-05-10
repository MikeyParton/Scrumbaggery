import styled, { css } from 'styled-components'

export const TabListOuter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`

export const TabListContainer = styled.div`
  display: flex;
  position: relative;
  ${props => props.vertical && css`
    flex-direction: column;
    width: 100%;
  `}
`

export const TabContainer = styled.div`
  ${props => !props.vertical && css`
    text-align: center;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  `}
  width: ${props => props.vertical ? '100%' : '90px'};
  cursor: pointer;
  padding: 10px;
  ${props => props.active && `background-color: ${props.theme.colors['greyLightest+10']};`}
  transition: background-color 0.7s;
`

export const TabContent = styled.div`
  width: 100%;
  position: absolute;
`

export const TabActiveBar = styled.div`
  position: absolute;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.primary};
`
