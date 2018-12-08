import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMsgList, receiveMsg} from '../../redux/chat.redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import QueueAnim from 'rc-queue-anim'

@connect(
  state => state,
  {getMsgList, receiveMsg}
)

class Dashboard extends React.Component{
  componentDidMount(){
    // 若进入或刷新 chat页面没有获取到消息长度，则发起消息请求
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  render(){
    const pathName = this.props.location.pathname
    const user = this.props.user
    const navList = [{
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'boss列表',
        component: Genius,
        hide: user.type === 'boss',
      }, {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius',
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User,
      }
    ]
    const page = navList.find(item => item.path === pathName)
    return (
      <div>
        <NavBar className='fixed-header' mode='dard'>{navList.find(item => item.path === pathName).title}</NavBar>
        <div style={{marginTop: 45}}>
          <QueueAnim type='scaleX' duration={500}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard