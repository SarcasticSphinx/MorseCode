import React, { useState } from "react";
import { textToMorse, morseToText } from "../../data/morseCode";
import "./MorseConverter.css";

const MorseConverter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleTextToMorse = () => {
    setOutput(textToMorse(input));
  };

  const handleMorseToText = () => {
    setOutput(morseToText(input));
  };

  return (
    <div className="morse-converter">
      <h1 className="title">Morse Code Converter</h1>
      <input
        type="text"
        className="input-field"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text or Morse code"
      />
      <button className="convert-button" onClick={handleTextToMorse}>
        Text to Morse
      </button>
      <button className="convert-button" onClick={handleMorseToText}>
        Morse to Text
      </button>
      <p className="output">
        Output: <span className="output-code">{output}</span>
      </p>
    </div>
  );
};

export default MorseConverter;
