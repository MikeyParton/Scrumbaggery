import React from 'react'
import ClickableStyles from './ClickableStyles'
import { ButtonBase } from './ButtonStyled'

const Button = (props) => {
  return(
    <ClickableStyles
      upStyle={{ scale: 1, shadow: 2 }}
      downStyle={{ scale: 0.97, shadow: 0 }}
      hoverStyle={{ scale: 1.03, shadow: 4 }}
    >
      {({ style: { scale, shadow }, getClickableProps }) => (
        <ButtonBase
          {...getClickableProps(props)}
          style={{
            transform: `scale(${scale})`,
            boxShadow: `rgba(0, 0, 0, 0.15) 0px ${shadow}px 4px`
          }}
          >
          {props.children}
        </ButtonBase>
      )}
    </ClickableStyles>
  )
}

export default Button
