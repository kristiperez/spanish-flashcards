import React from 'react';
import './App.css';
import tux from './tux.png'

function App() {
  return (
    <div className="App-hero">
      <div className="App-hero-text">
      <h1>Let's Learn </h1>
      <h1>Spanish!</h1>
      </div>
      <img src={tux} alt="hero"/>
    </div>
  );
}

export default App;
