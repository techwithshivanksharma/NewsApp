import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'

import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default class App extends Component {

  apiKey= process.env.REACT_APP_NEWS_KEY

  state={
    progress:0
  }

  setProgress =(progress)=>{
    this.setState({progress:progress})
  }


  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          /> 
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} ReactApiKey={this.apiKey}  key='general' pageSize="20" country="in" category="general" />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} ReactApiKey={this.apiKey}  key='business' pageSize="20" country="in" category="business" />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress}  ReactApiKey={this.apiKey} key='entertainment' pageSize="20" country="in" category="entertainment" />}></Route>
            <Route exact path='/general' element={<News setProgress={this.setProgress} ReactApiKey={this.apiKey}  key='general' pageSize="20" country="in" category="general" />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} ReactApiKey={this.apiKey}  key='health' pageSize="20" country="in" category="health" />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} ReactApiKey={this.apiKey}  key='sports' pageSize="20" country="in" category="sports" />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} ReactApiKey={this.apiKey}  key='technology' pageSize="20" country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

