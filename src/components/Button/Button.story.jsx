import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import styled from 'styled-components'
import {
  boolean,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs'

const ButtonStory = () => (
  storiesOf('Buttons', module)
    .addDecorator(withKnobs)
    .add('Normal', () => <Button fill="primary">Normal Button</Button>)
    .add('Circle', () => <Button circle fill="primary">B</Button>)
    .add('Block', () => <Button block fill="primary">B</Button>)
    .add('Transparent', () => <Button fill="transparent">B</Button>)
    .add('Group', () => {
      return (
        <ButtonGroup
          straightRightEdge={boolean('straightRightEdge', false)}
          straightLefEdge={boolean('straightLefEdge', false)}>
          <Button fill="primary">A</Button>
          <Button fill="primary">B</Button>
        </ButtonGroup>
      )
    })
)

export default ButtonStory
