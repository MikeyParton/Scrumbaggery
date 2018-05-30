import React from 'react'
import { graphql, compose } from 'react-apollo'
import { BOARD_DETAIL_QUERY } from 'data'

const BoardContext = React.createContext({
  boardDetailQuery: () => {}
})

export const BoardConsumer = BoardContext.Consumer

class BoardProviderBase extends React.Component {
  render() {
    const { boardDetailQuery, children } = this.props

    return (
      <BoardContext.Provider value={{
        boardDetailQuery
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
  })
)(BoardProviderBase)
