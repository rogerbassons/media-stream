import React, { Component } from 'react';
import {MediaPlayer} from 'dashjs';

class Video extends Component {

  componentDidMount() {
    const {title, url} = this.props.video
    this.video = this.refs[title]
    this.player = MediaPlayer().create()
    this.player.initialize(this.video, url, true)
  }

  render() {
    const {title, url} = this.props.video
    return (
      <div>
      <video ref={title} controls></video>
      </div>
    )
  }
}

export default Video
