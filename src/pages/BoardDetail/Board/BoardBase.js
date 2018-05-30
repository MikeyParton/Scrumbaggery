import React from 'react'
import List from '../List/List'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BoardContainer } from './BoardStyled'

class BoardBase extends React.Component {
  onDragEnd = (event) => {
    const { destination, source, draggableId } = event

    // Don't have to do anything if item was dropped
    // Outside of list or if the position hasn't changed
    if (!destination) return

    const { type: itemType } = JSON.parse(draggableId)

    // Moving a list
    if (itemType === 'list') {
      this.props.moveList({
        fromIndex: source.index,
        toIndex: destination.index
      })
    }

    // Moving a card
    if (itemType === 'card') {
      const { index: fromListIndex } = JSON.parse(source.droppableId)
      const { index: toListIndex } = JSON.parse(destination.droppableId)

      this.props.moveCard({
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
      boardDetailQuery: { loading, error, board }
    } = this.props

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          type="list"
          direction="horizontal"
          droppableId={`board-${board.id}`}
          >
          {(provided, snapshot) => (
            <BoardContainer innerRef={provided.innerRef}>
              {board.lists.map((list, index) => (
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

export default BoardBase
