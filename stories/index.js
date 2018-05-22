import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { select } from '@storybook/addon-knobs'

import scrumbagTheme from '../src/styles/scrumbagTheme'
import globalStyles from '../src/styles/globalStyles'

import Styles from '../src/styles/styles.story'

import Button from '../src/components/Button/Button.story'
import List from '../src/components/List/List.story'
import Sidebar from '../src/components/Sidebar/Sidebar.story'
import Tabs from '../src/components/Tabs/Tabs.story'
import Modal from 'components/Modal/Modal.story'
import Input from 'components/Input/Input.story'

const themeProviderDecorator = story => {
  const themes = {scrumbag: scrumbagTheme }
  const themeName = select('Theme', Object.keys(themes), 'scrumbag')

  return <ThemeProvider theme={themes[themeName]}>
    {story()}
  </ThemeProvider>
}

addDecorator(themeProviderDecorator)

globalStyles()

Styles()
Button()
Sidebar()
Tabs()
List()
Modal()
Input()
