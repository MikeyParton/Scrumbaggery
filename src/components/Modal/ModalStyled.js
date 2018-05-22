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
  min-width: 200px;
  z-index: 2;
  border-radius: 4px;
  position: relative;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid black;
`

export const ContentContainer = styled.div`
  padding: 16px;
`
