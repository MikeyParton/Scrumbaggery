import React from 'react'
import { storiesOf } from '@storybook/react'
import Modal from './Modal'
import Button from 'components/Button/Button'
import { boolean, withKnobs } from '@storybook/addon-knobs';

class SimpleModal extends React.Component {
  state = {
    open: false
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { open } = this.state
    return (
      <div>
        <Button fill="primary" onClick={this.toggle}>Toggle</Button>
        <Modal onClose={this.toggle} open={open} withOverlay>
          <Modal.Header withClose>
            <b>Add Card</b>
          </Modal.Header>
          <Modal.Content>
            Form goes here ...
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const ModalStory = () => {
  storiesOf('Modal', module)
    .add('Basic', () => {
      return <SimpleModal />
    })
}

export default ModalStory
