import React from 'react'
import { Query } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { crossParentReorder, reorder, addToList, removeFromList } from 'utils/list'
import {
  ADD_CARD_MUTATION,
  BOARD_DETAIL_QUERY,
  MOVE_LIST_MUTATION,
  MOVE_CARD_MUTATION,
  BoardDetailPageData
} from 'data'
import Board from 'components/Board/Board'
import AddCard from 'components/AddCard/AddCard'

class BoardDetailPage extends React.Component {
  state = {
    addingCardToList: null
  }

  setAddingCardToList = (id) => {
    this.setState({ addingCardToList: id })
  }

  onAddCard = (values) => {
    const { boardDetailQuery: { board }, addCardMutation } = this.props

    addCardMutation({
      variables: {
        list_id: values.list_id,
        name: values.name
      },
      optimisticResponse: {
        __typename: "Mutation",
        create_card: {
          __typename: "Card",
          name: values.name,
          id: Math.round(Math.random() * -1000000),
        }
      },
      update: (store, response) => {
        const card = response.data.create_card

        const list = store.readFragment({
          id: `List:${values.list_id}`,
          fragment: BoardDetailPageData.fragments.list,
          fragmentName: 'BoardDetailPageList'
        })

        store.writeFragment({
          id: `List:${values.list_id}`,
          fragment: BoardDetailPageData.fragments.list,
          data: { ...list, cards: [...list.cards, card] },
          fragmentName: 'BoardDetailPageList'
        });
      }
    })
    this.setAddingCardToList(null)
  }

  onMoveList = ({ fromIndex, toIndex }) => {
    const { boardDetailQuery: { board }, moveListMutation } = this.props
    const list = board.lists[fromIndex]
    const data = { board: { ...board, lists: reorder(board.lists, fromIndex, toIndex) }}

    moveListMutation({
      variables: {
        id: list.id,
        position: toIndex
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
        position: toIndex,
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
    const { addingCardToList } = this.state
    const { loading, error, board } = this.props.boardDetailQuery

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error</div>

    return (
      <div style={{ display: 'flex'}}>
        <Board
          board={board}
          onMoveCard={this.onMoveCard}
          onMoveList={this.onMoveList}
          onAddCardToList={this.setAddingCardToList}
        />
        <AddCard
          open={Boolean(addingCardToList)}
          listId={addingCardToList}
          onClose={() => this.setAddingCardToList(null)}
          onAddCard={this.onAddCard}
        />
      </div>
    )
  }
}

export default compose(
  graphql(ADD_CARD_MUTATION, {
    name: 'addCardMutation'
  }),
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
