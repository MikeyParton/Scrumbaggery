import React from 'react'
import TabManager from '../TabManager/TabManager'
import { TabListOuter, TabList, Tab, TabContent, TabActiveBar } from './tabsStyled'
import { Transition, Spring } from 'react-spring'

class Tabs extends React.Component {
  state = {
    active: 0
  }

  onChange = (active) => {
    this.setState({ active })
    this.props.onChange(active)
  }

  render() {
    const { active } = this.state
    const { tabs, vertical } = this.props
    const Content = tabs[active].content

    return (
      <TabManager
        active={active}
        onChange={this.onChange}
        render={({ getTabProps, active }) => {
          return (
            <div>
              <TabListOuter>
                <TabList vertical={vertical}>
                  {tabs.map(({ label }, index) => (
                    <Tab {...getTabProps({
                      index,
                      vertical,
                      key: index
                    })}>
                      {label}
                    </Tab>
                  ))}
                  <Spring to={ vertical ? { top: active * 39 } : { left: active * 90 }}>
                    {style => {
                      return <TabActiveBar vertical={vertical} style={style} />
                    }}
                  </Spring>
                </TabList>
              </TabListOuter>
              {Content && (
                <Transition from={{ opacity: 0 }} enter={{ opacity: 1 }} leave={{ opacity: 0 }}>
                  <Content />
                </Transition>
              )}
            </div>
          )
        }}
      />
    )
  }
}

Tabs.defaultProps = {
  onChange: () => {}
}

export default Tabs
