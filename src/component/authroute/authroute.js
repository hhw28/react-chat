import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
@withRouter

class AuthRoute extends React.Component{
  componentDidMount(){
    // 若是在登录、注册页面，则无需获取用户信息
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname) > -1){
      return null
    }
    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        if(res.status === 200){
          if(res.data.code === 0){
            // 有登录信息
          }else{
            // 没有登录则引导到登录页面
            this.props.history.push('/login')
          }
        }
      }
    )
    // 判断用户是否登录
    // 判断用户 type 身份（牛人 or boss）
  }
  render(){
    return (
      <p>AuthRoute</p>
    )
  }
}
export default AuthRoute