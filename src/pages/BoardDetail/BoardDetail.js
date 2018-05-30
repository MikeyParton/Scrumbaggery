import React from 'react'
import { BoardProvider, BoardConsumer } from './BoardContext'
import { graphql, compose } from 'react-apollo'
import { crossParentReorder, reorder, addToList, removeFromList } from 'utils/list'
import {
  ADD_LIST_MUTATION,
  DELETE_LIST_MUTATION,
  ADD_CARD_MUTATION,
  BOARD_DETAIL_QUERY,
  MOVE_LIST_MUTATION,
  MOVE_CARD_MUTATION,
  BoardDetailPageData
} from 'data'
import Button from 'components/Button/Button'
import Board from 'components/Board/Board'
import AddCard from 'components/AddCard/AddCard'
import AddList from 'components/AddList/AddList'

class BoardDetailPage extends React.Component {
  state = {
    addingCardToList: null,
    addingList: false
  }

  setAddingList = (addingList) => {
    this.setState({ addingList })
  }

  setAddingCardToList = (id) => {
    this.setState({ addingCardToList: id })
  }

  onAddList = (values) => {
    const { boardDetailQuery: { board }, addListMutation } = this.props
    addListMutation({
      variables: {
        board_id: board.id,
        name: values.name
      },
      optimisticResponse: {
        __typename: "Mutation",
        create_list: {
          __typename: "List",
          name: values.name,
          id: Math.round(Math.random() * -1000000),
          cards: []
        }
      },
      update: (store, response) => {
        const list = response.data.create_list
        store.writeQuery({
          query: BOARD_DETAIL_QUERY,
          data: {
            board: {
              ...board,
              lists: [
                list,
                ...board.lists
              ]
            }
          }
        })
      }
    })
    this.setAddingList(false)
  }

  onDeleteList = (id) => {
    const { boardDetailQuery: { board }, deleteListMutation } = this.props
    deleteListMutation({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        delete_list: {
          __typename: "List",
          id
        }
      },
      update: (store, response) => {
        store.writeQuery({
          query: BOARD_DETAIL_QUERY,
          data: { board: { ...board, lists: board.lists.filter(list => list.id != id) }}
        })
      }
    })
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
          data: { ...list, cards: [card, ...list.cards] },
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
          __typename: "Card",
          id: card.id
        }
      },
      update: (store, response) => {
        const data = { board: { ...board, lists: newLists }}
        store.writeQuery({ query: BOARD_DETAIL_QUERY, data })
      }
    })
  }

  render() {
    const { addingCardToList, addingList } = this.state

    return (
      <BoardProvider>
        <BoardConsumer>
          {({ boardDetailQuery: { loading, error, board } }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>

            return (
              <div style={{ width: '100vw', display: 'flex', flexDirection: 'column'}}>
                <div style={{ padding: 20, position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <b style={{ marginRight: 20 }}>{board.name}</b>
                  <Button
                    onClick={()=> this.setAddingList(true)}
                    fill="primary">
                    Add a List
                  </Button>
                </div>
                <div style={{ marginTop: 50, display: 'flex', flexGrow: 1 }}>
                  <Board
                    board={board}
                    onMoveCard={this.onMoveCard}
                    onMoveList={this.onMoveList}
                    onDeleteList={this.onDeleteList}
                    onAddCardToList={this.setAddingCardToList}
                  />
                  <AddCard
                    open={Boolean(addingCardToList)}
                    listId={addingCardToList}
                    onClose={() => this.setAddingCardToList(null)}
                    onAddCard={this.onAddCard}
                  />
                  <AddList
                    open={addingList}
                    boardId={board.id}
                    onSubmit={this.onAddList}
                    onClose={() => this.setAddingList(false)}
                  />
                </div>
              </div>
            )
          }}
        </BoardConsumer>
      </BoardProvider>
    )
  }
}

export default compose(
  graphql(ADD_LIST_MUTATION, {
    name: 'addListMutation'
  }),
  graphql(DELETE_LIST_MUTATION, {
    name: 'deleteListMutation'
  }),
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
