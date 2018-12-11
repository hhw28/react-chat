import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, getMsgList, receiveMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item

@connect(
  state => state,
  {sendMsg, getMsgList, receiveMsg, readMsg}
)

class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      showEmoji: false
    }
  }
  componentDidMount(){
    // 若进入或刷新 chat页面没有获取到消息长度，则发起消息请求
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.receiveMsg()
    }
  }
  componentWillUnmount(){
    const to = this.props.match.params.user
    this.props.readMsg(to)
    this.props.getMsgList()
  }
  // 解决emoji表情使用的 Grid标签轮播状态首屏只有一行的情况
  fixCarousel(){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
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
    // emojipedia
    const emoji = '🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 😃 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 🤷 🎄 🌟 ❄️ 🎁 🎅 🦌 🤨 🧐 🤩 🧑 🤮 🤲 '
                    .split(' ').filter(v => v).map(v => ({text: v}))
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
        <QueueAnim delay={50} type='left' className='main'>
          {/* 若是聊天对象发送的消息，则显示在左边，自己的在右边 */}
          {chatMsg.map(item => {
            const avatarNum = users[item.from].avatar === undefined ? 0 : users[item.from].avatar
            const avatar = require(`../img/${avatarNum}.png`)
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
        </QueueAnim>

        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={value => {
                this.setState({text: value})
              }}
              extra={
                <div>
                  <span style={{marginRight:10}}
                        onClick={() => {
                          this.setState({showEmoji: !this.state.showEmoji})
                          this.fixCarousel()
                        }}
                        role="img" aria-label="smile"
                  >😃</span>
                  <span onClick={() => {this.handleSubmit()}}>发送</span>
                </div>
              }
            ></InputItem>
          </List>
          {this.state.showEmoji ? <Grid
            data={emoji} columnNum={9} carouselMaxRow={4} isCarousel={true}
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}
          /> : null}
        </div>
      </div>
    )
  }
}
export default Chat