import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Video from './components/Video.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>MediaStream</h1>
        </div>
        <Video />
      </div>
    );
  }
}

export default App;
