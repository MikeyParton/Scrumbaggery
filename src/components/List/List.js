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
    const { items } = this.props
    return (
      <ListOuterContainer>
        <Header>
          Fancy Card
          <Button dark circle fill="secondary">
            <ElipsisIcon />
          </Button>
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
