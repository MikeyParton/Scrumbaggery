import React from 'react'
import { withFormik } from 'formik'
import { BoardConsumer } from '../BoardContext'
import Modal from 'components/Modal/Modal'
import FormGroup from 'components/FormGroup/FormGroup'
import Label from 'components/Label/Label'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

class AddCard extends React.Component {
  render() {
    const {
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
      <BoardConsumer>
        {({ addingCardToListId, setAddingCardToListId }) => (
          <Modal
            open={addingCardToListId}
            onClose={() => setAddingCardToListId(null)}>
            <Modal.Header>
              <b>Make a New Card</b>
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
                  placeholder="What needs to be done ?"
                />
              </Modal.Content>
              <Modal.Footer alignRight>
                <Button disabled={!values.name} onClick={handleSubmit} fill="primary">Create</Button>
              </Modal.Footer>
            </form>
          </Modal>
        )}
      </BoardConsumer>
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
