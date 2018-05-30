import React from 'react'
import { BoardConsumer } from '../BoardContext'
import { Formik } from 'formik';
import Modal from 'components/Modal/Modal'
import FormGroup from 'components/FormGroup/FormGroup'
import Label from 'components/Label/Label'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

const AddList = () => (
  <BoardConsumer>
    {({ addList, addingList, setAddingList }) => (
      <Modal open={addingList} onClose={() => setAddingList(false)}>
        <Modal.Header>
          <b>Make a New List</b>
        </Modal.Header>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            addList(values)
            setAddingList(false)
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
                  placeholder="What do you want to call your new list ?"
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

export default AddList
