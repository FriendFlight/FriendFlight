import React, { Component } from 'react';
import router from './router';
import './reset.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <img src="https://cdn.pixabay.com/photo/2017/03/27/12/26/alpine-2178370_960_720.jpg" className="background"/>
      {router}
      </div>
    );
  }
}

export default App;
