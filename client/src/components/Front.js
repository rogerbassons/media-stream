import React, { Component } from 'react'
import { connect } from 'react-redux'
import Videos from '../components/Videos'
import {fetchVideos} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Front extends Component {

  constructor(props) {
    super(props)
    const { dispatch } = this.props
    dispatch(fetchVideos())
  }

 render() {
   const { videos } = this.props
   const isEmpty = videos.length === 0
   return (
     <div>
       {!isEmpty && <Videos videos={videos} />}
    </div>
    )
  }
}

const mapStateToProps = state => {
  const { videos } = state
  return {
    videos
  }
}

export default connect(mapStateToProps)(Front)
