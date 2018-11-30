import {createStore, applyMiddleware, compose} from 'redux'
// redux 默认只处理同步，异步任务需要安装插件 react-thunk
// 然后使用applyMiddleware开启chunk中间件
import thunk from 'redux-thunk'
import React from "react"
// import {useState} from 'react'
import {Provider} from 'react-redux'
import ReactDOM from "react-dom"
import App from './App'
import counter from './index.redux'



// const TestHook = () => {
//   const [count, setCount] = useState(9)
//   return (
//     <div>
//         {count}
//         <button onClick={()=>{setCount(count + 1)}}>+</button>
//         <button onClick={()=>{setCount(count - 1)}}>-</button>
//     </div>
//   )
// }

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

function render(){
  ReactDOM.render(
    (<Provider store={store}>
      <App />
    </Provider>),
    // <TestHook></TestHook>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)







