import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components'
import Pages from 'pages/Pages'
import scrumbagTheme from 'styles/scrumbagTheme'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={scrumbagTheme}>
        <Pages />
      </ThemeProvider>
    )
  }
}

export default App
