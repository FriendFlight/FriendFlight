import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import theme from './components/Theme.js';
import inject from 'styled-components';


ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={ theme }>
          <App />
        </ThemeProvider>
    </BrowserRouter>,
  document.getElementById('root'));
