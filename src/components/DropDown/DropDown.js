import React from 'react'
import Toggle from 'components/Toggle/Toggle'
import Button from 'components/Button/Button'
import { Transition } from 'react-spring'
import styled from 'styled-components'

const RelativeContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropDownContentContainer = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 10px;
  background-color: white;
  width: 200px;
  box-shadow: 0px 4px 8px 0.5px rgba(0,0,0,0.2);
  border-radius: 5px;
  overflow: hidden;
`

const DropDownContext = React.createContext({
  open: null,
  toggle: () => {}
})

class DropDown extends React.Component {
  static Button = (props) => {
    const { children, onClick, ...buttonProps } = props
    return (
      <DropDownContext.Consumer>
        {({ toggle }) => (
          <Button {...buttonProps} onClick={() => { toggle(); onClick && onClick();}}>
            {props.children}
          </Button>
        )}
      </DropDownContext.Consumer>
    )
  }

  static Content = (props) => {
    const InnerContent = (otherProps) => (
      <DropDownContentContainer style={{
        opacity: otherProps.opacity,
        transform: `translateY(${otherProps.y}px)`
      }}>
        {props.children}
      </DropDownContentContainer>
    )

    return (
      <DropDownContext.Consumer>
        {({ open }) => {
          console.log(open)

          return (
            <Transition
              from={{ opacity: 0, y: -10 }}
              enter={{ opacity: 1, y: 0 }}
              leave={{ opacity: 0, y: -10 }}>
              {open && InnerContent }
            </Transition>
          )
        }}
      </DropDownContext.Consumer>
    )
  }

  toggle = () => {
    this.setState({ open: !this.state.open })
  }

  state = {
    open: false,
    toggle: this.toggle
  }

  render() {
    return(
      <DropDownContext.Provider value={this.state}>
        <RelativeContainer>
          {this.props.children}
        </RelativeContainer>
      </DropDownContext.Provider>
    )
  }
}

export default DropDown
