import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { select } from '@storybook/addon-knobs'

import scrumbagTheme from '../styles/scrumbagTheme'
import globalStyles from '../styles/globalStyles'

import CircleButton from '../components/CircleButton/CircleButton.story'
import List from '../components/List/List.story'
import Sidebar from '../components/Sidebar/Sidebar.story'
import Tabs from '../components/Tabs/Tabs.story'

const themeProviderDecorator = story => {
  const themes = {scrumbag: scrumbagTheme }
  const themeName = select('Theme', Object.keys(themes), 'scrumbag')

  return <ThemeProvider theme={themes[themeName]}>
    {story()}
  </ThemeProvider>
}

addDecorator(themeProviderDecorator)

globalStyles()

CircleButton()
Sidebar()
Tabs()
List()
