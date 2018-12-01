import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from './Auth.redux'

@connect(
  state => state.auth,
  {login}
)
class Auth extends React.Component{
  render(){
    return (
      <div>
        {this.props.isAuth ? <Redirect to='dashboard' /> : null}
        <p>没有权限，需要登录</p>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
export default Auth