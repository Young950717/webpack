import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
// import { Router, Route, browserHistory } from 'react-router'
import List from './list'
import Home from './home'
class App extends Component {
  render () {
    return <BrowserRouter>
      <div>
        <Route path='/' exact Component={Home} />
        <Route path='/list' Component={List} />
      </div>
    </BrowserRouter>
  }
}
ReactDom.render(<App />, document.getElementById('app'))