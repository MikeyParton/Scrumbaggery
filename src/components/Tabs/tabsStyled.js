import styled from 'styled-components'

export const TabList = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 8px;
`

export const Tab = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;
  width: 70px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  ${props => props.active && `
    background-color: #F7F7F7;
  `}
  transition: background-color 0.7s;
`

export const TabContent = styled.div`
  width: 100%;
  height: 100px;
`

export const TabActiveBar = styled.div`
  position: absolute;
  width: 90px;
  height: 4px;
  background-color: blue;
  bottom: 0;
  border-radius: 4px;
  left: ${props => props.active * 90}px;
  transition: left 0.3s;
`
