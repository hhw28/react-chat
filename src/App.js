import React, { Component } from 'react'
import './App.css'
import {Button, List} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

class App extends Component {
  render() {
    return (
      <div>
        <h1>hello world</h1>
        <Bpp bb="good"></Bpp>
        <Cpp cc="night"></Cpp>
      </div>
    )
  }
}

function Cpp(props){
  return <h1>good, {props.cc}</h1>
}

class Bpp extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: ['aa', 'bb', 'cc']
    }
    this.addItem = this.addItem.bind(this)
  }
  addItem(){
    console.log(111)
    this.setState({
      list: [...this.state.list, 'abc '+Math.random()]
    })
  }
  render() {
    return (
      <div>
        <h1>2018, {this.props.bb}</h1>
        <Button type="primary" onClick={this.addItem}>add</Button>
        <List renderHeader = {() => '列表'}>
          {this.state.list.map(item => {
            return (
              <List.Item key={item}>{item}</List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default App
