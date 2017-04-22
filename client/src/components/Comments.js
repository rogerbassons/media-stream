import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Comments extends Component {

  render() {
    const { comments }= this.props
    let listComments, commentPanel
    if (comments && comments.length > 0) {
      listComments = comments.map((comment,i) =>
      <div>
        <p> {comment.user.username}: </p>
        <p> {comment.text} </p>
      </div>
    )
      commentPanel = (
        <div>
          <div  className="col-md-2"></div>
            <Panel className="col-md-8">
              {listComments}
              <div  className="col-md-2"></div>
            </Panel>
        </div>
      )

  }
  return (
    <div className="row">
    {commentPanel}
    </div>
  )
}
}

export default Comments
