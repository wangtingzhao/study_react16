import React from 'react'

class TopNav extends React.Component{
  constructor(props) {
    super(props)
  }
  
  onLogout() {// 退出登录

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
              <span>欢迎,adminXXXXX</span>
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