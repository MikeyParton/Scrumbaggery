import React from 'react'
import { Spring } from 'react-spring'

class ClickableStyles extends React.Component {
  state = {
    clicked: false,
    mouseDown: false,
    hover: false
  }

  onMouseEnter = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({
      hover: false,
      mouseDown: false
    })
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

  getClickableStyleProps = ({
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    ...props
  } = {}) => ({
    onMouseDown: (...args) => {
      onMouseDown && onMouseDown()
      this.onMouseDown()
    },
    onMouseUp: (...args) => {
      onMouseUp && onMouseUp()
      this.onMouseUp()
    },
    onMouseEnter: (...args) => {
      onMouseEnter && onMouseEnter()
      this.onMouseEnter()
    },
    onMouseLeave: (...args) => {
      onMouseLeave && onMouseLeave()
      this.onMouseLeave()
    },
    ...props
  })

  render() {
    const { clicked, mouseDown, hover } = this.state

    const {
      upStyle,
      downStyle,
      hoverStyle
    } = this.props

    const toStyle = clicked || mouseDown
      ? downStyle
      : hover ? hoverStyle : upStyle

    return(
      <Spring
        to={toStyle}
        onRest={this.onRest}
        config={{ tension: 8000, friction: 100 }}
      >
        {(style) => (
          this.props.children({
            style,
            getClickableProps: this.getClickableStyleProps
          })
        )}
      </Spring>
    )
  }
}

ClickableStyles.defaultProps = {}

export default ClickableStyles
