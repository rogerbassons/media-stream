import React, { Component } from 'react';
import {MediaPlayer} from 'dashjs';

class Video extends Component {
  constructor(props) {
   super(props)
   this.state = {url: 'http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd'}
 }

 componentDidMount() {
        this.video = this.refs['video'];
        this.player = MediaPlayer().create();
        this.player.initialize(this.video, this.state.url, true);
}

 render() {
    return (
      <div>
        <video ref="video" controls></video>
      </div>
    );
  }
}

export default Video;
