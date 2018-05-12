import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Button from '../Button/Button'
import {
  ListOuterContainer,
  ListInnerContainer,
  ListDropZone,
  Header,
  Footer,
} from './ListStyled'
import Card from './Card'
import ElipsisIcon from 'react-icons/lib/fa/ellipsis-h'
import AddIcon from 'react-icons/lib/fa/plus'

class List extends React.Component {
  render() {
    const { provided, snapshot, items, name, id } = this.props
    return (
      <ListOuterContainer
        innerRef={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Header>
          {name}
          <Button dark circle fill="secondary">
            <ElipsisIcon />
          </Button>
        </Header>
        <ListDropZone>
          <Droppable
            type="card"
            droppableId={`list-${id}`}
          >
            {(provided, snapshot) => (
              <ListInnerContainer
                innerRef={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {items.map((item, index) => (
                  <Draggable
                    type="card"
                    key={item.id}
                    draggableId={`card-${item.id}`}
                  >
                    {(provided, snapshot) => (
                      <Card
                        item={item}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ListInnerContainer>
            )}
          </Droppable>
        </ListDropZone>
        <Footer>
          <Button dark block fill="primary">
            Add Card &nbsp;<AddIcon />
          </Button>
        </Footer>
      </ListOuterContainer>
    )
  }
}

export default List
