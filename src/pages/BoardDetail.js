import React from 'react'
import { Query } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { crossParentReorder, reorder, addToList, removeFromList } from 'utils/list'
import { BOARD_DETAIL_QUERY, MOVE_LIST_MUTATION, MOVE_CARD_MUTATION } from 'data'
import Board from 'components/Board/Board'

class BoardDetailPage extends React.Component {
  onMoveList = ({ fromIndex, toIndex }) => {
    const { boardDetailQuery: { board }, moveListMutation } = this.props
    const list = board.lists[fromIndex]
    const data = { board: { ...board, lists: reorder(board.lists, fromIndex, toIndex) }}

    moveListMutation({
      variables: {
        id: list.id,
        position: toIndex + 1
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

  onMoveCard = ({
    fromListIndex,
    fromIndex,
    toListIndex,
    toIndex
   }) => {
    const { boardDetailQuery: { board }, moveCardMutation } = this.props
    const card = board.lists[fromListIndex].cards[fromIndex]
    const toList = board.lists[toListIndex]

    const newLists = crossParentReorder({
      lists: board.lists,
      listKey: 'cards',
      fromListIndex,
      fromIndex,
      toListIndex,
      toIndex
    })

    moveCardMutation({
      variables: {
        id: card.id,
        position: toListIndex,
        list_id: toList.id
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
