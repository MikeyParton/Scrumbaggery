import styled from 'styled-components'

export const TabListOuter = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`

export const TabList = styled.div`
  display: flex;
  position: relative;
`

export const Tab = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;
  width: 90px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  ${props => props.active && `background-color: ${props.theme.colors.secondary};`}
  transition: background-color 0.7s;
`

export const TabContent = styled.div`
  width: 100%;
  position: absolute;
`

export const TabActiveBar = styled.div`
  position: absolute;
  width: 90px;
  height: 4px;
  background-color: ${props => props.theme.colors.primary};
  bottom: 0;
  border-radius: 4px;
`
