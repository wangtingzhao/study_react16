import React from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'

import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' render={props => (
            <Layout>
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route  path='/product' component={Home}></Route>
                <Route  path='/product-categroy' component={Home}></Route>
                <Route  path='/order' component={Home}></Route>
                <Route  path='/user' component={Home}></Route>
                {/* <Redirect from='*' to='/'/> */}
              </Switch>
            </Layout>
          )}></Route>
        </Switch>
      </Router>
    );
  }
}

ReactDom.render(
  <App/>, 
  document.getElementById('root')
)