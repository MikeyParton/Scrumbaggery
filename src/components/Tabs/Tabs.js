import React from 'react'
import { Spring } from 'react-spring'
import { TabListContainer, TabContainer, TabActiveBar } from './tabsStyled'
import PropTypes from 'prop-types'

const TabsContext = React.createContext({
  activeIndex: null,
  setActiveIndex: () => {}
})

const doesntExist = (thing) => {
  return thing === undefined || thing === null
}

class Tabs extends React.Component {
  static defaultProps = {
    onChange: () => {}
  }

  static propTypes = {
    initialActiveIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    activeIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }

  static TabList = ({ children }) => (
    <TabsContext.Consumer>
      {({ vertical }) => (
        <TabListContainer vertical={vertical}>
          {children}
        </TabListContainer>
      )}
    </TabsContext.Consumer>
  )

  static Tab = ({ index, children }) => (
    <TabsContext.Consumer>
      {({ setTabRef, activeIndex, setActiveIndex, vertical }) => (
        <TabContainer
          innerRef={(node) => setTabRef(node, index)}
          vertical={vertical}
          onClick={() => setActiveIndex(index)}
          active={String(activeIndex) === String(index)}
          >
          {children}
        </TabContainer>
      )}
    </TabsContext.Consumer>
  )

  static ActiveBar = () => (
    <TabsContext.Consumer>
      {({ activeTabRef, vertical }) => {

        if (!activeTabRef) return null

        const thickness = 4

        const animatedStyles = vertical
          ? { top: activeTabRef.offsetTop }
          : { left: activeTabRef.offsetLeft }

        const regularStyles = vertical
          ? { width: thickness, right: 0, height: activeTabRef.offsetHeight }
          : { height: thickness, bottom: 0, width: activeTabRef.offsetWidth }

        return (
          <Spring to={animatedStyles}>
            {(animatedStyles) => (
              <TabActiveBar style={{
                ...regularStyles,
                ...animatedStyles
              }} />
            )}
          </Spring>
        )
      }}
    </TabsContext.Consumer>
  )

  componentDidMount() {
    const { activeIndex } = this.state
    this.setActiveTabRef(activeIndex)
  }

  setActiveTabRef = (activeIndex) => {
    if (doesntExist(activeIndex)) return
    const activeTabRef = this.getTabRef(activeIndex)
    this.setState({ activeTabRef })
  }

  setTabRef = (node, index) => {
    this.tabRefs[index] = node
  }

  getTabRef = (index) => {
    return this.tabRefs[index]
  }

  setActiveIndex = (activeIndex) => {
    this.setState({ activeIndex })
    this.props.onChange(activeIndex)
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeIndex } = this.state
    if (prevState.activeIndex !== activeIndex) {
      this.setActiveTabRef(activeIndex)
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { activeIndex, initialActiveIndex } = nextProps

    return {
      ...prevState,
      activeIndex: doesntExist(activeIndex)
        ? initialActiveIndex
        : activeIndex
    }
  }

  state = {
    setActiveIndex: this.setActiveIndex,
    setTabRef: this.setTabRef,
    vertical: this.props.vertical,
    onChange: this.props.onChange
  }

  tabRefs = {}

  render() {
    return (<TabsContext.Provider value={this.state}>
      {this.props.children}
    </TabsContext.Provider>)
  }
}

export default Tabs
