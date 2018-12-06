import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

@connect(
  state => state.user
)

class User extends React.Component{
  render (){
    return this.props ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 60}}/>}
          title={this.props.title}
          message={this.props.company}
        />
        <WhiteSpace></WhiteSpace>
        <List>
          <Item multipleLine>
            {this.props.desc.split('\n').map(text => <Brief key={text}>{text}</Brief>)}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item>退出登录</Item>
        </List>
      </div>
    ) : null
  }
}
export default User