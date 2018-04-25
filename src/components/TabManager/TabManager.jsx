import React from 'react'

class TabManager extends React.Component {
  state = {
    active: this.props.active || 0,
  }

  tabs = []

  getActive = () => {
    let { active } = this.props
    if (active === undefined) {
      let { active } = this.state
    }

    return active
  }

  registerTab = (index) => {
    this.tabs.push(index)
  }

  getTabProps = ({ index, ...props = {} }) => {
    if (this.tabs[index] === undefined) {
      this.registerTab(index)
    }
    return {
      active: this.isActive(index),
      onClick: () => this.select(index),
      ...props
    }
  }

  select = (index) => {
    this.setState({ active: index })
    this.props.onChange(index)
  }

  isActive = (index) => {
    return index === this.getActive()
  }

  render() {
    return (
      <div>
        {this.props.render({
          active: this.getActive(),
          getTabProps: this.getTabProps
        })}
      </div>
    )
  }
}

TabManager.defaultProps = {
  active: null,
  onChange: () => {}
}

export default TabManager
