import React, { Component } from 'react';
import {MediaPlayer} from 'dashjs';

class Video extends Component {

  createDashPlayer(id) {
    const url = "http://192.168.1.4/videos/" + id + "/" + id + ".mpd"
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
    <div>
        <video ref="dashplayer" controls></video>
    </div>
    )
  }
}

export default Video
