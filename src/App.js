import React from 'react'
import {connect} from 'react-redux'
import {add, remove, addAsync} from './index.redux'

// const mapStatetoProps = (state) => {
//   return {num: state}
// }
// const actionCreators = (add, remove, addAsync)=>{add, remove, addAsync}
// App = connect(mapStatetoProps, actionCreators)(App)

@connect(
  state => ({num: state.counter}),
  {add, remove, addAsync}
)

class App extends React.Component {
  render(){
    console.log(this.props)
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