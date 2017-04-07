import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css'
import Videos from '../components/Videos'
import Video from '../components/Video'
import Navbar from '../components/Navbar'
import {fetchVideos} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'


class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchVideos())
  }

  render() {
      const videos = this.props.videos
      const isEmpty = videos.length === 0
      const Home = () => (
        <div>
          <Navbar />
          {!isEmpty && <Videos videos={videos} />}
        </div>
      )
      const Watch = ({match}) => (
        <div>
          <Navbar />
          <Video id={match.params.id} />
        </div>
      )

    return (
    <div className="App">
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
