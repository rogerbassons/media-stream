import React, { Component } from 'react'
import { connect } from 'react-redux'
import {likeVideo, unlikeVideo, deleteLikeVideo, deleteUnlikeVideo} from '../actions'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Reactions extends Component {

  handleReaction(reaction, currentuserlike) {
    const { dispatch, token, videoId } = this.props
    switch (reaction) {
      case 'like':
      if (currentuserlike.currentuserlike !== "LIKE") {
        dispatch(likeVideo(videoId, token.token))
      } else {
        console.log("TEST")
        dispatch(deleteLikeVideo(videoId, token.token))
      }
      break
      case 'unlike':
      if (currentuserlike.currentuserlike !== "UNLIKE") {
        dispatch(unlikeVideo(videoId, token.token))
      } else {
        dispatch(deleteUnlikeVideo(videoId, token.token))
      }
      break
      default:
    }
  }

  render() {
    const { token, likes, unlikes, currentuserlike }= this.props

    let reactions = (
      <div>
        <span className="rightmargin glyphicon glyphicon-thumbs-up">{likes}</span>
        <span className="glyphicon glyphicon-thumbs-down">{unlikes}</span>
      </div>
    )
    if (token !== null) {
      let likeClass = "btn rightmargin glyphicon glyphicon-thumbs-up"
      let unlikeClass = "btn glyphicon glyphicon-thumbs-down"
      if (currentuserlike === 'LIKE') {
        likeClass += " btn-success"
      } else if (currentuserlike === 'UNLIKE') {
        unlikeClass += " btn-danger"
      }
      reactions = (
        <div>
          <Button className={likeClass} onClick={()=>this.handleReaction("like", {currentuserlike})}>
            {likes}
          </Button>
          <Button className={unlikeClass} onClick={()=>this.handleReaction("unlike", {currentuserlike})}>
            {unlikes}
          </Button>
        </div>
      )
    }


    return (
      <div>
      {reactions}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { token } = state
  return {
    token
  }
}

export default connect(mapStateToProps)(Reactions)
