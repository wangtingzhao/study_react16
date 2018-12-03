import React from 'react';
import { Link } from 'react-router-dom'
import Muitl from 'uitl/mm.jsx'
import User from 'service/user-service.jsx'

import Pagination from 'uitl/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx'

const _mm = new Muitl();
const _user = new User();


class UserList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1,
      fristLoading: true
    }
  }
  componentDidMount(){
    this.loadUserList();
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res, () => {
        this.setState({
          fristLoading: false
        })
      });
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
    let listError = (
      <tr>
        <th colSpan='5' className='text-center'>
          {this.state.fristLoading ? '正在加载数据中...' : '找不到相应的数据~~'}
        </th>
      </tr>
    );
    let tableBody = this.state.list.length > 0 ? listBody : listError;
    return (
      <div id="page-wrapper">
        <PageTitle title='用户列表'/>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>电话 </th>
                  <th>邮箱</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
            <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum => this.onPageNumChange(pageNum)}/>
          </div>
        </div>
      </div>
    );
  }
}
export default UserList