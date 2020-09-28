import React from "react";

function Rules() {
  return (
    <div style={{ color: "#e06785" }}>
      <p style={{ color: "#87d4c4", fontSize: " 22px" }}>Rules:</p>
      <ul>
        <li>
          Living cells that have two or three neighbors will remain alive in the
          next generation.
        </li>
        <li>
          Living cells with less than two neighbors will die due to
          underpopulation.
        </li>
        <li>
          Living cells with more than three neighbors will die due to
          overpopulation.
        </li>
        <li>
          Cells that are not alive, but have three living neighbors will be
          brought to life due to reproduction.
        </li>
      </ul>
    </div>
  );
}

export default Rules;
