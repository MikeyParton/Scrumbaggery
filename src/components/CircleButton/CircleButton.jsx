import React from 'react'
import styled from 'styled-components'
import { Spring, Keyframes, animated } from 'react-spring'

const CircleButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 25px;
  background-color: ${(props) =>
    (props.primary && props.theme.colors.primary) ||
      props.theme.colors.default
  };
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px;
`

class ButtonWrapper extends React.Component {
  state = {
    clicked: false,
    mouseDown: false,
    hover: false
  }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false })
  }

  onMouseDown = () => {
    this.setState({
      clicked: true,
      mouseDown: true
    })
  }

  onMouseUp = () => {
    this.setState({ mouseDown: false })
  }

  onRest = () => {
    if (this.state.clicked) {
      this.setState({ clicked: false })
    }
  }

  render() {
    const { clicked, mouseDown, hover } = this.state

    const upStyle = { scale: 1, shadow: 2 }
    const downStyle = { scale: 0.95, shadow: 0 }
    const hoverStyle = { scale: 1.05, shadow: 4 }

    const toStyle = clicked || mouseDown
      ? downStyle
      : hover
        ? hoverStyle
        : upStyle

    return(
      <Spring
        to={toStyle}
        onRest={this.onRest}
        config={{ tension: 8000, friction: 100 }}
      >
        {({ scale, shadow }) => (
          <CircleButton
            primary
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            style={{
              transform: `scale(${scale})`,
              boxShadow: `rgba(0, 0, 0, 0.15) 0px ${shadow}px 4px`
            }}
          />
        )}
      </Spring>
    )
  }
}

export default ButtonWrapper
