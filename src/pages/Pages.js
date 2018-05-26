import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from 'pages/Home'
import Boards from 'pages/Boards'
import BoardDetail from 'pages/BoardDetail'
import CardDetail from 'pages/CardDetail'
import FourOhFour from 'pages/FourOhFour'
import Sidebar from 'components/Sidebar/Sidebar'
import styled from 'styled-components'

const FullScreen = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Navbar = styled.div`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
`

const PageContent = styled.div`
  flex-grow: 1;
  margin-top: 50px;
  display: flex;
`

class Pages extends Component {
  render() {
    return (
      <Router>
        <FullScreen>
          <Navbar>
            <Sidebar>Hello</Sidebar>
          </Navbar>
          <PageContent>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/b" exact component={Boards} />
              <Route path="/(b|c)/:id" component={BoardDetail} />
              <Route component={FourOhFour} />
            </Switch>
          </PageContent>
        </FullScreen>
      </Router>
    )
  }
}

export default Pages
