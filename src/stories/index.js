import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import TabManager from '../components/TabManager'
import { TabList, Tab, TabContent, TabActiveBar } from '../components/tabStyled'

storiesOf('TabManager', module)
  .add('Basic', () => {

    const tabs = [
      { label: 'Tab 1', content: () => <div>Content 1</div> },
      { label: 'Tab 2', content: () => <div>Content 2</div> },
      { label: 'Tab 3', content: () => <div>Content 3</div> },
      { label: 'Tab 4', content: () => <div>Content 4</div> }
    ]

    return (
      <TabManager
        render={({ getTabProps, active }) => {
          const activeTab = tabs[active]
          const Content = activeTab && activeTab.content

          return (
            <div>
              <TabList>
                {tabs.map(({ label }, index) => (
                  <Tab {...getTabProps({ index, key: index })}>
                    {label}
                  </Tab>
                ))}
                <TabActiveBar active={active}/>
              </TabList>
              {Content && <Content />}
            </div>
          )
        }}
      />
    )
  })
