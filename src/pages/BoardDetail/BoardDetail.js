import React from 'react'
import { BoardProvider } from './BoardContext'
import Board from './Board/Board'
import Header from './Header/Header'
import AddList from './AddList/AddList'
import AddCard from './AddCard/AddCard'
import CardDetail from './CardDetail/CardDetail'
import { BoardDetailContainer, BoardDetailContent } from './BoardDetailStyled'

class BoardDetailPage extends React.Component {
  render() {
    const { 0: type, id } = this.props.match.params
    const boardId = type == "b" ? id : null
    const cardId = type == "c" ? id : null

    return (
      <BoardProvider id={boardId}>
        <BoardDetailContainer>
          <Header />
          <BoardDetailContent>
            <Board />
            <AddCard />
            <AddList />
          </BoardDetailContent>
        </BoardDetailContainer>
        <CardDetail id={cardId} />
      </BoardProvider>
    )
  }
}

export default BoardDetailPage
