import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import hoctest from '../../component/hoctest/hoctest'

@connect(
  state => state.user,
  {login}
)
// 高阶组件test
@hoctest

class Login extends React.Component{
  constructor(props){
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register(){
    this.props.history.push('./register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div id='login'>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo path={path}></Logo>
        <WingBlank>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
          <List>
            <InputItem onChange={val => this.props.handleChange('user', val)}>用户名</InputItem>
            <InputItem onChange={val => this.props.handleChange('pwd', val)} type='password'>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary" >注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login