import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Board from './board'
import { clickSquare, jumpToPast } from '../action'


export const Game = () => {
  const dispatch = useDispatch()
  const history = useSelector(state => state.game.history)
  const stepNumber = useSelector(state => state.game.stepNumber)
  const xIsNext = useSelector(state => state.game.xIsNext)

  console.log(history, stepNumber)
  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((sqares, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => dispatch(jumpToPast(move))}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => dispatch(clickSquare(i))}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
