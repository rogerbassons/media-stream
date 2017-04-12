import React, { Component } from 'react';
import {MediaPlayer} from 'dashjs';

class Video extends Component {

  createDashPlayer(id) {
    const url = "http://localhost/videos/" + id + "/" + id + ".mpd"
    this.video = this.refs["dashplayer"]
    this.player = MediaPlayer().create()
    this.player.initialize(this.video, url, true)
  }

  componentDidMount() {
    this.createDashPlayer(this.props.id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.createDashPlayer(nextProps.id)
    }
  }

  render() {
    return (
    <div className="col-md-12 movieblack">
      <div className="col-md-2"></div>
      <div className="col-md-8 text-center">
        <video ref="dashplayer" controls></video>
      </div>
      <div className="col-md-2"></div>
    </div>
    )
  }
}

export default Video
