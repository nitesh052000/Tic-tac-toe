import { useState } from "react";
import "./App.css";

const initialboard = () => Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialboard);

  const [isNext, setIsNext] = useState(true);

  const winning_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculatewinner = (currentboard) => {
    for (let i = 0; i < winning_patterns.length; i++) {
      const [a, b, c] = winning_patterns[i];
      if (
        currentboard[a] === currentboard[b] &&
        currentboard[b] === currentboard[c]
      ) {
        console.log(currentboard[a]);
        return currentboard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    // check winner
    const winner = calculatewinner(board);
    if (winner || board[index]) return;

    const newboard = [...board];
    newboard[index] = isNext ? "X" : "O";
    setBoard(newboard);
    setIsNext(!isNext);
  };

  const getStatusMessage = () => {
    const winner = calculatewinner(board);

    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${isNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialboard());
    setIsNext(true);
  };

  return (
    <div className="game">
      <div className="status">{getStatusMessage()}</div>
      <button className="reset-button" onClick={() => resetGame()}>
        Reset Game
      </button>
      <div className="board">
        {board.map((b, index) => {
          return (
            <button
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
      <div className="instructions">
        <h1>How to Play</h1>
        <h2>
          1-Players take turns placing their mark (X or O) in an empty cell of
          the grid
        </h2>
        <h2>
          2-The first player to get three of their marks in a row, column, or
          diagonal wins the game.
        </h2>
        <h2>
          3-If all nine cells are filled and no player has three in a row, the
          game ends in a draw
        </h2>
      </div>
    </div>
  );
}

export default App;
