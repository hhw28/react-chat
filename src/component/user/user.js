import React from 'react'
import {connect} from 'react-redux'
import {logoutSumit} from '../../redux/user.redux'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

@connect(
  state => state.user,
  {logoutSumit}
)

class User extends React.Component{
  constructor(props){
    super(props)
    this.logOut = this.logOut.bind(this)
  }
  logOut(){
    alert('退出登录', '确定退出吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSumit()
        this.props.history.push('/login')
      }}
    ])
  }
  render (){
    return this.props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 60}} alt=''/>}
          title={this.props.user}
        />
        <WhiteSpace></WhiteSpace>
        <List>
          <Item multipleLine>
            {this.props.desc.split('\n').map(text => <Brief key={text}>{text}</Brief>)}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logOut}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}></Redirect>
  }
}
export default User