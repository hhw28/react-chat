import React from "react"
import ReactDOM from "react-dom"
import {createStore, applyMiddleware, compose} from 'redux'
// redux 默认只处理同步，异步任务需要安装插件 react-thunk
// 然后使用applyMiddleware开启chunk中间件
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import reducers from './reducers'

import App from './app'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
