import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const grid = 8

const ListOuterContainer = styled.div`
  border-radius: 5px;
  background-color: ${props => props.theme.colors.secondaryDarker};
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  height: 50px;
  flex-shrink: 0;
  display: flex;
`

const Footer = styled.div`
  height: 50px;
  flex-shrink: 0;
`

const ListDropZone = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
`

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

class List extends React.Component {
  render() {
    const { items } = this.props
    return (
      <ListOuterContainer>
        <Header>
          Header Here
        </Header>
        <ListDropZone>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListDropZone>
        <Footer>
          Footer Here
        </Footer>
      </ListOuterContainer>
    )
  }
}

export default List
