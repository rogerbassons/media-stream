import React, { Component } from 'react';
import {MediaPlayer} from 'dashjs';

class Video extends Component {

  createDashPlayer(id) {
    var location = window.location.hostname
    var port = window.location.port
    /*if (port !== 0) {
      location += ":" + port
    }*/
    const url = "http://" + location + "/videos/" + id + "/" + id + ".mpd"
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
