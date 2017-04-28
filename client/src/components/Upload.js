import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import {uploadFile} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Upload extends Component {
  onDrop(acceptedFiles, rejectedFiles) {
    var data = new FormData()
    data.append('file', acceptedFiles[0])
    this.setState({
      data: data,
    })
  }

  render() {
    const { dispatch, token } = this.props
    function FieldGroup({ id, label, help, ...props }) {
      return (
        <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
      )
    }
    let title, description
    let videoForm = (
      <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!description.value.trim()) {
          return
        }
        if (!title.value.trim()) {
          return
        }
        dispatch(uploadFile(this.state.data, title.value, description.value, token.token))
      }}>
      <FieldGroup
      id="formControlsTitle"
      type="text"
      label="Title:"
      componentClass="textarea"
      inputRef={ref => { title = ref }}
      />
      <FieldGroup
      id="formControlsDescription"
      type="text"
      label="Description:"
      componentClass="textarea"
      inputRef={ref => { description = ref }}
      />
      <Button type="submit">
      Send
      </Button>
      </form>
      </div>
    )
    let content = (
      <div>
      <div className="dropzone">
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
     </div>
     {videoForm}
     </div>
     )
    if (token === null) {
      content = (<Button onClick={()=>this.props.history.push("/login")}>Login</Button>)
    }
   return (
     <div className="row">
     {content}
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

export default connect(mapStateToProps)(withRouter(Upload))
