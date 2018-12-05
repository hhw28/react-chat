import React from 'react'
import {Card, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
  state => state,
  {getUserList}
)

class Boss extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return (
      <WingBlank>
        {this.props.chatUser.userList.map(item => (
          item.avatar ? <Card key={item._id}>
            <Card.Header
              title={item.user}
              thumb={require(`../img/${item.avatar}.png`)}
              extra={item.title}
            />
            <Card.Body>
              <div>{item.desc}</div>
            </Card.Body>
          </Card> : null
        ))}
      </WingBlank>
    )
  }
}
export default Boss