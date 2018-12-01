
const ADD = '+'
const REMOVE = '-'

function counter(state=0, action){
  switch(action.type){
    case ADD:
      return state + 1
    case REMOVE:
      return state - 1
    default:
      return 10
  }
}

function add(){
  return {type: ADD}
}
function remove(){
  return {type: REMOVE}
}
// 延迟添加
function addAsync(){
  // thunk 插件的作用，这里可以返回函数
  return dispatch => {
    setTimeout(() => {
      // 异步结束后，手动执行dispatch
      dispatch(add())
    }, 1000)
  }
}

export {counter, add, remove, addAsync}


