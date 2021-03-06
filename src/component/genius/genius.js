import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
  state => state.chatUser,
  {getUserList}
)

class Genius extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}
export default Genius