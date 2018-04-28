import React from 'react'
import { Motion, spring } from 'react-motion'
import { Header, OuterContainer, Trigger, ExternalTrigger } from './SidebarStyled'
import MenuIcon from 'react-icons/lib/md/menu'
import CloseIcon from 'react-icons/lib/md/close'

const OPEN_MIN = 0                  // 0% width when closed
const OPEN_MAX = 100                // 100% Width when open
const INTERNAL_BUTTON_OFFSET = 60   // Distance between the end of sidebar and external button
const EXTRA_OFFSET = 10             // 10px A little extra to hide the shadow when the sidebar is closed

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
                  left: `-${(x / OPEN_MAX) * EXTRA_OFFSET}px`,
                  WebkitTransform: `translateX(-${x}%`,
                  transform: `translateX(-${x}%)`,
                }}
                >
                <Header>
                  <div>Sidebar</div>
                  {!showInternalButton && (
                    <Trigger onClick={() => this.toggle()}>
                      <CloseIcon />
                    </Trigger>
                  )}
                </Header>
              </OuterContainer>
            </div>
          )
        }}
      </Motion>
    )
  }
}

export default Sidebar
