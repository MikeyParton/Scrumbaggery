import React, { Component } from 'react'
import { BoardConsumer } from '../BoardContext'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Button from 'components/Button/Button'
import Card from 'components/Card/Card'
import DropDown from 'components/DropDown/DropDown'
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
    const {
      provided,
      snapshot,
      items,
      name,
      id,
      index
    } = this.props
    return (
      <BoardConsumer>
        {({
          deleteList,
          setAddingCardToListId,
          setIsDragDisabled,
          isDragDisabled
        }) => (
          <ListOuterContainer
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Header>
              {name}
              <ButtonContainer>
                <DropDown
                  onOpen={() => setIsDragDisabled(true)}
                  onClose={() => setIsDragDisabled(false)}>
                  <DropDown.Button circle fill="secondary">
                    <ElipsisIcon style={{ marginTop: 3 }} />
                  </DropDown.Button>
                  <DropDown.Content>
                    <DropDown.Option onClick={() => deleteList(id)}>
                      Delete
                    </DropDown.Option>
                  </DropDown.Content>
                </DropDown>
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
                        index={index}
                        isDragDisabled={isDragDisabled}
                        draggableId={JSON.stringify({
                          type: 'card',
                          id: item.id,
                          index })
                        }
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
                block
                fill="primary"
                clickablePreset="medium"
                onClick={() => setAddingCardToListId(id)}>
                Add Card &nbsp;<AddIcon />
              </Button>
            </Footer>
          </ListOuterContainer>
        )}
      </BoardConsumer>
    )
  }
}

export default List
