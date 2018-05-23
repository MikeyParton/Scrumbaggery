import React from 'react'
import { withFormik } from 'formik'
import Modal from 'components/Modal/Modal'
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
          Add A Card to
        </Modal.Header>
        <Modal.Content>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input
              onBlur={handleBlur}
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder="What needs to be done ?"
            />
            <button type="submit">Submit</button>
            <Button onClick={handleSubmit} fill="primary">Create</Button>
          </form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default withFormik({
  mapPropsToValues: (props) => ({ name: '' }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onAddCard({ ...values, list_id: props.listId })
  },
  displayName: 'AddCardForm'
})(AddCard)
