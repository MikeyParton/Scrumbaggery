import React from 'react'
import styled from 'styled-components'

const FontSample = styled.div`
  margin-bottom: 10px;
  font-family: ${props => props.font || 'lato'};
  font-weight: ${props => props.weight || 400};
`

const FontsStory = () => (
  <div>
    <FontSample weight={100}>This is the Font a little lighter</FontSample>
    <FontSample>This is the Font</FontSample>
    <FontSample weight={700}>This is the Font a little heavier</FontSample>
  </div>
)

export default FontsStory
