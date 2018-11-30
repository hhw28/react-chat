import React from 'react'
import {connect} from 'react-redux'
import {add, remove, addAsync} from './index.redux'

const mapStatetoProps = (state) => {
  return {num: state}
}
const actionCreators = {add, remove, addAsync}
App = connect(mapStatetoProps, actionCreators)(App)


// @connect(
//   state => ({num: state}),
//   {add, remove, addAsync}
// )


class App extends React.Component{
  render(){
    return (
      <div>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.remove}>-</button>
        <button onClick={this.props.addAsync}>+ 1s</button>
        <p>现在数字是{this.props.num}</p>
      </div>
    )
  }
}


export default App