import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 表示已读
const MSG_READ = 'MSG_READ'
const initState = {
  users: {},
  chatmsg: [],
  unread: 0
}

export function chat(state=initState, action){
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        // 未读消息数量 == 收到的消息数量，并且发送目标为当前登录用户
        unread: action.payload.msgs.filter(msg => !msg.read && msg.to === action.payload.userid).length
      }
    case MSG_RECV:
      // 当收到消息的用户，为当前登录的用户时，未读消息 +1
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + n
      }
    case MSG_READ:
      const {from, num} = action.payload
      return {
        ...state, unread: state.unread - num,
        chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read}))
      }
    default:
      return state
  }
}
function msgList(msgs, users, userid){
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}
function msgRecv(msg, userid){
  return {type: MSG_RECV, payload: {msg, userid}}
}
function msgRead({userid, from, num}){
  return {type: MSG_READ, payload: {userid, from, num}}
}

export function readMsg(from){
  return async (dispatch, getState) => {
    const res = await axios.post('/user/readmsg', {from})
    const userid = getState().user._id
    if(res.status === 200 && res.data.code === 0){
      dispatch(msgRead({userid, from, num: res.data.num}))
    }
  }
}
export function receiveMsg(){
  return (dispatch, getState) => {
    socket.on('receivemsg', (data) => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}
export function sendMsg({from, to, msg}){
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}
export function getMsgList(){
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}