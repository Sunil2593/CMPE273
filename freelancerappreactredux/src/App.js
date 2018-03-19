import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import HomePage from "./components/Homepage.js";

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <HomePage/>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
