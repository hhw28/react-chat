import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getMsgList} from '../../redux/chat.redux'

@withRouter
@connect(
  state => state.chat,
  {getMsgList}
)

class NavLinkBar extends React.Component{
  //属性检测，使用NavLinkBar组件必须传入data数据，并且必须为array类型
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  componentDidMount(){
    this.props.getMsgList()
  }
  render(){
    const navList = this.props.data.filter(item => !item.hide)
    const pathname = this.props.location.pathname
    return (
      <TabBar>
        {navList.map(item => (
          <TabBar.Item
            badge={item.path === '/msg' ? this.props.unread : ''}
            key={item.path} title={item.text}
            icon={{uri: require(`./img/${item.icon}.png`)}}
            selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
            selected={pathname === item.path}
            onPress={() => {
              this.props.history.push(item.path)
            }}
          />
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar