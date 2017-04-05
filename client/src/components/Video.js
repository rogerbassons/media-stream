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
      <div>
          <video ref="dashplayer" controls></video>
      </div>
    )
  }
}

export default Video
