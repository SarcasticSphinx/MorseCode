import React from "react";
import "./ModeSelection.css";
import { Link } from "react-router-dom";
const ModeSelection = () => {
  return (
    <div className="mode-selection">
      <h1>Choose your mode:</h1>
      <Link to="/MorseCode/exam/easy">
        <button className="mode-button">Easy</button>
      </Link>
      <Link to="/MorseCode/exam/medium">
        <button className="mode-button">Medium</button>
      </Link>
      <Link to="/MorseCode/exam/hard">
        <button className="mode-button">Hard</button>
      </Link>
    </div>
  );
};

export default ModeSelection;
