import "@babel/polyfill"
import React, { Component } from 'react'
import ReactDom from 'react-dom'
class App extends Component {
  render () {
    return <div>hello world</div>
  }
}
ReactDom.render(<App />, document.querySelector('#app'), () => {
  console.log('123')
})
// console.log(document.querySelector('#app'))