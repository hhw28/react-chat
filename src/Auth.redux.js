import Axios from "axios";

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USER_DATA = 'USER_DATA'
const initState = {
  isAuth: false,
  user: 'ab',
  age: 21
}

export function auth(state = initState, action){
  switch(action.type){
    case LOGIN:
      return {...state, isAuth: true}
    case LOGOUT:
      return {...state, isAuth: false}
    case USER_DATA:
      return {
        ...state,
        user: action.payload.user,
        age: action.payload.age,
      }
    default:
      return state
  }
}
export function login(){
  return {type: LOGIN}
}
export function logout(){
  return {type: LOGOUT}
}
export function getUserData(){
  // dispatch 通知状态修改
  return dispatch => {
    Axios.get('/data')
      .then(res => {
        if(res.status === 200){
          dispatch(userData(res.data))
        }
      })
  }
}
export function userData(data){
  return {type: USER_DATA, payload: data[0]}
}