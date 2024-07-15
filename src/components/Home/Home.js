// src/components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <h1>Games Collection</h1>
      <nav>
        <ul>
          <li>
            <Link to="/o-mok">Play O-Mok</Link>
          </li>
          <li>
            <Link to="/flappy-bird">Play Flappy Bird</Link>
          </li>
          <li>
            <Link to="/wordle">Play Wordle</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
