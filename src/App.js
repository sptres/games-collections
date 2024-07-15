// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import OMok from './components/OMok/OMok';
// import FlappyBird from './components/FlappyBird/FlappyBird';
import Wordle from './components/Wordle/Wordle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-mok" element={<OMok />} />
          {/* <Route path="/flappy-bird" element={<FlappyBird />} /> */}
          <Route path="/wordle" element={<Wordle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
