import React from 'react'
import {Route, Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import App from './App'
import {logout} from './Auth.redux'



function Bpp(){
  return <h2>b</h2>
}
function Cpp(){
  return <h2>c</h2>
}

@connect(
  state => state.auth,
  {logout}
)
class Dashboard extends React.Component{
  render(){
    const match = this.props.match
    const redirectToLogin = <Redirect to='/login' />
    const app = (
      <div>
        {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
        <ul>
          <li><Link to={`${match.url}/`}>a</Link></li>
          <li><Link to={`${match.url}/b`}>b</Link></li>
          <li><Link to={`${match.url}/c`}>c</Link></li>
        </ul>
        <Route path={`${match.url}/`} exact component={App}></Route>
        <Route path={`${match.url}/b`} component={Bpp}></Route>
        <Route path={`${match.url}/c`} component={Cpp}></Route>
      </div>
    )
    return  this.props.isAuth ? app : redirectToLogin
  }
}
export default Dashboard