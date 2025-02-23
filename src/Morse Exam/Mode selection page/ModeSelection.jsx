import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ModeSelection.css';

const ModeSelection = () => {
    const [hoveredMode, setHoveredMode] = useState(null);

    const modes = [
        { 
            name: 'easy', 
            label: 'Easy',
            description: 'Perfect for beginners. Learn at your own pace.',
            icon: '🎯'
        },
        { 
            name: 'medium', 
            label: 'Medium',
            description: 'Challenge yourself with intermediate difficulty.',
            icon: '⚡'
        },
        { 
            name: 'hard', 
            label: 'Hard',
            description: 'Test your expertise with advanced challenges.',
            icon: '🔥'
        }
    ];

    return (
        <div className="mode-selection">
            <div className="mode-title-container">
                <h1 className="mode-title">Choose Difficulty</h1>
                <p className="mode-subtitle">Select the difficulty that matches your skill level</p>
            </div>
            
            <div className="mode-buttons-container">
                {modes.map((mode) => (
                    <Link 
                        to={`/exam/${mode.name}`} 
                        key={mode.name}
                        className="mode-link"
                    >
                        <button
                            className={`mode-button ${mode.name} ${hoveredMode === mode.name ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredMode(mode.name)}
                            onMouseLeave={() => setHoveredMode(null)}
                        >
                            <div className="mode-icon">{mode.icon}</div>
                            <h2 className="mode-label">{mode.label}</h2>
                            <p className="mode-description">{mode.description}</p>
                            <div className="mode-shine"></div>
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ModeSelection;