import React from 'react'
import { graphql, compose } from 'react-apollo'
import { crossParentReorder, reorder, addToList, removeFromList } from 'utils/list'
import {
  BOARD_DETAIL_QUERY,
  ADD_LIST_MUTATION,
  MOVE_LIST_MUTATION,
  DELETE_LIST_MUTATION,
  ADD_CARD_MUTATION,
  MOVE_CARD_MUTATION,
  BoardDetailPageData
} from 'data'

const BoardContext = React.createContext({
  boardDetailQuery: () => {}
})

export const BoardConsumer = BoardContext.Consumer

class BoardProviderBase extends React.Component {
  state = {
    addingList: false,
    addingCardToListId: null
  }

  addList = (values) => {
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
  }

  moveList = ({ fromIndex, toIndex }) => {
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

  deleteList = (id) => {
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
          data: {
            board: {
              ...board,
              lists: board.lists.filter(list => list.id != id)
            }
          }
        })
      }
    })
  }

  addCard = (values) => {
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
  }

  moveCard = ({ fromListIndex, fromIndex, toListIndex, toIndex }) => {
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
    const { boardDetailQuery, children } = this.props

    return (
      <BoardContext.Provider value={{
        boardDetailQuery,
        addList: this.addList,
        moveList: this.moveList,
        deleteList: this.deleteList,
        addCard: this.addCard,
        moveCard: this.moveCard,
        setAddingList: (addingList) => {
          this.setState({ addingList })
        },
        setAddingCardToListId: (addingCardToListId) => {
          this.setState({ addingCardToListId })
        },
        ...this.state
      }}>
        {children}
      </BoardContext.Provider>
    )
  }
}

export const BoardProvider = compose(
  graphql(BOARD_DETAIL_QUERY, {
    name: 'boardDetailQuery',
    options: (props) => ({ variables: { id: 1 }})
  }),
  graphql(ADD_LIST_MUTATION, { name: 'addListMutation' }),
  graphql(MOVE_LIST_MUTATION, { name: 'moveListMutation' }),
  graphql(DELETE_LIST_MUTATION, { name: 'deleteListMutation' }),
  graphql(ADD_CARD_MUTATION, { name: 'addCardMutation' }),
  graphql(MOVE_CARD_MUTATION, { name: 'moveCardMutation' })
)(BoardProviderBase)
