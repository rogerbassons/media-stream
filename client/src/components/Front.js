import React, { Component } from 'react'
import { connect } from 'react-redux'
import Videos from '../components/Videos'
import Streams from '../components/Streams'
import {fetchVideos, fetchStreams} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Front extends Component {

  constructor(props) {
    super(props)
    const { dispatch } = this.props
    dispatch(fetchVideos())
    dispatch(fetchStreams())
  }

 render() {
   const { videos, streams } = this.props
   return (
     <div>
     <div className="row">
       {videos.length !== 0 && <Videos videos={videos} />}
       {videos.length === 0 && <h2>No videos</h2>}
    </div>
    <div className="row">
      {streams.length !== 0 && <Streams streams={streams} />}
      {streams.length === 0 && <h2>No live streams found</h2>}
    </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  const { videos, streams } = state
  return {
    videos, streams
  }
}

export default connect(mapStateToProps)(Front)
