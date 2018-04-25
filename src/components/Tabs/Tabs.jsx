import React from 'react'
import TabManager from '../TabManager/TabManager'
import { TabListOuter, TabList, Tab, TabContent, TabActiveBar } from './tabsStyled'
import { Motion, TransitionMotion, spring }  from 'react-motion'

class Tabs extends React.Component {
  state = {
    active: 0
  }

  onChange = (active) => {
    this.setState({ active })
  }

  getDefaultStyles = () => {
    return [{
      style: { position: 'absolute' }
    }]
  }

  getStyles = () => {
    const { tabs } = this.props
    const { active } = this.state
    const activeTab = tabs[active]
    const Content = activeTab && activeTab.content

    return [{
      key: `tab-${active}`,
      style: { opacity: spring(1) },
      data: {
        Content
      }
    }]
  }

  willEnter() {
    return { opacity: 0 }
  }

  willLeave() {
    return { opacity: spring(0) }
  }

  render() {
    const { tabs } = this.props

    return (
      <TabManager
        active={this.state.active}
        onChange={this.onChange}
        render={({ getTabProps, active }) => {

          return (
            <div>
              <TabListOuter>
                <TabList>
                  {tabs.map(({ label }, index) => (
                    <Tab {...getTabProps({ index, key: index })}>
                      {label}
                    </Tab>
                  ))}
                  <Motion style={{ left: spring(active * 90) }}>
                    {style => <TabActiveBar style={style}/> }
                  </Motion>
                </TabList>
              </TabListOuter>
                <TransitionMotion
                  willEnter={this.willEnter}
                  willLeave={this.willLeave}
                  styles={this.getStyles()}
                  >
                  {elements => {
                    return (
                      <div>
                        {elements.map(({ key, style, data: { Content } }) => (
                          <TabContent key={key} style={style}>
                            <Content />
                          </TabContent>
                        ))}
                      </div>
                    )
                  }}
                </TransitionMotion>
            </div>
          )
        }}
      />
    )
  }
}

export default Tabs
