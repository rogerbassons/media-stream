import React, { Component } from 'react'
import Video from './Video'


class Videos extends Component {

 render() {
   const {videos} = this.props
   console.log(videos.videos)
   const listVideos = videos.videos.map((video,i) =>  <li> <Video video={video} /></li>)
   return (
     <div>
     <ul>
     {listVideos}
      </ul>
      </div>
    )
  }
}

export default Videos
