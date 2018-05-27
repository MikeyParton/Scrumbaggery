import React from 'react'
import { withFormik } from 'formik'
import Modal from 'components/Modal/Modal'
import FormGroup from 'components/FormGroup/FormGroup'
import Label from 'components/Label/Label'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

class AddCard extends React.Component {
  render() {
    const {
      open,
      onClose,
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    } = this.props
    return (
      <Modal open={open} onClose={onClose}>
        <Modal.Header>
          <b>Make a New List</b>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Content>
            <Label htmlFor="name">Name</Label>
            <Input
              autoFocus="true"
              onBlur={handleBlur}
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder="What do you want to call your new list ?"
            />
          </Modal.Content>
          <Modal.Footer alignRight>
            <Button disabled={!values.name} onClick={handleSubmit} fill="primary">Create</Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
}

export default withFormik({
  mapPropsToValues: (props) => ({ name: '' }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit({ ...values, board_id: props.boardId })
  },
  displayName: 'AddCardForm'
})(AddCard)
