import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from './Button'
import styled from 'styled-components'
import {
  boolean,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs';

const ButtonStory = () => (
  storiesOf('Buttons', module)
    .addDecorator(withKnobs)
    .add('Circle', () => {
      return (
        <Button
          dark={boolean('dark', true)}
          circle={boolean('cirle', false)}
          block={boolean('block', false)}
          fill={select('fill', ['primary', 'secondary', ''], 'primary')}
        >
          B
        </Button>
      )
    })

)

export default ButtonStory
