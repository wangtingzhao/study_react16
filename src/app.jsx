import React from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'

import Home from 'page/home/index.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Redirect from='*' to='/'/>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

ReactDom.render(
  <App/>, 
  document.getElementById('root')
)