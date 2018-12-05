import React from "react"
import ReactDOM from "react-dom"
import {createStore, applyMiddleware, compose} from 'redux'
// redux 默认只处理同步，异步任务需要安装插件 react-thunk
// 然后使用applyMiddleware开启chunk中间件
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import reducers from './reducers'
import Authroute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f=>f
))

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        {/* <Authroute></Authroute> */}
        {/* <Switch>将遍历children元素（路由），然后只匹配第一个符合的pathname，若无符合的，则匹配首个无pathname项*/}
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
