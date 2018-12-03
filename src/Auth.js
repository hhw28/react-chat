import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login, getUserData} from './Auth.redux'

@connect(
  state => state.auth,
  {login, getUserData}
)
class Auth extends React.Component{
  componentDidMount(){
    this.props.getUserData()
  }
  render(){
    return (
      <div>
        <h2>我的名字是{this.props.user}，年龄是{this.props.age}</h2>
        {this.props.isAuth ? <Redirect to='dashboard' /> : null}
        <p>没有权限，需要登录</p>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
export default Auth