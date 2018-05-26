import styled from 'styled-components'
import mediaQueries from '../../styles/mediaQueries'

export const FixedOuterContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
`

export const OuterContainer = styled.div`
  width: 200px;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 5;
  background-color: ${props => props.theme.colors['greyLightest']};
  box-shadow: rgba(0, 0, 0, 0.15) 2px 0px 20px;

  ${mediaQueries.phone`
    width: 100%;
  `}
`

export const Header = styled.div`
  display: flex;
  height: 50px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`

export const InnerContainer = styled.div`
  padding: 10px;
`

export const Trigger = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const ExternalTrigger = styled(Trigger)`
  position: absolute;
  z-index: 10;
  margin: 10px;
`
