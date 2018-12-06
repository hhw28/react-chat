import React from 'react'
import {Card, WingBlank} from 'antd-mobile'

class UserCard extends React.Component{
  render(){
    return (
      <WingBlank>
        {this.props.userList.map(item => (
          item.avatar ? <Card key={item._id}>
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