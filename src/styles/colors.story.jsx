import React from 'react'
import scrumbagTheme from './scrumbagTheme'
import styled from 'styled-components'

const colors = Object.keys(scrumbagTheme.colors).map((key => ({
  name: key,
  color: scrumbagTheme.colors[key]
})))

const ColorRow = styled.div`
  display: flex;
  padding: 2px;
`

const ColorLabel = styled.div`
  flex-grow: 1;
  padding: 8px;
`

const ColorSample = styled.div`
  width: 50px;
  background-color: ${props => props.color};
  border-radius: 5px;
`


const ColorsStory = () => (
  <div>
    {colors.map((color, index) => (
      <ColorRow key={index}>
        <ColorSample color={color.color} />
        <ColorLabel>{color.name}</ColorLabel>
      </ColorRow>
    ))}
  </div>
)

export default ColorsStory
