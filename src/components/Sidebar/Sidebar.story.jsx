import React from 'react'
import { storiesOf } from '@storybook/react'
import Sidebar from './Sidebar'
import styled from 'styled-components'

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const SidebarStory = () => (
  storiesOf('Sidebar', module)
    .add('Basic', () => {
      return (
        <FullScreen>
          <Sidebar />
        </FullScreen>
      )
    })

)

export default SidebarStory
