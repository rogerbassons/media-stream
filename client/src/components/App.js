import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import logo from '../logo.svg'
import './App.css'
import Videos from '../components/Videos'
import Video from '../components/Video'
import {fetchVideos} from '../actions'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchVideos())
  }

  render() {
      const videos = this.props.videos
      const isEmpty = videos.length === 0
      const Home = () => (
        !isEmpty &&
        <Videos videos={videos} />

      )
      const Watch = ({match}) => (
        <Video id={match.params.id} />
      )

    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>MediaStream</h1>
      </div>
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/watch/:id" component={Watch}/>
        </div>
      </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { videos } = state
  return {
    videos
  }
}

export default connect(mapStateToProps)(App)
