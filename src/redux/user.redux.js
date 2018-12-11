import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
  msg: '',
  user: '',
  type: '',
  redirectTo: ''
}
export function user(state = initState, action){
  switch(action.type){
    case AUTH_SUCCESS:
      return {
        ...state,
        msg:'',
        ...action.payload,
        redirectTo: getRedirectPath(action.payload)
      }
    case LOAD_DATA:
      return {...state, ...action.payload}
    case LOGOUT:
      return {...initState}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}

function authSuccess(obj){
  // 过滤密码，在前端不显示
  const {pwd, ...data} = obj
  return {type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg){
  return {type:ERROR_MSG, msg}
}
export function loadData(userinfo){
  return {type:LOAD_DATA, payload: userinfo}
}
export function logoutSumit(){
  return {type:LOGOUT}
}

export function update(data){
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if(res.status === 200 && res.data.code === 0){
          console.log(res.data.data)
          dispatch(authSuccess(res.data.data))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
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
          dispatch(authSuccess(res.data.data))
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
          dispatch(authSuccess({user, pwd, type}))
        }else{
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}