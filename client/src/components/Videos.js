import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

class Videos extends Component {

 render() {
   const {videos} = this.props
   const listVideos = videos.videos.map((video,i) =>
   <div key={video.videoId} className="col-md-4">
    <div className="thumbnail">
      <Link to={"/watch?video=" + video.videoId}>
        <img src={"http://192.168.1.4/thumbs/" + video.videoId + ".png"} alt={video.title} style={{"width" : "100%"}} />
        <div className="caption row">
          <span className="col-md-8">{video.title}</span>
          <span className="col-md-4"><i>{video.numberviews}</i> views </span>
        </div>
      </Link>
    </div>
   </div>)

   return (
  <div className="row">
       {listVideos}
   </div>
    )
  }
}

export default Videos
