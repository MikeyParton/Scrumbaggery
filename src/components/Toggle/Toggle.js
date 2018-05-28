import React from 'react'

class Toggle extends React.Component {
  toggle = () => {
    this.setState({ on: !this.state.on })
  }

  state = {
    on: false,
    toggle: this.toggle
  }

  render() {
    return this.props.children(this.state)
  }
}

export default Toggle
