import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Gamemap from './components/gameMap';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <div className="App">
          <Gamemap />
        </div>
      </CookiesProvider>
    );
  }
}

export default App;
