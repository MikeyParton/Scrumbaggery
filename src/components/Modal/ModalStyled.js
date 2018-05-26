import styled from 'styled-components'

export const ModalOuterContainer = styled.div`
  border-radius: 4px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
export const ModalOverlay = styled.div`
  background-color: black;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.7;
`

export const ModalInnerContainer = styled.div`
  background-color: white;
  width: 500px;
  z-index: 2;
  border-radius: 4px;
  position: relative;
  padding: 16px;
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

export const InnerHeaderContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin-right: ${props => props.noCloseButton ? 0 : 15 }px;
  margin-left: ${props => props.noCloseButton ? 0 : 50 }px;
`

export const ContentContainer = styled.div`
  padding: 16px 0;
`

export const FooterContainer = styled.div`
  display: flex;
  ${(props) => props.alignRight && `justify-content: flex-end;`}
`
