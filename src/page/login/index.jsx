import React from 'react';

import './index.scss'
import Muitl from 'uitl/mm.jsx'
import User from 'service/user-service.jsx'

const _mm = new Muitl();
const _user = new User();
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
       username: '',
       password: '',
       redirect: _mm.getUrlParam('redirect') || ''
    }
  }
  onInputChange(e) {
    let InputVal = e.target.value,
        InputName = e.target.name;
    this.setState({
      [InputName] : InputVal
    })
  }
  onSubmit() {
    let LoginInfo = {
      username: this.state.username,
      password: this.state.password
    },
    checkResult = _user.checkLoginInfo(LoginInfo)
    if (checkResult.status) {
      _user.login(LoginInfo).then((res) => {
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    }
    else {
      _mm.errorTips(checkResult.msg);
    }
    
  }
  render() {
    return (
      <div className='row'>
        <div className='col-md-4 col-md-offset-4'>
          <div className="panel panel-default login-panel">
            <div className='panel-heading'>登录</div>
            <div className="panel-body">
            <div>
                <div className="form-group">
                  {/* <label htmlFor="exampleInputEmail1">用户名</label> */}
                  <input type="test" name='username' className="form-control" placeholder="请输入用户名" onChange={e => this.onInputChange(e)} />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="exampleInputPassword1">密码</label> */}
                  <input type="password" name='password' className="form-control" placeholder="请输入密码" onChange={e => this.onInputChange(e)} />
                </div>
                <button className="btn btn-lg btn-block btn-primary" onClick={e => this.onSubmit(e)}>登录</button>
              </div>
            </div>
          </div>  
        </div>
      </div>
    )
  }
}
export default Login