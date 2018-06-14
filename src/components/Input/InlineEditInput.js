import React from 'react'
import Input from './Input'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import Button from 'components/Button/Button'
import ButtonGroup from 'components/Button/ButtonGroup'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const InnerInput = styled.input`
  flex-grow: 1;
  font-size: 14px;
  height: 35px;
  padding: 0 10px;
  outline: 0;
  border: 1px solid ${props => props.theme.colors.default};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  &:focus {
    ${props => {
      const color = props.theme.colors.primaryLightXXX
      return css`
        box-shadow: 0 4px 8px 0 ${rgba(color, 0.2)}, 0 6px 20px 0 ${rgba(color, 0.2)};
        border: 1px solid ${color};
      `
    }}
  }
`

const InnerValue = styled.div`
  border-radius: 4px;
  font-size: 14px;
  flex-grow: 1;
  padding: 0 10px;
  background-color: ${props => props.theme.colors.defaultLightX};
`

class InlineEditInput extends React.Component {
  state = {
    editing: false,
    originalValue: '',
    newValue: ''
  }

  onEdit = () => {
    this.input.focus()
  }

  stopEditing = () => {
    this.setState({ editing: false })
  }

  onFocus = () => {
    this.setState({
      editing: true,
      newValue: this.state.originalValue
    })
  }

  onChange = (event) => {
    this.setState({ newValue: event.target.value })
  }

  onCancel = () => {
    this.stopEditing()
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({ originalValue: this.state.newValue })
    this.stopEditing()
    this.input.blur()
  }

  render() {
    const { editing, newValue, originalValue } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <InputContainer focus={editing}>
          <InnerInput
            innerRef={(node) => { this.input = node }}
            onChange={this.onChange}
            onFocus={this.onFocus}
            value={editing ? newValue : originalValue}
          />
          <ButtonGroup straightLeftEdge>
            { editing
              ? <React.Fragment>
                  <Button type="button" onClick={this.onCancel}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </React.Fragment>
              : <Button type="button" onClick={this.onEdit}>Edit</Button>
            }
          </ButtonGroup>
        </InputContainer>
      </form>
    )
  }
}

export default InlineEditInput
