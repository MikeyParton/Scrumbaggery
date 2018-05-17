import React from 'react'
import { Query } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { reorder, addToList, removeFromList } from 'utils/list'
import { BOARD_DETAIL_QUERY, MOVE_LIST_MUTATION, MOVE_CARD_MUTATION } from 'data'
import Board from 'components/Board/Board'

class BoardDetailPage extends React.Component {
  onMoveList = ({ id, from, to }) => {
    const { boardDetailQuery: { board }, moveListMutation } = this.props
    const data = { board: { ...board, lists: reorder(board.lists, from, to) }}

    moveListMutation({
      variables: {
        id,
        position: to + 1
      },
      optimisticResponse: {
        __typename: "Mutation",
        move_list: {
          __typename: "Board",
          id: board.id
        }
      },
      update: (store, response) => {
        store.writeQuery({ query: BOARD_DETAIL_QUERY, data })
      }
    })
  }

  onMoveCard = ({ id, from, to }) => {
    const { boardDetailQuery: { board }, moveCardMutation } = this.props
    const startingFromList = board.lists[from.listIndex].cards

    const finalFromList = removeFromList(
      startingFromList,
      from.position
    )

    const startingToList = to.listId === from.listId
      ? finalFromList
      : board.lists[to.listIndex].cards

    const finalToList = addToList(
      startingToList,
      startingFromList[from.position],
      to.position
    )

    const newLists = board.lists.map((list) => {
      if (list.id == from.listId && list.id != to.listId) {
        return { ...list, cards: finalFromList }
      }
      if (list.id == to.listId) {
        return { ...list, cards: finalToList }
      }
      return list
    })

    moveCardMutation({
      variables: {
        id,
        position: to.position + 1,
        list_id: to.listId
      },
      optimisticResponse: {
        __typename: "Mutation",
        move_card: {
          __typename: "Board",
          id: board.id
        }
      },
      update: (store, response) => {
        const data = { board: { ...board, lists: newLists }}
        store.writeQuery({ query: BOARD_DETAIL_QUERY, data })
      }
    })
  }

  render() {
    const { loading, error, board } = this.props.boardDetailQuery

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
      <Board
        board={board}
        onMoveCard={this.onMoveCard}
        onMoveList={this.onMoveList}
      />
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
)(BoardDetailPage)
