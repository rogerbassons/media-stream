import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Video from './components/Video.js';

class App extends Component {

  constructor(props) {
     super(props)
     this.handleClick = this.handleClick.bind(this)
     this.state = {clicked: false}
   }

  handleClick() {
    this.setState({clicked: true})
  }

  render() {
    var video = null
    if (this.state.clicked) {
      video = <Video />
    }

    var text = null
    if (!this.state.clicked) {
      text = <div onClick={(e) => this.handleClick(e)}> Click me! </div>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>MediaStream</h1>
        </div>
        {text}
        {video}
      </div>
    );
  }
}

export default App;
