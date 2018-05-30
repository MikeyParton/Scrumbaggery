import React from 'react'
import { storiesOf } from '@storybook/react'
import DropDown, { DropDownOption } from './DropDown'

const DropDownStory = () => (
  storiesOf('DropDown', module)
    .add('Basic', () => {
      return (
        <div style={{ width: 300, display: 'flex', justifyContent: 'flex-end' }}>
          <DropDown>
            <DropDown.Button>
              Toggle Me
            </DropDown.Button>
            <DropDown.Content>
              <DropDownOption>Yay</DropDownOption>
              <DropDownOption>Cheese</DropDownOption>
              <DropDownOption>Bacon</DropDownOption>
            </DropDown.Content>
          </DropDown>
        </div>
      )
    })
)

export default DropDownStory
