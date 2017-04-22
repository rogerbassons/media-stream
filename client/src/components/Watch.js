import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Video from '../components/Video'
import Comments from '../components/Comments'
import {getVideo, likeVideo, unlikeVideo} from '../actions'
import { Panel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Watch extends Component {

  constructor(props) {
    super(props)
    const { dispatch } = props
    dispatch(getVideo(props.history.location.search.split('=')[1]))
  }

  handleReaction(reaction) {
    const { dispatch, token } = this.props
    const id = this.props.video.video.videoId
    if (reaction === 'like') {
      dispatch(likeVideo(id, token.token))
    } else if (reaction === 'unlike') {
      dispatch(unlikeVideo(id, token.token))
    }
    this.history.push(this.history.location.pathname)
  }

  render() {
    const { video, token }= this.props
    let videoplayer, title, description, likes, unlikes, date, numberviews, username, comments, videoId
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
      videoplayer = (<Video id={videoId} />)
    }

    let reactions = (
      <div>
        <span className="rightmargin glyphicon glyphicon-thumbs-up">{likes}</span>
        <span className="glyphicon glyphicon-thumbs-down">{unlikes}</span>
      </div>
    )

    if (token !== null) {
      reactions = (
        <div>
          <Button className="btn btn-success rightmargin glyphicon glyphicon-thumbs-up" onClick={()=>this.handleReaction("like")}>
            {likes}
          </Button>
          <Button className="btn btn-danger rightmargin glyphicon glyphicon-thumbs-down" onClick={()=>this.handleReaction("unlike")}>
            {unlikes}
          </Button>
        </div>
      )
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
          {reactions}
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

      <Comments comments={comments} videoId={videoId}/>

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
