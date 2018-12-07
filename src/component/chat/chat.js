import React from 'react'
import {List, InputItem, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, getMsgList, receiveMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

const Item = List.Item

@connect(
  state => state,
  {sendMsg, getMsgList, receiveMsg}
)

class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount(){
    // 若进入或刷新 chat页面没有获取到消息长度，则发起消息请求
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  handleSubmit(){
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    // 消息发送之后，文本内容设置为空
    this.setState({text: ''})
  }
  render(){
    // 聊天对象
    const user = this.props.match.params.user
    const users = this.props.chat.users
    // 如果聊天对象不存在，则直接return，不再渲染页面
    if(!users[user]){
      return null
    }
    // 过滤出chatid相同的聊天信息
    const chatID = getChatId(user, this.props.user._id)
    const chatMsg = this.props.chat.chatmsg.filter(item => item.chatid === chatID)
    return (
      <div id='chat-page'>
        <NavBar mode='dark' icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()}>
          {users[user].name}
        </NavBar>
        {/* 若是聊天对象发送的消息，则显示在左边，自己的在右边 */}
        {chatMsg.map(item => {
          const avatar = require(`../img/${users[item.from].avatar}.png`)
          return item.from === user ? (
            <List key={item._id}>
              <Item thumb={avatar}>{item.content}</Item>
            </List>
          ) : (
            <List key={item._id}>
              <Item className='chat-me' extra={<img src={avatar} alt=''/>}>{item.content}</Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={value => {
                this.setState({text: value})
              }}
              extra={<span onClick={() => {this.handleSubmit()}}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}
export default Chat