import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import client from 'config/apollo'
import { ThemeProvider } from 'styled-components'
import Pages from 'pages/Pages'
import scrumbagTheme from 'styles/scrumbagTheme'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={scrumbagTheme}>
          <Pages />
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
