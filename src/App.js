import React from 'react'

class App extends React.Component{
  render(){
    const store = this.props.store
    const num = store.getState()
    const add = this.props.add
    const remove = this.props.remove
    const addAsync = this.props.addAsync
    return (
      <div>
        <button onClick={()=>{store.dispatch(add())}}>+</button>
        <button onClick={()=>{store.dispatch(remove())}}>-</button>
        <button onClick={()=>{store.dispatch(addAsync())}}>+ 1s</button>
        <p>现在数字是{num}</p>
      </div>
    )
  }
}

export default App