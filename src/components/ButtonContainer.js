import React from "react";
import Button from "./Button";

const ButtonContainer = (props) => {
  let {
    speed,
    speedDes,
    numCols,
    numRows,
    setRunning,
    running,
    runningRef,
    setGrid,
    runGame,
    generateEmptyGrid,
  } = props;
  return (
    <div>
      <Button />
      {/* Speed: fast*/}
      <button
        onClick={() => {
          speed = 10;
          speedDes = "fast";
          console.log("fast", speed);
        }}
      >
        Fast
      </button>
      {/* Speed: normal*/}
      <button
        onClick={() => {
          speed = 100;
          speedDes = "normal";
          console.log("normal", speed);
        }}
      >
        Normal
      </button>
      {/* Speed: slow*/}
      <button
        onClick={() => {
          speed = 1000;
          speedDes = "slow";
          console.log("slow", speed);
        }}
      >
        Slow
      </button>
      {/* Start/stop */}
      <button
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
      {/* Randomize  */}
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
        Randomize
      </button>
      {/* Clear*/}
      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        Clear
      </button>

      <p>Speed is: {speedDes} </p>
      <br />
      <p>Rows: {numRows}</p>

      <p>Columns: {numCols}</p>
      <br />
    </div>
  );
};

export default ButtonContainer;
