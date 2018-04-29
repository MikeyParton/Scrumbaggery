import React from 'react'
import ClickableStyles from './ClickableStyles'
import { CircleButtonBase } from './CircleButtonStyled'

const CircleButton = (props) => {
  return(
    <ClickableStyles
      upStyle={{ scale: 1, shadow: 2 }}
      downStyle={{ scale: 0.95, shadow: 0 }}
      hoverStyle={{ scale: 1.05, shadow: 4 }}
    >
      {({ style: { scale, shadow }, getClickableProps }) => (
        <CircleButtonBase
          {...getClickableProps(props)}
          style={{
            transform: `scale(${scale})`,
            boxShadow: `rgba(0, 0, 0, 0.15) 0px ${shadow}px 4px`
          }}
        />
      )}
    </ClickableStyles>
  )
}

export default CircleButton
