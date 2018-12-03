
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
class SideNav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data:[
        {name: '首页', to: '/'},
        {name: '商品', to: '/product', className:'fa fa-list', children: [{ name: '商品管理', to: '/product' }, { name: '商品管理', to: 'product' }]},
        {name: '订单', to: '/order', className:'fa fa-check-square-o', children: [{ name: '订单', to: '/order' }]},
        {name: '用户', to: '/user', className:'fa fa-user-o', children: [{ name: '用户管理', to: '/user' }]}
      ]
    }
  }
  render() {
    return (
      <div className="navbar-default navbar-side" >
        <div className="sidebar-collapse">
          <ul className="nav" >
            {
              this.state.data.map((item) => {
                if (!item.hidden) {
                  if (!item.children) {
                    return (
                      <li key={item.to}>
                        <NavLink exact activeClassName='active-menu' to={item.to}>
                          <i className="fa fa-dashboard"></i>
                          <span>{item.name}</span>
                        </NavLink>
                      </li>
                    )
                  } else {
                    return (
                      <li className='active' key={item.to}>
                        <Link to={item.to}>
                          <i className={item.className}></i>
                          <span>{item.name}</span>
                          <span className="fa arrow"></span>
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                          {
                            item.children.map((items) => {
                              return (
                                <li key={items.to}><NavLink to={items.to} activeClassName='active-menu'>{items.name}</NavLink></li>
                              )
                            })
                          }
                        </ul>
                      </li>
                    )
                  }
                }
              })
            }
            
            {/* <li className='active'>
              <Link to="/product">
                <i className="fa fa-sitemap"></i>
                <span>商品</span>
                <span className="fa arrow"></span>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/product" activeClassName='active-menu'>商品管理</NavLink>
                </li>
                <li>
                  <NavLink to="/product-categroy" activeClassName='active-menu'>品类管理</NavLink>
                </li>
              </ul>
            </li>
            <li className='active'>
              <Link to="/order">
                <i className="fa fa-sitemap"></i>
                <span>订单</span>
                <span className="fa arrow"></span>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/order" activeClassName='active-menu'>订单管理</NavLink>
                </li>
              </ul>
            </li>
            <li className='active'>
              <Link to="/user">
                <i className="fa fa-sitemap"></i>
                <span>用户</span>
                <span className="fa arrow"></span>
              </Link>
              <ul className="nav nav-second-level collapse in">
                <li>
                  <NavLink to="/user" activeClassName='active-menu'>用户管理</NavLink>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </div>
    )
  }
}

export default SideNav;