import React from 'react'
import { BoardConsumer } from '../BoardContext'
import { Formik } from 'formik';
import Modal from 'components/Modal/Modal'
import FormGroup from 'components/FormGroup/FormGroup'
import Label from 'components/Label/Label'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

const AddCard = () => (
  <BoardConsumer>
    {({ addCard, addingCardToListId, setAddingCardToListId }) => (
      <Modal open={addingCardToListId} onClose={() => setAddingCardToListId(null)}>
        <Modal.Header>
          <b>Make a New Card</b>
        </Modal.Header>
        <Formik
          initialValues={{ name: '', list_id: addingCardToListId }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            addCard(values)
            setAddingCardToListId(null)
          }}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
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
                <Button
                  disabled={!values.name}
                  onClick={handleSubmit}
                  fill="primary">
                  Create</Button>
              </Modal.Footer>
            </form>
          )}/>
      </Modal>
    )}
  </BoardConsumer>
)

export default AddCard
