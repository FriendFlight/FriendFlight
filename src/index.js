import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { ThemeProvider } from 'styled-components';
import theme from './components/Theme.js';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import inject from 'styled-components';

console.log(Object.assign({}, theme, inject))

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
    </BrowserRouter>,
  document.getElementById('root'));
