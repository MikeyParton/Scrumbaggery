import React from 'react'
import { storiesOf } from '@storybook/react'
import CircleButton from './CircleButton'
import styled from 'styled-components'

const SidebarStory = () => (
  storiesOf('Buttons', module)
    .add('Circle', () => {
      return (
        <CircleButton primary />
      )
    })

)

export default SidebarStory
