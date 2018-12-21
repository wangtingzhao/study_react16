import React from 'react';
import { Link } from 'react-router-dom'
import Muitl from 'uitl/mm.jsx'
import User from 'service/user-service.jsx'

import Pagination from 'uitl/pagination/index.jsx';
import TableList from 'uitl/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Muitl();
const _user = new User();


class UserList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1
    }
  }
  componentDidMount(){
    this.loadUserList();
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res);
    }, errMsg => {
      this.setState({
        list: []
      })
      _mm.errorTips(errMsg);
    })
  }
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList();
    })
  }
  render() {
    let listBody = this.state.list.map((user, index) => {
      return (
          <tr key={index}>
            <th>{user.id}</th>
            <th>{user.username}</th>
            <th>{user.phone}</th>
            <th>{user.email}</th>
            <th>{new Date(user.createTime).toLocaleString()}</th>
          </tr>
      );
    });
    return (
      <div id="page-wrapper">
        <PageTitle title='用户列表'/>
        <TableList tableHeads={['ID','用户名','电话','邮箱','注册时间']}>
        {listBody}
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum => this.onPageNumChange(pageNum)}/>
      </div>
    );
  }
}
export default UserList