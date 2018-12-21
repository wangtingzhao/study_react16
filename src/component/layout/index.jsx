import React from 'react'

import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

import './theem.css'
import './index.scss'


class Layout extends React.Component{
  render() {
    return (
      <div id='wrapper'>
        <TopNav/>
        <SideNav/>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;