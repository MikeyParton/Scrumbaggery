import React from 'react'
import { Motion, spring } from 'react-motion'
import { Header, InnerContainer, OuterContainer, Trigger, ExternalTrigger } from './SidebarStyled'
import MenuIcon from 'react-icons/lib/md/menu'
import CloseIcon from 'react-icons/lib/md/close'
import Tabs from 'components/Tabs/Tabs'
import { withRouter } from 'react-router'

const OPEN_MIN = 0                  // 0% width when closed
const OPEN_MAX = 100                // 100% Width when open
const INTERNAL_BUTTON_OFFSET = 60   // Distance between the end of sidebar and external button
const EXTRA_OFFSET = 10             // 10px A little extra to hide the shadow when the sidebar is closed
const WIDTH = 200

const tabs = [
  { label: 'Home', route: '/' },
  { label: 'Boards', route: '/b' }
]

class Sidebar extends React.Component {
  state = { open: false }

  currentOffset = () => {
    if (!this.sidebar) return 0
    const { x, width } = this.sidebar.getBoundingClientRect()
    return width + x
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { title, children } = this.props
    const { open } = this.state

    return (
      <Motion style={{ x: spring(this.state.open ? OPEN_MIN : OPEN_MAX) }}>
        {({x}) => {
          const currentOffset = this.currentOffset()
          const showInternalButton = currentOffset < INTERNAL_BUTTON_OFFSET - EXTRA_OFFSET

          return (
            <div>
              {showInternalButton && (
                <ExternalTrigger onClick={() => this.toggle()}>
                  <MenuIcon />
                </ExternalTrigger>
              )}
              <OuterContainer
                innerRef={(ref) => { this.sidebar = ref }}
                open={open}
                style={{
                  left: `-${(x / OPEN_MAX) * (WIDTH + EXTRA_OFFSET)}px`
                }}
                >
                <Header>
                  <div>{title}</div>
                  {!showInternalButton && (
                    <Trigger onClick={() => this.toggle()}>
                      <CloseIcon />
                    </Trigger>
                  )}
                </Header>
                <Tabs vertical initialActiveIndex="0">
                  <Tabs.TabList>
                    <Tabs.Tab index="0">Hello</Tabs.Tab>
                    <Tabs.Tab index="1">Yay</Tabs.Tab>
                    <Tabs.ActiveBar />
                  </Tabs.TabList>
                </Tabs>
              </OuterContainer>
            </div>
          )
        }}
      </Motion>
    )
  }
}

Sidebar.defaultProps = {
  title: 'Sidebar'
}

export default Sidebar
