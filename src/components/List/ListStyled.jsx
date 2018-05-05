import styled from 'styled-components'

export const ListOuterContainer = styled.div`
  border-radius: 5px;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors['default-30']};
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 2px;
`

export const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  justify-content: space-between;
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-top: 16px;
  justify-content: space-between;
`

export const ListDropZone = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  border-radius: 5px;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .2);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${props => props.theme.colors['secondary-30']};
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
`

export const ListInnerContainer = styled.div`
  background: ${props => props.isDraggingOver ? '#AAE8FF' : 'lightgrey'};
  padding: 8px;
  transition: background-color 0.3s;
`

export const Board = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
`
