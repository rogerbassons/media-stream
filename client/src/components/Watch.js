import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Video from '../components/Video'
import {getVideo} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Watch extends Component {

  constructor(props) {
    super(props)
    const { dispatch } = props
    dispatch(getVideo(props.history.location.search.split('=')[1]))
  }

  render() {
    let video = this.props.video
    let title, description, likes, unlikes, date, numberviews
    if (video !== null) {
      video = video.video[0]
      title = video.title
      description = video.description
      likes = video.likes
      unlikes = video.unlikes
      date = video.date
      numberviews = video.numberviews
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
          <div className="row">
            <div  className="col-md-8"></div>
            <div  className="col-md-4">
              <p><i> {numberviews} </i> views</p>
            </div>
          </div>
          <p> {date} </p>
          <p> {description} </p>
        </div>
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
