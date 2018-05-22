import React from 'react'
import Modal from 'components/Modal/Modal'
import Label from 'components/Label/Label'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

class AddCard extends React.Component {
  render() {
    const { open, onClose } = this.props

    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <Modal.Header>
          Add A Card
        </Modal.Header>
        <Modal.Content>
          <Label>Name</Label>
          <Input placeholder="What needs to be done ?" />
        </Modal.Content>
      </Modal>
    )
  }
}

export default AddCard
