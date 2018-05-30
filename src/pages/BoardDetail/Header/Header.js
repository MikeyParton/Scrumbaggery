import React from 'react'
import Button from 'components/Button/Button'
import { BoardConsumer } from '../BoardContext'

const Header = () => {
  return (
    <BoardConsumer>
      {({
        boardDetailQuery: { loading, error, board },
        setAddingList
      }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        return (
          <div style={{ padding: 20, position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <b style={{ marginRight: 20 }}>{board.name}</b>
            <Button
              onClick={() => setAddingList(true)}
              fill="primary">
              Add a List
            </Button>
          </div>
        )
      }}
    </BoardConsumer>
  )
}

export default Header
