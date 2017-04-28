import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'
import Watch from '../components/Watch'
import Front from '../components/Front'
import Search from '../components/Search'
import Login from '../components/Login'
import Upload from '../components/Upload'
import Bar from '../components/Bar'
import 'bootstrap/dist/css/bootstrap.css'


class App extends Component {

  render() {

    return (
    <div className="App">
      <Router>
        <div className="container-fluid">
          <Bar />
          <div className="content">
            <Route exact path="/" component={Front}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/upload" component={Upload}/>
            <Route path="/videos" component={Search}/>
            <Route path="/watch" component={Watch}/>
          </div>
        </div>
      </Router>
    </div>
    )
  }
}

export default App
