import React, { Component } from 'react';
import './App.css';

import Header from "./components/Header";
import Connection from "./components/Connection"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="site-main">
          <Connection />
        </main>
      </div>
    );
  }
}

export default App;
