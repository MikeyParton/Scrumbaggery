import React from 'react'
import { BoardProvider, BoardConsumer } from './BoardContext'
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

  render() {
    const { addingCardToList, addingList } = this.state

    return (
      <BoardProvider>
        <BoardConsumer>
          {({
            boardDetailQuery: { loading, error, board },
            addList,
            moveList,
            deleteList,
            addCard,
            moveCard
          }) => {
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
                    onMoveCard={moveCard}
                    onMoveList={moveList}
                    onDeleteList={deleteList}
                    onAddCardToList={this.setAddingCardToList}
                  />
                  <AddCard
                    open={Boolean(addingCardToList)}
                    listId={addingCardToList}
                    onClose={() => this.setAddingCardToList(null)}
                    onAddCard={addCard}
                  />
                  <AddList
                    open={addingList}
                    boardId={board.id}
                    onSubmit={addList}
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

export default BoardDetailPage
