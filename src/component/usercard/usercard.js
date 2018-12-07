import React from 'react'
import {Card, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter

class UserCard extends React.Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(item){
    this.props.history.push(`/chat/${item._id}`)
  }
  render(){
    return (
      <WingBlank>
        {this.props.userList.map(item => (
          item.avatar ? <Card onClick={() => this.handleClick(item)} key={item._id}>
            <Card.Header
              title={item.title}
              thumb={require(`../img/${item.avatar}.png`)}
              extra={item.money}
            />
            <Card.Body>
              {item.desc.split('\n').map(text => (
                <div key={text}>{text}</div>
              ))}
            </Card.Body>
            {item.type === 'boss' ? <Card.Footer content={item.user} extra={item.company} /> : null}
          </Card> : null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard