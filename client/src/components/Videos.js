import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

class Videos extends Component {

 render() {
   const {videos} = this.props
   const listVideos = videos.map((video,i) =>
   <div key={video.videoId} className="col-md-4">
    <div className="thumbnail">
      <Link to={"/watch/" + video.videoId}>
        <img src={"http://localhost/thumbs/" + video.videoId + ".png"} alt={video.title} style={{"width" : "100%"}} />
        <div className="caption">
          <p>{video.title}</p>
        </div>
      </Link>
    </div>
   </div>)

   return (
  <div>
   <div className="container">
     <div className="row">
       {listVideos}
     </div>
   </div>
   </div>
    )
  }
}

export default Videos
