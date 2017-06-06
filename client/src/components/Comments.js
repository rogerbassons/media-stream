import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import {commentVideo} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Comments extends Component {

  render() {
    const { comments, videoId, dispatch, token }= this.props

    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      )
    }
    let comment, commentForm
    if (token !== null && token.token !== null) {
       commentForm = (
        <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!comment.value.trim()) {
            return
          }
          dispatch(commentVideo(comment.value, videoId, token.token))
          this.history.push(this.history.location.pathname)
        }}>
        <FieldGroup
        id="formControlsComment"
        type="text"
        label="Comment:"
        componentClass="textarea"
        inputRef={ref => { comment = ref }}
        />
        <Button type="submit">
        Send
        </Button>
        </form>
        </div>
      )
   }  

    let listComments, commentPanel
    if (comments && comments.length > 0) {
      listComments = comments.map((comment,i) =>
      <div>
      <p> {comment.user.username}: </p>
      <p> {comment.text} </p>
      </div>)
      commentPanel = (
        <Panel>
        {listComments}
        </Panel>
      )
    }

    return (
      <div>
      {commentForm}
      {commentPanel}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { token } = state
  return {
    token
  }
}

export default connect(mapStateToProps)(withRouter(Comments))
