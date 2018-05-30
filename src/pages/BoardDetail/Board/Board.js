import React from 'react'
import { BoardConsumer } from '../BoardContext'
import BoardBase from './BoardBase'

const Board = () => (
  <BoardConsumer>
    {({
      boardDetailQuery,
      moveList,
      moveCard
    }) => (
      <BoardBase
        {...{
          boardDetailQuery,
          moveList,
          moveCard
        }}
      />
    )}
  </BoardConsumer>
)

export default Board
