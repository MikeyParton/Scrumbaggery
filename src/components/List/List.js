import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  ListOuterContainer,
  ListInnerContainer,
  ListDropZone,
  Header,
  Footer,
  CardOuterContainer
} from './ListStyled'

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
              <ListInnerContainer
                innerRef={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <CardOuterContainer
                        innerRef={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        {item.content}
                      </CardOuterContainer>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ListInnerContainer>
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
