import React from 'react'
import Input from './Input'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import Button from 'components/Button/Button'
import ButtonGroup from 'components/Button/ButtonGroup'
import CrossIcon from 'react-icons/lib/md/clear'
import TickIcon from 'react-icons/lib/md/check'
import EditIcon from 'react-icons/lib/md/edit'
import { Spring } from 'react-spring'

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const InnerInput = styled.input`
  z-index: 3;
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
    const animatedStyles = editing
      ? { width: 76, editingOpacity: 1, editOpacity: 0 }
      : { width: 38, editingOpacity: 0, editOpacity: 1 }

    return (
      <form onSubmit={this.onSubmit}>
        <InputContainer focus={editing}>
          <InnerInput
            innerRef={(node) => { this.input = node }}
            onChange={this.onChange}
            onFocus={this.onFocus}
            value={editing ? newValue : originalValue}
          />
            <Spring to={animatedStyles}>
              {({ width, editingOpacity, editOpacity }) => (
                <div style={{ position: 'relative', width: width, height: 35 }}>
                  <ButtonGroup style={{ opacity: editingOpacity, zIndex: 1 + editingOpacity, position: 'absolute', right: 0, top: 0 }} straightLeftEdge>
                    <Button fill="danger" type="button" onClick={this.onCancel}><CrossIcon /></Button>
                    <Button fill="primary" type="submit"><TickIcon /></Button>
                  </ButtonGroup>
                  <ButtonGroup style={{ opacity: editOpacity, zIndex: 1 + editOpacity, position: 'absolute', right: 0, top: 0 }} straightLeftEdge>
                    <Button fill="secondary" type="button" onClick={this.onEdit}><EditIcon /></Button>
                  </ButtonGroup>
                </div>
              )}
            </Spring>
        </InputContainer>
      </form>
    )
  }
}

export default InlineEditInput
