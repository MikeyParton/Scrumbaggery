import styled from 'styled-components'

export const ListOuterContainer = styled.div`
  border-radius: 5px;
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.greyLight};
  padding: 8px;
`

export const Header = styled.div`
  height: 50px;
  flex-shrink: 0;
  display: flex;
  padding-bottom: 8px;
`

export const Footer = styled.div`
  height: 50px;
  flex-shrink: 0;
  padding-top: 8px;
`

export const ListDropZone = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`

export const ListInnerContainer = styled.div`
  background: ${props => props.isDraggingOver ? 'lightblue' : 'lightgrey'};
`

export const CardOuterContainer = styled.div`
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  background: ${props => props.isDragging ? 'lightgreen' : 'grey'};
`
