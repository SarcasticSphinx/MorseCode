import React from 'react';
import './ModeSelection.css';
import { Link } from 'react-router-dom';
const ModeSelection = () => {

    return (
        <div className="mode-selection">
            <h1>Choose your mode:</h1>
            <Link href="/MorseCode/exam/easy"><button className="mode-button">Easy</button></Link>
            <Link href="/MorseCode/exam/medium"><button className="mode-button">Medium</button></Link>
            <Link href="/MorseCode/exam/hard"><button className="mode-button">Hard</button></Link>
        </div>
    );
};

export default ModeSelection;
