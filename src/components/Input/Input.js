import React from 'react'
import { InputBase } from './InputStyled'

const Input = (props) => {
  return (
    <InputBase autoComplete="off" {...props} />
  )
}

export default Input
