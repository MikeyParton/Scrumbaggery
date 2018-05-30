import React from 'react'
import { BoardProvider } from './BoardContext'
import Board from './Board/Board'
import Header from './Header/Header'
import AddList from './AddList/AddList'
import AddCard from './AddCard/AddCard'
import { BoardDetailContainer, BoardDetailContent } from './BoardDetailStyled'

class BoardDetailPage extends React.Component {
  render() {
    return (
      <BoardProvider>
        <BoardDetailContainer>
          <Header />
          <BoardDetailContent>
            <Board />
            <AddCard />
            <AddList />
          </BoardDetailContent>
        </BoardDetailContainer>
      </BoardProvider>
    )
  }
}

export default BoardDetailPage
