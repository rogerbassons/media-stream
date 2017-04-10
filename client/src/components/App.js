import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'
import Video from '../components/Video'
import Front from '../components/Front'
import Search from '../components/Search'
import Bar from '../components/Bar'
import 'bootstrap/dist/css/bootstrap.css'


class App extends Component {

  render() {
      const Watch = ({match, history}) => (
        <div>
          <Bar />
          <Video id={match.params.id} />
        </div>
      )

    return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Front}/>
          <Route path="/videos" component={Search}/>
          <Route path="/watch/:id" component={Watch}/>
        </div>
      </Router>
    </div>
    )
  }
}

export default App
