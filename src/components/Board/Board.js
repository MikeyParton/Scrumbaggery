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

    const { id: itemId, type: itemType } = JSON.parse(draggableId)

    // Moving a list
    if (itemType === 'list') {
      this.props.onMoveList({
        id: itemId,
        from: source.index,
        to: destination.index
      })
    }

    // Moving a card
    if (itemType === 'card') {

      const { id: fromListId, index: fromListIndex } = JSON.parse(source.droppableId)
      const { id: toListId, index: toListIndex } = JSON.parse(destination.droppableId)

      this.props.onMoveCard({
        id: itemId,
        from: {
          listId: fromListId,
          listIndex: fromListIndex,
          position: source.index
        },
        to: {
          listId: toListId,
          listIndex: toListIndex,
          position: destination.index
        }
      })
    }
  }

  render() {
    const { name, lists, id } = this.props.board

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
