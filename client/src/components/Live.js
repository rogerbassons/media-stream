import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import {startLive} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'

class Live extends Component {

  form() {
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
    return (
      <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!description.value.trim()) {
          return
        }
        if (!title.value.trim()) {
          return
        }
        dispatch(startLive(title.value, description.value, token.token))
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
  }

  render() {
    const { token, livekey } = this.props
    let content = (<Button onClick={()=>this.props.history.push("/login")}>Login</Button>)
    if (token) {
      if (livekey) {
        content = (
         <div>
         Live stream is ready, you can start streaming at rtpm://{window.location.hostname}/live/{token.username}/{livekey.livekey}
         </div>
         )
      } else {
        content = (
          <div>
         {this.form()}
         </div>
         )
      }
    }
   return (
     <div className="row">
     {content}
     </div>
    )
  }
}

const mapStateToProps = state => {
  const { token, livekey } = state
  return {
    token, livekey
  }
}

export default connect(mapStateToProps)(Live)
