import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Video from '../components/Video'
import {getVideo} from '../actions'
import { Panel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Watch extends Component {

  constructor(props) {
    super(props)
    const { dispatch } = props
    dispatch(getVideo(props.history.location.search.split('=')[1]))
  }

  render() {
    let video = this.props.video
    let title, description, likes, unlikes, date, numberviews, username
    if (video !== null) {
      video = video.video[0]
      title = video.title
      description = video.description
      likes = video.likes
      unlikes = video.unlikes
      date = video.date
      numberviews = video.numberviews
      username = video.user.username
    }
    return (
    <div>
      <div className="row">
        { video !== null && <Video id={video.videoId} />}
      </div>
      <div className="row">
        <div  className="col-md-2"></div>
        <div  className="col-md-10">
          <h1> {title} </h1>
        </div>
      </div>
      <div className="row">
        <div  className="col-md-2"></div>
        <div  className="col-md-6">
          {username}
        </div>
        <div  className="col-md-2">
          <p className="views"><i> {numberviews} </i> views</p>
        </div>
        <div  className="col-md-2"></div>
      </div>
      <div className="row">
        <div  className="col-md-2"></div>
        <Panel className="col-md-8">
          <p> Uploaded: {date} </p>
          <p> {description} </p>
        </Panel>
        <div  className="col-md-2"></div>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  const { video } = state
  return {
    video
  }
}

export default connect(mapStateToProps)(withRouter(Watch))
