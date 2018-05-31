import React from 'react'
import { BoardConsumer } from '../BoardContext'
import BoardBase from './BoardBase'

const Board = () => (
  <BoardConsumer>
    {({
      boardDetailQuery,
      moveList,
      moveCard,
      isDragDisabled
    }) => (
      <BoardBase
        {...{
          boardDetailQuery,
          moveList,
          moveCard,
          isDragDisabled
        }}
      />
    )}
  </BoardConsumer>
)

export default Board
