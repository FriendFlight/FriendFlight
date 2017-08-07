import React, { Component } from 'react';
import router from './router';
import './reset.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {router}
      </div>
    );
  }
}

export default App;
