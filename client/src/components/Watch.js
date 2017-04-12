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
    let videoplayer, title, description, likes, unlikes, date, numberviews, username = null
    if (video !== null) {
      const v = video.video[0]
      title = v.title
      description = v.description
      likes = v.likes
      unlikes = v.unlikes
      date = v.date
      numberviews = v.numberviews
      username = v.user.username
      videoplayer = (<Video id={v.videoId} />)
    }
    return (
    <div>

      <div className="row">
        {videoplayer}
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
        <div  className="col-md-2 rightalign">
          <i> {numberviews} </i> views
        </div>
        <div  className="col-md-2"></div>
      </div>

      <div className="row">
        <div  className="col-md-2"></div>
        <div  className="col-md-6"></div>
        <div  className="col-md-2 rightalign">
          <span className="rightmargin glyphicon glyphicon-thumbs-up">{likes}</span>
          <span className="glyphicon glyphicon-thumbs-down">{unlikes}</span>
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
