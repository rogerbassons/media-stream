import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {doLogin} from '../actions'
import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

class Login extends Component {

  render() {
     const { dispatch } = this.props
     function FieldGroup({ id, label, help, ...props }) {
       return (
       <FormGroup controlId={id}>
         <ControlLabel>{label}</ControlLabel>
         <FormControl {...props} />
         {help && <HelpBlock>{help}</HelpBlock>}
       </FormGroup>
       )
     }
     let user, pass
   return (
   <div className="row">
     <div className="col-md-4"></div>
     <div className="col-md-4">
       <form onSubmit={e => {
         e.preventDefault()
         if (!user.value.trim()) {
           return
         }
         if (!pass.value.trim()) {
           return
         }
         dispatch(doLogin(user.value, pass.value))
         this.props.history.push('/')
       }}>
         <FieldGroup
         id="formControlsUser"
         type="text"
         label="User"
         inputRef={ref => { user = ref }}
         />
         <FieldGroup
         id="formControlsPassword"
         label="Password"
         type="password"
         inputRef={ref => { pass = ref }}
         />
         <Button type="submit">
           Login
         </Button>
       </form>
     </div>
     <div className="col-md-4"></div>
   </div>
    )
  }
}

export default connect()(withRouter(Login))
