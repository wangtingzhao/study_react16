import React from 'react'

import Muitl from 'uitl/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new Muitl();
const _user = new User();

class TopNav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: _mm.getStorage('userInfo').username
    }
  }
  
  onLogout() {// 退出登录
    _user.logout().then(res => {
      _mm.removeStorage('userInof');
      window.location.href = '/login';
    }, errMsg => {
      _mm.errorTips(errMsg)
    });
  }
  render() {
    return (
      <nav className="navbar navbar-default top-navbar" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html"><b>In</b>sight</a>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw"></i>
              {
                this.state.username ? <span>欢迎,{this.state.username}</span> : <span>欢迎您</span>
              }
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li onClick={() => { this.onLogout() }}>
                <a href="javascript:;">
                  <i className="fa fa-sign-out fa-fw"></i> Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }
}

export default TopNav;