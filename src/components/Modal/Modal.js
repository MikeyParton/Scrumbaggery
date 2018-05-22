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
          {props.withClose && (
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
    this.props.onClose()
  }

  state = {
    open: this.props.open,
    close: this.close
  }

  render() {
    const { open, children, withOverlay } = this.props
    return (
      <Spring to={{
        opacity: open ? 1 : 0,
        y: open ? 0 : 20,
        scale: open ? 1 : 0.95
      }}>
        {({ opacity, y, scale }) => (
          <ModalContext.Provider value={this.state}>
            <ModalOuterContainer
              style={{
                opacity,
                zIndex: open ? 1 : -1
              }}
            >
              {withOverlay && <ModalOverlay />}
              <ModalInnerContainer style={{
                transform: `scale(${scale}) translateY(${y}px)`,
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
