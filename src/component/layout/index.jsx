import React from 'react'

// import TopNav from 'component/top-nav/index.jsx';
// import SideNav from 'component/side-nav/index.jsx';

import './theem.css'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class Layouts extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onCollapse = this.onCollapse.bind(this)
  }

  onCollapse(collapsed) {
    console.log(collapsed, this);
    this.setState({ 
      collapsed: collapsed
    });
  }
  render() {
    return (
      <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="4">Tom</Menu.Item>
              <Menu.Item key="5">Bill</Menu.Item>
              <Menu.Item key="6">Alex</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
    )
  }
}

export default Layouts;