import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import './App.css'

class App extends Component {
  render () {
    const m = this.props?.h
    return (
      <div className='render'>
        <h1>Hello, world! this is here</h1>
      </div>
    )
  }
}

export default hot(module)(App)
