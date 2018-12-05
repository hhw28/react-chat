import axios from 'axios'
import {getRedirectPath} from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState = {
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}
export function user(state = initState, action){
  switch(action.type){
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuth:true,
        msg:'',
        ...action.payload,
        redirectTo: getRedirectPath(action.payload)
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth:true,
        msg:'',
        ...action.payload,
        redirectTo: getRedirectPath(action.payload)
      }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}

function registerSuccess(data){
  return {type:REGISTER_SUCCESS, payload:data}
}
function loginSuccess(data){
  return {type:LOGIN_SUCCESS, payload:data}
}
function errorMsg(msg){
  return {type:ERROR_MSG, msg}
}
export function loadData(userinfo){
  return {type:LOAD_DATA, payload: userinfo}
}

export function login({user, pwd}){
  if(!user && !pwd){
    return errorMsg('请输入用户名和密码')
  }
  if(!user){
    return errorMsg('请输入用户名')
  }
  if(!pwd){
    return errorMsg('请输入密码')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          // 登录页面 type 需从服务端返回数据获取
          dispatch(loginSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
export function register({user, pwd, repeatPwd, type}){
  if(!user && !pwd){
    return errorMsg('请输入用户名和密码')
  }
  if(!user){
    return errorMsg('请输入用户名')
  }
  if(!pwd){
    return errorMsg('请输入密码')
  }
  if(pwd !== repeatPwd){
    return errorMsg('两次输入密码不相同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          console.log({user, pwd, type})
          dispatch(registerSuccess({user, pwd, type}))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}