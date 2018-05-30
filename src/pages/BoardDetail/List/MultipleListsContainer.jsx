import React, { Component } from 'react'
import List from './List'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Board } from './ListStyled'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }))

class SimpleListContainer extends React.Component {
  state = { items: getItems(10) }

  onDragEnd = (result) => {
    if (!result.destination) return

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({ items })
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Board>
          <List items={this.state.items} />
          <List items={this.state.items} />
        </Board>
      </DragDropContext>
    )
  }
}

export default SimpleListContainer
