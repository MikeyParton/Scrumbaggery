import React from 'react'
import { Motion, spring } from 'react-motion'
import { Header, OuterContainer, Trigger, ExternalTrigger } from './SidebarStyled'

class Sidebar extends React.Component {
  state = {
    open: false
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { open } = this.state

    return (
      <Motion style={{
        x: spring(this.state.open ? 0 : 200),
      }}>
        {({x}) => {
          return (
            <div>
              <ExternalTrigger
                onClick={this.toggle}
                style={{
                  display: x > 155.84 ? 'block' : 'none'
                }}
              />
              <OuterContainer
                open={open}
                style={{
                  WebkitTransform: `translateX(-${x}px`,
                  transform: `translateX(-${x}px)`,
                }}
              >
                <Header>
                  <div>Sidebar</div>
                  <Trigger
                    onClick={this.toggle}
                    style={{
                      display: x < 155.84 ? 'block' : 'none'
                    }}
                  />
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
