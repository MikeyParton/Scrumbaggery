import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleListContainer from './SimpleListContainer'
import styled from 'styled-components'

const FullScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
`

const ListStory = () => {
  storiesOf('List', module)
    .add('Basic', () => {
      return <FullScreen>
        <SimpleListContainer />
      </FullScreen>
    })
}

export default ListStory
