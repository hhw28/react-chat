import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

@connect(
  state => state,
)

class Msg extends React.Component{
  getLast(v){
    return v[v.length - 1]
  }
  render(){
    // 根据chatid，将聊天消息分组
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || []
      msgGroup[item.chatid].push(item)
    })
    // 对每组中最后一条消息进行排序，消息最新的聊天对话排在最上面
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    // 登录用户id
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    return (
      <div>
        {chatList.map(v => {
          const lastMsg = this.getLast(v)
          // 发送方为登录用户时，说明聊天对象是接收方
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          // 若目标用户不存在，则直接return
          if(!userinfo[targetId]){
            return null
          }
          const unreadNum = v.filter(v => v.read === false && v.to === userid).length
          return (
            <List key={v[0].chatid}>
              <Item thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                    extra={<Badge text={unreadNum}></Badge>}
                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {userinfo[targetId].name}
                <Brief>{lastMsg.content}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg