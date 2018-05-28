import React from 'react'
import { storiesOf } from '@storybook/react'
import DropDown from './DropDown'

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
              Yay
            </DropDown.Content>
          </DropDown>
        </div>
      )
    })
)

export default DropDownStory
