import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [bootstrap, setBootstrap] = useState(null);

  useEffect(() => {
    axios.get('/api/bootstrap').then(({ data }) => {
      setBootstrap(data);
    });
  }, [bootstrap, setBootstrap]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <p className="text">{JSON.stringify(bootstrap)}</p>
    </div>
  );
}

export default App;
