import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
   super(props)
   this.state = {url: './mr2v2mobile.mp4'}
 }

 componentWillMount() {
        const script = document.createElement("script");

        script.src = "http://cdn.dashjs.org/latest/dash.all.min.js";
        //script.async = true;

        document.body.appendChild(script);
}

 render() {
    return (
      <div>
        <video data-dashjs-player autoplay src={this.state.url} controls></video>
      </div>
    );
  }
}

export default Video;
