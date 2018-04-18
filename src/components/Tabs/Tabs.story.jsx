import React from 'react'
import { storiesOf } from '@storybook/react'
import Tabs from './Tabs'

const TabsStory = () => (
  storiesOf('Tabs', module)
    .add('Horizontal', () => {

      const tabs = [
        { label: 'Tab 1', content: () => <div>Content 1</div> },
        { label: 'Tab 2', content: () => <div>Content 2</div> },
        { label: 'Tab 3', content: () => <div>Content 3</div> },
        { label: 'Tab 4', content: () => <div>Content 4</div> }
      ]

      return <Tabs tabs={tabs} />
    })
)

export default TabsStory
