import React from "react"
import {createStore, applyMiddleware, compose} from 'redux'
// redux 默认只处理同步，异步任务需要安装插件 react-thunk
// 然后使用applyMiddleware开启chunk中间件
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import ReactDOM from "react-dom"
import reducers from './reducers'
import Dashboard from './Dashboard'
import Auth from './Auth'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      {/* Switch 只渲染命中的第一个 Route */}
      <Switch>
        <Route path='/login' exact component={Auth}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Redirect to='/dashboard'></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)








