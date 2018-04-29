import React from 'react'
import { storiesOf } from '@storybook/react'
import Fonts from './Fonts.story'
import Colors from './colors.story'

const StylesStory = () => (
  storiesOf('Styles', module)
    .add('Fonts', Fonts)
    .add('Colors', Colors)
)

export default StylesStory
