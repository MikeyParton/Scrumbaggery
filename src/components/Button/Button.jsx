import React from 'react'
import ClickableStyles from './ClickableStyles'
import { ButtonBase, ButtonInnerContainer } from './ButtonStyled'

export const clickablePresets = {
  small: {
    upStyle: { scale: 1, shadow: 2 },
    downStyle: { scale: 0.95, shadow: 0 },
    hoverStyle: { scale: 1.03, shadow: 4 }
  },
  medium: {
    upStyle: { scale: 1, shadow: 2 },
    downStyle: { scale: 0.99, shadow: 0 },
    hoverStyle: { scale: 1.01, shadow: 4 }
  }
}

export const buttonStyle = ({ scale, shadow }) => ({
  transform: `scale(${scale})`,
  boxShadow: `rgba(0, 0, 0, 0.15) 0px ${shadow}px 4px`
})

const Button = (props) => {
  const { clickablePreset, children, ...rest } = props
  return(
    <ClickableStyles {...clickablePresets[clickablePreset]}>
      {({ style, getClickableProps }) => (
        <ButtonBase {...getClickableProps(rest)} style={buttonStyle(style)}>
          <ButtonInnerContainer>
            {children}
          </ButtonInnerContainer>
        </ButtonBase>
      )}
    </ClickableStyles>
  )
}

Button.defaultProps = {
  clickablePreset: 'small'
}

export default Button
