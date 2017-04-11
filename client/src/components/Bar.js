import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Navbar, FormGroup, FormControl } from 'react-bootstrap'
import { withRouter } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class Bar extends Component {

  render() {
    let input
    return (
           <Navbar className="row navbar navbar-default navbar-fixed-top navbar-inverse bg-primary bg-faded navbar-toggleable-md navbar-toggleable-*">
             <Navbar.Header>
               <Navbar.Brand>
                 <Link to="/">Home</Link>
               </Navbar.Brand>
               <Navbar.Toggle />
             </Navbar.Header>
             <Navbar.Collapse>
               <Navbar.Form pullLeft>
                 <form onSubmit={e => {
                   e.preventDefault()
                   if (!input.value.trim()) {
                     return
                   }
                   this.props.history.push('/videos?search=' + input.value.replace(/ /g, '+'))
                   input.value = ''
                 }}>
                 <FormGroup>
                   <FormControl type="text" placeholder="Search" inputRef={ref => { input = ref }}/>
                   </FormGroup>
                   {' '}
                   <Button type="submit" className="btn btn-info">
                     <span className="glyphicon glyphicon-search"></span>
                  </Button>
                 </form>
               </Navbar.Form>
             </Navbar.Collapse>
           </Navbar>
         )
       }
}

export default withRouter(Bar)
