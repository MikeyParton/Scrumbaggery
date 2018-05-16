import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { reorder, addToList, removeFromList } from 'utils/list'
import List from 'components/List/List'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const BoardContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;

  > * {
    &:not(first-child) {
      margin-right: 20px;
    }
  }
`

const BOARD_DETAIL_QUERY = gql`
  query BoardDetail($id: ID!) {
    board(id: $id) {
      id
      name
      lists {
        id
        name
        cards {
          id
          name
        }
      }
    }
  }
`

const MOVE_LIST_MUTATION = gql`
  mutation MoveList($id: ID!, $position: Int!) {
    move_list(id: $id, position: $position) {
      id
    }
  }
`

const MOVE_CARD_MUTATION = gql`
  mutation MoveCard($id: ID!, $position: Int!, $list_id: ID!) {
    move_card(id: $id, position: $position, list_id: $list_id) {
      id
    }
  }
`

class BoardDetail extends React.Component {
  onDragEnd = (event) => {
    const { destination, source, draggableId } = event

    // Don't have to do anything if item was dropped
    // Outside of list or if the position hasn't changed
    if (!destination) return

    const { id: itemId, type: itemType } = JSON.parse(draggableId)
    const {
      moveListMutation,
      moveCardMutation,
      boardDetailQuery
    } = this.props

    const board = boardDetailQuery.board
    const lists = board.lists

    // Moving a list
    if (itemType === 'list') {
      moveListMutation({
        variables: {
          id: itemId,
          position: destination.index + 1
        },
        optimisticResponse: {
          __typename: "Mutation",
          move_list: {
            __typename: "Board",
            id: board.id
          }
        },
        update: (store, response) => {
          const data = {
            board: {
              ...board,
              lists: reorder(lists, source.index, destination.index)
            }
          }

          store.writeQuery({ query: BOARD_DETAIL_QUERY, data })
        }
      })
    }

    // Moving a card
    if (itemType === 'card') {

      const { id: fromListId, index: fromListIndex } = JSON.parse(source.droppableId)
      const { id: toListId, index: toListIndex } = JSON.parse(destination.droppableId)

      const startingFromList = board.lists[fromListIndex].cards

      const finalFromList = removeFromList(
        startingFromList,
        source.index
      )

      const startingToList = toListId === fromListId
        ? finalFromList
        : board.lists[toListIndex].cards

      const finalToList = addToList(
        startingToList,
        startingFromList[source.index],
        destination.index
      )

      const newLists = board.lists.map((list) => {
        if (list.id == fromListId && list.id != toListId) {
          return { ...list, cards: finalFromList }
        }
        if (list.id == toListId) {
          return { ...list, cards: finalToList }
        }
        return list
      })

      moveCardMutation({
        variables: {
          id: itemId,
          position: destination.index + 1,
          list_id: toListId
        },
        optimisticResponse: {
          __typename: "Mutation",
          move_card: {
            __typename: "Board",
            id: board.id
          }
        },
        update: (store, response) => {
          const data = {
            board: {
              ...board,
              lists: newLists
            }
          }

          store.writeQuery({ query: BOARD_DETAIL_QUERY, data })
        }
      })
    }
  }

  updateCache = (store, newData) => {
    const oldData = store.readQuery({ query: BOARD_DETAIL_QUERY, variables: { id: 1 } })
    const data = { board: { ...oldData.board, lists: newData.lists }}
    store.writeQuery({ query: BOARD_DETAIL_QUERY, data })
  }

  render() {
    const { loading, error, board } = this.props.boardDetailQuery

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    const { name, lists, id } = board

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

export default compose(
  graphql(MOVE_LIST_MUTATION, {
    name: 'moveListMutation'
  }),
  graphql(MOVE_CARD_MUTATION, {
    name: 'moveCardMutation'
  }),
  graphql(BOARD_DETAIL_QUERY, {
    name: 'boardDetailQuery',
    options: { variables: { id: 1 }}
  })
)(BoardDetail)
