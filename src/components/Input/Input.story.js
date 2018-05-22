import React from 'react'
import { storiesOf } from '@storybook/react'
import Label from 'components/Label/Label'
import Input from './Input'

const InputStory = () => (
  storiesOf('Input', module)
    .add('Basic', () => {
      return (
        <div>
          <Label>Name</Label>
          <Input placeholder="Enter a Name"/>
        </div>
      )
    })
)

export default InputStory
