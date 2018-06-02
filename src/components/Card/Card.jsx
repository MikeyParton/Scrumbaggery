import React from 'react'
import { CardOuterContainer } from './CardStyled'

const Card = (props) => {
  const { onClick, item, provided, snapshot } = props
  return (
    <CardOuterContainer
      className={snapshot.isDragging && "dragging" }
      innerRef={provided.innerRef}
      isDragging={snapshot.isDragging}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        boxShadow: `rgba(0, 0, 0, 0.15) ${snapshot.isDragging ? 4 : 0}px ${snapshot.isDragging ? 4 : 0}px 2px`
      }}
      onClick={onClick}
    >
      {item.name}
    </CardOuterContainer>
  )
}

export default Card
