import React from 'react'
import Toggle from 'components/Toggle/Toggle'
import Button from 'components/Button/Button'
import { Transition } from 'react-spring'
import { DropDownOption, DropDownContentContainer, RelativeContainer } from './DropDownStyled'

const DropDownContext = React.createContext({
  open: null,
  toggle: () => {}
})


class DropDown extends React.Component {
  static Option = ({ children, ...props }) => (
    <DropDownOption {...props}>
      {children}
    </DropDownOption>
  )

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
        {({ open }) => (
          <Transition
            from={{ opacity: 0, y: -10 }}
            enter={{ opacity: 1, y: 0 }}
            leave={{ opacity: 0, y: -10 }}>
            {open && InnerContent }
          </Transition>
        )}
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
