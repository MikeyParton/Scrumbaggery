import React from 'react'
import { Motion, spring } from 'react-motion'
import { Header, OuterContainer, Trigger, ExternalTrigger } from './SidebarStyled'
import MenuIcon from 'react-icons/lib/md/menu'
import CloseIcon from 'react-icons/lib/md/close'

class Sidebar extends React.Component {
  state = {
    open: false,
    showShadow: false
  }

  currentOffset = () => {
    if (!this.sidebar) return 0
    const { x, width } = this.sidebar.getBoundingClientRect()
    return width + x
  }

  toggle = (key) => {
    this.setState({ [key]: !this.state[key] })
  }

  render() {
    const { open , showShadow} = this.state

    return (
      <Motion style={{
        x: spring(this.state.open ? 0 : 100),
        shadowX: spring(this.state.showShadow ? 0 : 1)
      }}
      >
        {({x, shadowX}) => {
          const currentOffset = this.currentOffset()
          const showInternalButton = currentOffset < 60

          return (
            <div>
              {showInternalButton && (
                <ExternalTrigger onClick={() => this.toggle('open')}>
                  <MenuIcon />
                </ExternalTrigger>
              )}
              <OuterContainer
                innerRef={(ref) => { this.sidebar = ref }}
                open={open}
                style={{
                  left: `-${0.1 * x}px`,
                  WebkitTransform: `translateX(-${x}%`,
                  transform: `translateX(-${x}%)`,
                }}
                >
                <Header>
                  <div>Sidebar</div>
                  {!showInternalButton && (
                    <Trigger onClick={() => this.toggle('open')}>
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
