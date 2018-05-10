import React from 'react'
import { storiesOf } from '@storybook/react'
import Tabs from './Tabs'
import styled from 'styled-components'

const TabsStory = () => (
  storiesOf('Tabs', module)
    .add('Horizontal', () => {
      const tabs = ['Tab 1', 'Tab 2', 'Tab 3']
      return (
        <Tabs initialActiveIndex={0}>
          <Tabs.TabList>
            {tabs.map((label, index) => (
              <Tabs.Tab index={index} key={index}>{label}</Tabs.Tab>
            ))}
            <Tabs.ActiveBar />
          </Tabs.TabList>
        </Tabs>
      )
    })
    .add('Controlled', () => {
      const tabs = ['Tab 1', 'Tab 2', 'Tab 3']

      class TabsController extends React.Component {
        state = {
          active: "0"
        }

        handleChange = (active) => {
          this.setState({ active })
        }

        render() {
          return (
            <div>
              <Tabs
                activeIndex={this.state.active}
                onChange={this.handleChange}
                >
                <Tabs.TabList>
                  {tabs.map((label, index) => (
                    <Tabs.Tab index={index} key={index}>{label}</Tabs.Tab>
                  ))}
                  <Tabs.ActiveBar />
                </Tabs.TabList>
              </Tabs>
              {tabs.map((label, index) => (
                <div>
                  <div>Make {label} active</div>
                  <input type="radio" name="active" value={index} onClick={() => this.handleChange(index)} checked={String(this.state.active) === String(index)}/>
                </div>
              ))}
            </div>
          )
        }
      }

      return (
        <TabsController />
      )
    })
    .add('Vertical', () => {
      const tabs = ['Tab 1', 'Tab 2', 'Tab 3']
      const DemoContainer = styled.div`
        height: 100%;
        width: 200px;
      `
      return (
        <DemoContainer>
          <Tabs vertical>
            <Tabs.TabList>
              {tabs.map((label, index) => (
                <Tabs.Tab index={index} key={index}>{label}</Tabs.Tab>
              ))}
              <Tabs.ActiveBar />
            </Tabs.TabList>
          </Tabs>
        </DemoContainer>
      )
    })
)

export default TabsStory
