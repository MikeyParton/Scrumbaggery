import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleListContainer from './SimpleListContainer'
import MultipleListsContainer from './MultipleListsContainer'
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
    .add('Single List', () => {
      return <FullScreen>
        <SimpleListContainer />
      </FullScreen>
    })
    .add('Multiple Lists', () => {
      return <FullScreen>
        <MultipleListsContainer />
      </FullScreen>
    })
}

export default ListStory
