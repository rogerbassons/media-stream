import React, { Component } from 'react';
import ReactHLS from 'react-hls';

class Stream extends Component {

  render() {
    const url = "http://" + window.location.hostname + "/live/" + this.props.username + "/index.m3u8"
    return (
    <div>
        <ReactHLS url={url} />
    </div>
    )
  }
}

export default Stream
