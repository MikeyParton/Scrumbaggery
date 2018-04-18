import styled from 'styled-components'

const ultraMarineBlue = '#2F68ED'
const snow = '#F9F9F9'

export const OuterContainer = styled.div`
  width: 200px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: ${snow};
  ${({ open }) => open && 'box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;'}
`

export const Header = styled.div`
  display: flex;
  height: 50px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${ultraMarineBlue};
`

export const InnerContainer = styled.div`

`

export const Trigger = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: black;
`

export const ExternalTrigger = styled(Trigger)`
  position: absolute;
  z-index: 10;
  margin: 10px;
`
