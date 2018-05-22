import React from 'react'
import { Spring } from 'react-spring'
import Button from 'components/Button/Button'
import CloseIcon from 'react-icons/lib/md/close'
import {
  ModalInnerContainer,
  ModalOuterContainer,
  HeaderContainer,
  ContentContainer,
  ModalOverlay
} from './ModalStyled'

const ModalContext = React.createContext({
  open: null,
  close: () => {}
})

class Modal extends React.Component {
  static Header = (props) => (
    <ModalContext.Consumer>
      {({ close }) => (
        <HeaderContainer>
          {props.children}
          {!props.noCloseButton && (
            <Button
              dark
              circle
              fill="secondary"
              onClick={close}
            >
              <CloseIcon style={{ marginRight: 1, marginBottom: 1 }} />
            </Button>
          )}
        </HeaderContainer>
      )}
    </ModalContext.Consumer>
  )

  static Content = (props) => (
    <ContentContainer>
      {props.children}
    </ContentContainer>
  )

  close = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  state = {
    open: this.props.open,
    close: this.close,
    rested: false
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      ...prevState,
      open: nextProps.open,
      rested: nextProps.open == prevState.open
    }
  }

  onRest = () => {
    if (!this.state.rested) {
      this.setState({ rested: true })
    }
  }

  render() {
    const { rested } = this.state
    const { open, children, noOverlay } = this.props
    return (
      <Spring
        onRest={this.onRest}
        to={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.95
        }}
      >
        {({ opacity, y, scale }) => (
          <ModalContext.Provider value={this.state}>
            <ModalOuterContainer
              style={{
                opacity,
                zIndex: rested && !open ? -1 : 1
              }}
            >
              {!noOverlay && <ModalOverlay />}
              <ModalInnerContainer style={{
                transform: `scale(${scale})`,
              }}>
                {children}
              </ModalInnerContainer>
            </ModalOuterContainer>
          </ModalContext.Provider>
        )}
      </Spring>
    )
  }
}

export default Modal
