import React, { Component } from 'react'
import load from './load.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='container text-center'>
        <img src={load} height="90vh" alt='loading-gif'/>
      </div>
    )
  }
}
