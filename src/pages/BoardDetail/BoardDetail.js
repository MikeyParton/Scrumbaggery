import React from 'react'
import { BoardProvider, BoardConsumer } from './BoardContext'
import Button from 'components/Button/Button'
import Board from './Board/Board'
import Header from './Header/Header'
import AddList from './AddList/AddList'
import AddCard from './AddCard/AddCard'

class BoardDetailPage extends React.Component {
  render() {
    return (
      <BoardProvider>
        <BoardConsumer>
          {({ addList, addCard }) => {
            return (
              <div style={{ width: '100vw', display: 'flex', flexDirection: 'column'}}>
                <Header />
                <div style={{ marginTop: 50, display: 'flex', flexGrow: 1 }}>
                  <Board />
                  <AddCard onAddCard={addCard} />
                  <AddList onSubmit={addList} />
                </div>
              </div>
            )
          }}
        </BoardConsumer>
      </BoardProvider>
    )
  }
}

export default BoardDetailPage
