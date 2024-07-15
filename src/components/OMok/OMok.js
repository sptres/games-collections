import React, { useEffect } from 'react';
import './OMok.css';

function OMok() {
  useEffect(() => {
    const BOARD_SIZE = 15;
    let board = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(null)
    );
    let currentPlayer = 'black';
    let gameOver = false;

    const boardElement = document.getElementById('board');

    function createBoard() {
      for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener('click', onCellClick);
          boardElement.appendChild(cell);
        }
      }
    }

    function onCellClick(event) {
      if (gameOver) return;

      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);

      if (board[row][col]) return;

      board[row][col] = currentPlayer;
      event.target.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        setTimeout(
          () =>
            alert(
              `${
                currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)
              } wins!`
            ),
          10
        );
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    }

    function checkWin(row, col) {
      const directions = [
        { dr: 1, dc: 0 },
        { dr: 0, dc: 1 },
        { dr: 1, dc: 1 },
        { dr: 1, dc: -1 },
      ];

      for (const { dr, dc } of directions) {
        let count = 1;
        count += countStones(row, col, dr, dc);
        count += countStones(row, col, -dr, -dc);
        if (count >= 5) return true;
      }

      return false;
    }

    function countStones(row, col, dr, dc) {
      let count = 0;
      let r = row + dr;
      let c = col + dc;
      while (
        r >= 0 &&
        r < BOARD_SIZE &&
        c >= 0 &&
        c < BOARD_SIZE &&
        board[r][c] === currentPlayer
      ) {
        count++;
        r += dr;
        c += dc;
      }
      return count;
    }

    createBoard();
  }, []);

  return (
    <div>
      <h1>오목</h1>
      <div id="board"></div>
    </div>
  );
}

export default OMok;
