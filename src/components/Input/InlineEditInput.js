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
      const color = props.theme.colors['primary-30']
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
  background-color: ${props => props.theme.colors['grey-10']};
`

class InlineEditInput extends React.Component {
  state = {
    editing: false,
    originalValue: '',
    newValue: ''
  }

  startEditing = () => {
    this.setState({ editing: true })
    this.input.focus()
  }

  stopEditing = () => {
    this.setState({ editing: false })
  }

  onChange = (event) => {
    this.setState({ newValue: event.target.value })
  }

  onCancel = () => {
    this.stopEditing()
  }

  onSave = () => {
    this.setState({ originalValue: this.state.newValue })
    this.stopEditing()
  }

  render() {
    const { editing, newValue, originalValue } = this.state
    return (
      <InputContainer focus={editing}>
        <InnerInput
          innerRef={(node) => { this.input = node }}
          onFocus={this.startEditing}
          onChange={this.onChange}
          value={editing ? newValue : originalValue}
        />
        <ButtonGroup straightLeftEdge>
          { editing
            ? <React.Fragment>
                <Button onClick={this.onCancel}>Cancel</Button>
                <Button onClick={this.onSave}>Save</Button>
              </React.Fragment>
            : <Button onClick={this.startEditing}>Edit</Button>
          }
        </ButtonGroup>
      </InputContainer>
    )
  }
}

export default InlineEditInput
