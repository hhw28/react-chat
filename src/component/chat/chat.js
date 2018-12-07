import React from 'react'
import {List, InputItem, NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, receiveMsg} from '../../redux/chat.redux'

const Item = List.Item

@connect(
  state => state,
  {getMsgList, sendMsg, receiveMsg}
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
    this.props.getMsgList()
    this.props.receiveMsg()
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
    const user = this.props.match.params.user
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {user}
        </NavBar>
        {this.props.chat.chatmsg.map(item => {
          return item.from === user ? (
            <List key={item._id}>
              <Item>{item.content}</Item>
            </List>
          ) : (
            <List key={item._id}>
              <Item className='chat-me' extra={'avatar'}>{item.content}</Item>
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