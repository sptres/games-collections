import React, { useState, useEffect } from 'react';
import { wordsDataset } from './words';
import './Wordle.css';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

function Wordle() {
  const [answer, setAnswer] = useState('');
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);

  useEffect(() => {
    const fiveLetterWords = wordsDataset.filter(
      (word) => word.length === WORD_LENGTH
    );
    setAnswer(
      fiveLetterWords[
        Math.floor(Math.random() * fiveLetterWords.length)
      ].toUpperCase()
    );
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (gameOver) return;

      if (event.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (
        currentGuess.length < WORD_LENGTH &&
        event.key.match(/^[a-z]$/i)
      ) {
        const newGuess = currentGuess + event.key.toUpperCase();
        setCurrentGuess(newGuess);

        if (newGuess.length === WORD_LENGTH) {
          submitGuess(newGuess);
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameOver, currentRow]);

  function submitGuess(guess) {
    const newGuesses = [...guesses];
    newGuesses[currentRow] = guess;
    setGuesses(newGuesses);
    setCurrentRow(currentRow + 1);
    setCurrentGuess('');

    if (guess === answer) {
      setGameOver(true);
    } else if (currentRow + 1 === MAX_GUESSES) {
      setGameOver(true);
    }
  }

  function getTileClass(letter, index, row) {
    if (row < currentRow) {
      if (letter === answer[index]) {
        return 'correct';
      } else if (answer.includes(letter)) {
        return 'present';
      } else {
        return 'absent';
      }
    }
    return '';
  }

  return (
    <div className="Wordle">
      <h1>Wordle</h1>
      <div className="board">
        {guesses.map((guess, i) => (
          <div key={i} className="row">
            {Array.from(Array(WORD_LENGTH)).map((_, j) => (
              <div
                key={j}
                className={`tile ${getTileClass((guess || '')[j], j, i)}`}
              >
                {i === currentRow ? currentGuess[j] : (guess || '')[j]}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div>
          {guesses[currentRow - 1] === answer
            ? 'Congratulations! You won!'
            : `Game over! The word was ${answer}.`}
        </div>
      )}
    </div>
  );
}

export default Wordle;
