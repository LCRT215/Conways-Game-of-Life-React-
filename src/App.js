import React, { useState } from "react";
import "./App.css";
import produce from "immer";

const numRows = 25;
const numCols = 25;

// 0 = Dead
// 1 = Alive

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  }); /* grid state */

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 20px)`,
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            onClick={() => {
              const newGrid = produce(grid, (gridCopy) => {
                gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
              });
              setGrid(newGrid);
            }}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[rowIndex][colIndex] ? "pink" : undefined,
              border: "solid 2px black",
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
