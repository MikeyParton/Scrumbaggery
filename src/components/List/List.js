import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Button from 'components/Button/Button'
import Card from 'components/Card/Card'
import {
  ListOuterContainer,
  ListInnerContainer,
  ListDropZone,
  Header,
  Footer,
  ButtonContainer,
} from './ListStyled'
import ElipsisIcon from 'react-icons/lib/fa/ellipsis-h'
import AddIcon from 'react-icons/lib/fa/plus'

class List extends React.Component {
  render() {
    const { provided, snapshot, items, name, id, index, onAddCardToList } = this.props
    return (
      <ListOuterContainer
        innerRef={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Header>
          {name}
          <ButtonContainer>
            <Button dark circle fill="secondary">
              <ElipsisIcon style={{ marginTop: 3 }} />
            </Button>
          </ButtonContainer>
        </Header>
        <ListDropZone>
          <Droppable
            type="card"
            droppableId={JSON.stringify({ type: 'list', id, index })}
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
                    draggableId={JSON.stringify({
                      type: 'card',
                      id: item.id,
                      index })
                    }
                    index={index}
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
          <Button
            dark
            block
            fill="primary"
            clickablePreset="medium"
            onClick={() => onAddCardToList(id)}
          >
            Add Card &nbsp;<AddIcon />
          </Button>
        </Footer>
      </ListOuterContainer>
    )
  }
}

export default List
