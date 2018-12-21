import React from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom'

import ProductList from 'page/product/index/index.jsx'
import ProductSave from 'page/product/index/save.jsx'
import ProductDetail from 'page/product/index/detail.jsx'

class ProductRouter extends React.Component{
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Switch>
        <Route path='/product/index' component={ProductList}></Route>
        <Route path='/product/save/:pid?' component={ProductSave}></Route>
        <Route path='/product/detail/:pid' component={ProductDetail}></Route>
        <Redirect exact from='/product' to='/product/index'></Redirect>
      </Switch>
    );
  }
}

export default ProductRouter;