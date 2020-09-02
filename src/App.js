import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import produce from "immer";

let numRows = 25;
let numCols = 25;

//to find neighbors surrounding. mapping coordinates
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

// 0 = Dead
// 1 = Alive

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

// game play
const App = () => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  }); /* grid state */

  const [running, setRunning] = useState(
    false
  ); /* is the game running? starts off*/

  const [fast, setSpeed] = useState(false);

  let speed = () => {
    if (fast) {
      return 1000;
    } else if (!fast) {
      return 10;
    }
  };

  /* references the game on state that is mutable and will persist*/
  const runningRef = useRef(running);
  runningRef.current = running; /* check the current value of gameOn */
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const runGame = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    //runs
    setGrid((g) => {
      //runs through every cell in game grid
      return produce(g, (gridCopy) => {
        //produce will create a new game grid and update the state with it.
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            //see how many neighbors this cell has
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              //Checking all coordinates around for neighbors and staying in bounds
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            //once neighbors are known, decide if cell lives 😇 or dies 😈
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    //If the game should be running, call runGame again, until not on

    setTimeout(runGame, speed);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setSpeed(false);
          console.log(fast);
          runGame();
        }}
      >
        Average
      </button>

      <button
        onClick={() => {
          setSpeed(true);
          console.log(fast);
          runGame();
        }}
      >
        Fast
      </button>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runGame();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
        }}
      >
        random
      </button>
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        clear
      </button>
      <p>Speed at 1000X </p>
      <br />
      <p>Rows: {numRows}</p>
      <br />

      <button
        onClick={() => {
          numCols++;
          console.log(numCols);
        }}
      >
        +
      </button>

      <p>Columns: {numCols}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? getRandomColor() : undefined,
                border: grid[i][k] ? "solid yellow 2px" : "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default App;