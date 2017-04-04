import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../logo.svg'
import './App.css'
import Videos from '../components/Videos'
import {fetchVideos} from '../actions'

class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchVideos())
  }

  render() {
      const videos = this.props.videos
      const isEmpty = videos.length === 0

    return (
      <div className="App">
      <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>MediaStream</h1>
      </div>
      {!isEmpty &&
        <Videos videos={videos} />
      }
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
