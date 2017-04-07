import React, { Component } from 'react';
import {MediaPlayer} from 'dashjs';

class Video extends Component {

  componentDidMount() {
    var url = "http://localhost/videos/" + this.props.id + "/" + this.props.id + ".mpd"
    this.video = this.refs["dashplayer"]
    this.player = MediaPlayer().create()
    this.player.initialize(this.video, url, true)
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
