import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Video from '../components/Video'
import Comments from '../components/Comments'
import Reactions from '../components/Reactions'
import {getVideo} from '../actions'
import { Panel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Watch extends Component {

  constructor(props) {
    super(props)
    const { dispatch, token } = props
    const videoId = props.history.location.search.split('=')[1]
    dispatch(getVideo(videoId, token && token.token))

  }

  render() {
    const { video }= this.props
    let videoplayer, title, description, likes, unlikes, date, numberviews, username, comments, videoId, currentuserlike
    if (video !== null) {
      const v = video.video
      title = v.title
      description = v.description
      likes = v.likes
      unlikes = v.unlikes
      date = v.date
      numberviews = v.numberviews
      username = v.user.username
      comments = v.comments
      videoId = v.videoId
      currentuserlike = v.currentuserlike
      videoplayer = (<Video id={videoId} />)
    }

    return (
    <div>

      <div className="row">
        <div className="col-md-12 movieblack">
          <div className="row">
            <div  className="col-md-2"></div>
            <div  className="col-md-8">
              {videoplayer}
            </div>
            <div  className="col-md-2"></div>
          </div>
        </div>
      </div>


      <div className="row">
        <div  className="col-md-2"></div>
        <div  className="col-md-8">
          <h1> {title} </h1>
          <div className="row">
            <div  className="col-md-6">
              {username}
            </div>
            <div  className="col-md-6 rightalign">
              <i> {numberviews} </i> views
            </div>
          </div>
          <span className="rightalign"><Reactions likes={likes} unlikes={unlikes} currentuserlike={currentuserlike} videoId={videoId}/></span>
          <Panel>
            <p> Uploaded: {date} </p>
            <p> {description} </p>
          </Panel>
          <Comments comments={comments} videoId={videoId}/>
        </div>
        <div  className="col-md-2"></div>
      </div>

    </div>
    )
  }
}

const mapStateToProps = state => {
  const { video, token } = state
  return {
    video, token
  }
}

export default connect(mapStateToProps)(withRouter(Watch))
