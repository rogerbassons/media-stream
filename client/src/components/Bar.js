import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav, NavItem, FormGroup, FormControl } from 'react-bootstrap'
import { withRouter } from 'react-router'
import {deleteToken} from '../actions'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class Bar extends Component {

  handleLink(path) {
    const {dispatch} = this.props
    if (path === "logout") {
      path = "/"
      dispatch(deleteToken())
    }
    this.props.history.push(path);
  }

  render() {
    const { token } = this.props
    let navi = (<Nav pullRight><NavItem eventKey={1} onClick={()=>this.handleLink("/login")}>Login</NavItem></Nav>)
    if (token !== null && token.token !== null) {
      navi = (
        <Nav pullRight>
          <NavItem eventKey={1} onClick={()=>this.handleLink("/upload")}><span className="glyphicon glyphicon-plus"></span></NavItem>
          <NavItem eventKey={2} onClick={()=>this.handleLink("logout")}> Logout </NavItem>
        </Nav>
      )
    }
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
               {navi}
             </Navbar.Collapse>
           </Navbar>
         )
       }
}

const mapStateToProps = state => {
  const { token } = state
  return {
    token
  }
}

export default connect(mapStateToProps)(withRouter(Bar))
