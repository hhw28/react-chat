import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter

class NavLinkBar extends React.Component{
  //属性检测，使用NavLinkBar组件必须传入data数据，并且必须为array类型
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(item => !item.hide)
    const pathname = this.props.location.pathname
    return (
      <TabBar>
        {navList.map(item => (
          <TabBar.Item
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