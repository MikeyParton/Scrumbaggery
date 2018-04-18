import React from 'react'
import TabManager from '../TabManager/TabManager'
import { TabList, Tab, TabContent, TabActiveBar } from './tabsStyled'

const Tabs = (props) => {
  const { active, tabs } = props

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
}

export default Tabs
