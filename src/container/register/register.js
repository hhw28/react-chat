import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import hoctest from '../../component/hoctest/hoctest'

@connect(
  state => state.user,
  {register}
)
@hoctest
class Register extends React.Component{
  constructor(props){
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  componentDidMount(){
    this.props.handleChange('type', 'genius')
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List>
          <InputItem onChange={val => this.props.handleChange('user', val)}>用户名</InputItem>
          <InputItem type='password' onChange={val => this.props.handleChange('pwd', val)}>密码</InputItem>
          <InputItem type='password' onChange={val => this.props.handleChange('repeatPwd', val)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type === 'genius'} onChange={()=> this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.props.state.type === 'boss'} onChange={()=> this.props.handleChange('type', 'boss')}>Boss</RadioItem>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}
export default Register