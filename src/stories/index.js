import React from 'react'
import { addDecorator, storiesOf } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { select } from '@storybook/addon-knobs'

import scrumbagTheme from '../styles/scrumbagTheme'
import globalStyles from '../styles/globalStyles'
import Tabs from '../components/Tabs/Tabs.story'
import Sidebar from '../components/Sidebar/Sidebar.story'

const themeProviderDecorator = story => {
  const themes = {scrumbag: scrumbagTheme }
  const themeName = select('Theme', Object.keys(themes), 'scrumbag')

  return <ThemeProvider theme={themes[themeName]}>
    {story()}
  </ThemeProvider>
}

addDecorator(themeProviderDecorator)

globalStyles()

Sidebar()
Tabs()
