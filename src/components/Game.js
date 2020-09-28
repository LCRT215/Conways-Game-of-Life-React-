import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./styles/Game.css";
import Rules from "./Rules";

// import ButtonContainer from "./components/ButtonContainer";

//Global variables
let numRows = 25;
let numCols = 25;
let speed = 100;
let speedDes = "Normal";

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
function Game() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  }); /* grid state */

  const [running, setRunning] = useState(
    false
  ); /* is the game running? starts off*/

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
    console.log("speed from run game", speed);
    setTimeout(runGame, speed);
  }, []);
  return (
    <main style={{ display: "flex" }}>
      {/* Grid Section*/}
      <section id="grid">
        {/* Grid */}
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            gridTemplateColumns: `repeat(${numCols}, 15px)`,
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
                  width: 14,
                  height: 14,
                  backgroundColor: grid[i][k] ? getRandomColor() : undefined,
                  border: "solid 1px #605770",
                  // grid[i][k] ? "solid yellow 2px" :
                }}
              />
            ))
          )}
        </div>{" "}
        <p>Current speed: {speedDes} </p>
        <p>
          {" "}
          Grid Size: {numRows}x{numCols}
        </p>
      </section>

      {/* Customize Section */}
      <section className="customizeSection" style={{ flexDirection: "row" }}>
        <p className="header">Customize</p>
        {/* Start/stop */}
        <button
          className="button"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runGame();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <hr style={{ border: "1px solid #473758" }} />
        {/* Set speed section */}
        <section>
          <div className="speedSection">
            <p className="header">Set Speed</p>
            {/* Speed: fast */}
            <button
              className="speedButton"
              onClick={() => {
                speed = 10;
                speedDes = "Fast";
                console.log("fast", speed);
              }}
            >
              Fast
            </button>
            {/* Speed: normal*/}
            <button
              className="speedButton"
              onClick={() => {
                speed = 100;
                speedDes = "Normal";
                console.log("normal", speed);
              }}
            >
              Normal
            </button>
            {/* Speed: slow*/}
            <button
              className="speedButton"
              onClick={() => {
                speed = 1000;
                speedDes = "Slow";
                console.log("slow", speed);
              }}
            >
              Slow
            </button>
          </div>
        </section>
        {/* Clear */}
        <button
          className="button"
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          Clear Grid
        </button>
        {/* Randomize  */}
        <button
          className="button"
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
          Random Layout
        </button>
        <hr style={{ border: "1px solid #473758" }} />
        <Rules />
      </section>
    </main>
  );
}

export default Game;
