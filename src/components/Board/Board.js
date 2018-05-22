import React from 'react'
import List from 'components/List/List'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContainer } from './BoardStyled'

class Board extends React.Component {
  onDragEnd = (event) => {
    const { destination, source, draggableId } = event

    // Don't have to do anything if item was dropped
    // Outside of list or if the position hasn't changed
    if (!destination) return

    const { type: itemType } = JSON.parse(draggableId)

    // Moving a list
    if (itemType === 'list') {
      this.props.onMoveList({
        fromIndex: source.index,
        toIndex: destination.index
      })
    }

    // Moving a card
    if (itemType === 'card') {

      const { index: fromListIndex } = JSON.parse(source.droppableId)
      const { index: toListIndex } = JSON.parse(destination.droppableId)

      this.props.onMoveCard({
        fromListIndex,
        fromIndex: source.index,
        toListIndex,
        toIndex: destination.index
      })
    }
  }

  render() {
    const {
      onAddCardToList,
      board: { name, lists, id }
    } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          type="list"
          direction="horizontal"
          droppableId={`board-${id}`}
          >
          {(provided, snapshot) => (
            <BoardContainer innerRef={provided.innerRef}>
              {lists.map((list, index) => (
                <Draggable
                  type="list"
                  key={list.id}
                  draggableId={JSON.stringify({
                    type: 'list',
                    id: list.id,
                    index
                  })}
                  index={index}
                  >
                  {(provided2, snapshot2) => (
                    <List
                      index={index}
                      provided={provided2}
                      snapshot={snapshot2}
                      id={list.id}
                      name={list.name}
                      items={list.cards}
                      onAddCardToList={onAddCardToList}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </BoardContainer>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default Board
