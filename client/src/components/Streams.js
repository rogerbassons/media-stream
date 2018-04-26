import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Panel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Streams extends Component {

 render() {
   const {streams} = this.props
   const listStreams = streams.streams.map((stream,i) =>
   <div key={stream.user} className="col-md-4">
    <Link to={"/watchstream?user=" + stream.user.username}>
      <Panel>
          {stream.user.username} {stream.title} {stream.description}
      </Panel>
    </Link>
   </div>)

   return (
  <div className="row">
       {listStreams}
   </div>
    )
  }
}

export default Streams
