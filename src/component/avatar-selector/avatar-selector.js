import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  //属性检测，selectAvatar中必须传入，并且必须为func类型
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    const avatarList = [1,2,3,4,5,6,7,8,9,10].map(item => ({
      icon: require(`../img/${item}.png`),
      index: item,
    }))
    const gridHeader = this.state.icon
                        ? (<div>
                            <span>已选择头像</span>
                            <img style={{width: 13}} src={this.state.icon} alt=""/>
                          </div>)
                        : '请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid data={avatarList} columnNum={5}
                onClick={elm => {
                  this.setState(elm)
                  this.props.selectAvatar(elm.index)
                }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector