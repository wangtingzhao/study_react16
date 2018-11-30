import React from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom'

import 'antd/dist/antd.css'
import Layouts from 'component/layout/index.jsx'

import Home from 'page/home/index.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Router>
        <Layouts>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Redirect from='*' to='/'/>
          </Switch>
        </Layouts>
      </Router>
    );
  }
}

ReactDom.render(
  <App/>, 
  document.getElementById('root')
)