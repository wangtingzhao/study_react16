import React from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom'

import Layout from 'component/layout/index.jsx'

import Home from 'page/home/index.jsx'
import Login from 'page/login/index.jsx'
import ProductList from 'page/product/router.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    let LayoutRouter = (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route  path='/product' component={ProductList}></Route>
          <Route  path='/product-categroy' component={ProductList}></Route>
          <Route  path='/order' component={Home}></Route>
          <Route  path='/user/index' component={UserList}></Route>
          <Redirect from='/user' to='/user/index'/>
          <Route  component={ErrorPage}></Route>
          {/* <Redirect from='*' to='/'/> */}
        </Switch>
      </Layout>
    );
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/' render={props => LayoutRouter}></Route>
        </Switch>
      </Router>
    );
  }
}

ReactDom.render(
  <App/>, 
  document.getElementById('root')
)