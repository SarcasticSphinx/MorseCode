import React from 'react';
import './ModeSelection.css';
const ModeSelection = () => {

    return (
        <div className="mode-selection">
            <h1>Choose your mode:</h1>
            <a href="/MorseCode/exam/easy"><button className="mode-button">Easy</button></a>
            <a href="/MorseCode/exam/medium"><button className="mode-button">Medium</button></a>
            <a href="/MorseCode/exam/hard"><button className="mode-button">Hard</button></a>
        </div>
    );
};

export default ModeSelection;
