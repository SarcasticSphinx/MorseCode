// import React, { useState } from "react";
// import { MORSE_CODE_DICT } from "../../data/morseCode";
// import "./Home.css";

// const MorseHomePage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedChar, setSelectedChar] = useState(null);
//   const [playingChar, setPlayingChar] = useState(null);

//   const playMorseCode = (char, code) => {
//     setPlayingChar(char);
//     const dot = 200; // 200ms for dot
//     const dash = 600; // 600ms for dash
//     const symbolGap = 1000; // 1 second gap between symbols
//     const context = new (window.AudioContext || window.webkitAudioContext)();

//     const playBeep = (duration) => {
//       const oscillator = context.createOscillator();
//       const gainNode = context.createGain();
      
//       oscillator.connect(gainNode);
//       gainNode.connect(context.destination);
      
//       oscillator.type = 'sine';
//       oscillator.frequency.value = 600;
      
//       oscillator.start();
//       setTimeout(() => {
//         oscillator.stop();
//       }, duration);
//     };

//     let timeOffset = 0;
//     code.split('').forEach((char) => {
//       if (char === '▪') {
//         setTimeout(() => playBeep(dot), timeOffset);
//         timeOffset += dot + symbolGap; // Add gap after dot
//       } else if (char === '-') {
//         setTimeout(() => playBeep(dash), timeOffset);
//         timeOffset += dash + symbolGap; // Add gap after dash
//       }
//     });

//     // Reset playing state after the full sequence
//     setTimeout(() => setPlayingChar(null), timeOffset);
//   };

//   const filteredEntries = Object.entries(MORSE_CODE_DICT).filter(([char, code]) =>
//     char.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     code.includes(searchTerm)
//   );

//   return (
//     <div className="morse-homepage">
//       <div className="header-container">
//         <h1 className="title">Morse Code Dictionary</h1>
//         <p className="subtitle">Interactive guide to Morse code signals</p>
//       </div>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search character or code..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       <div className="table-container">
//         <table className="morse-table">
//           <thead>
//             <tr>
//               <th>Character</th>
//               <th>Morse Code</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredEntries.map(([char, code]) => (
//               <tr 
//                 key={char}
//                 className={selectedChar === char ? 'selected' : ''}
//                 onClick={() => setSelectedChar(char)}
//               >
//                 <td className="character-cell">{char}</td>
//                 <td className="code-cell">{code}</td>
//                 <td className="action-cell">
//                   <button
//                     className={`play-button ${playingChar === char ? 'playing' : ''}`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       playMorseCode(char, code);
//                     }}
//                     disabled={playingChar !== null} // Disable all buttons while any is playing
//                   >
//                     {playingChar === char ? '▶️' : '🔊'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedChar && (
//         <div className="selected-info">
//           <h2>Selected Character: {selectedChar}</h2>
//           <p>Morse Code: {MORSE_CODE_DICT[selectedChar]}</p>
//           <button 
//             className="close-button"
//             onClick={() => setSelectedChar(null)}
//           >
//             ✕
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MorseHomePage;




import React, { useState } from "react";
import { MORSE_CODE_DICT } from "../../data/morseCode";
import "./Home.css";

const MorseHomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChar, setSelectedChar] = useState(null);
  const [playingChar, setPlayingChar] = useState(null);
  const [currentContext, setCurrentContext] = useState(null);

  const playMorseCode = (char, code) => {
    // Stop any currently playing sound
    if (currentContext) {
      currentContext.close();
    }

    setPlayingChar(char);
    const dot = 200; // 200ms for dot
    const dash = 600; // 600ms for dash
    const symbolGap = 200; // 200ms gap between symbols
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setCurrentContext(context);

    const playBeep = (duration) => {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 600;
      
      // Add fade in/out to avoid clicks
      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, context.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, context.currentTime + duration/1000 - 0.01);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration/1000);
    };

    let timeOffset = 0;
    const sequence = code.split('');
    
    sequence.forEach((symbol, index) => {
      const duration = symbol === '▪' ? dot : dash;
      setTimeout(() => {
        if (context.state !== 'closed') { // Check if context is still active
          playBeep(duration);
        }
      }, timeOffset);
      
      // Add gap after symbol unless it's the last one
      timeOffset += duration + (index < sequence.length - 1 ? symbolGap : 0);
    });

    // Reset playing state after the full sequence
    setTimeout(() => {
      setPlayingChar(null);
      context.close();
      setCurrentContext(null);
    }, timeOffset + 100);
  };

  const filteredEntries = Object.entries(MORSE_CODE_DICT).filter(([char, code]) =>
    char.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.includes(searchTerm)
  );

  return (
    <div className="morse-homepage">
      <div className="header-container">
        <h1 className="title">Morse Code Dictionary</h1>
        <p className="subtitle">Interactive guide to Morse code signals</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search character or code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table className="morse-table">
          <thead>
            <tr>
              <th>Character</th>
              <th>Morse Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map(([char, code]) => (
              <tr 
                key={char}
                className={selectedChar === char ? 'selected' : ''}
                onClick={() => setSelectedChar(char)}
              >
                <td className="character-cell">{char}</td>
                <td className="code-cell">{code}</td>
                <td className="action-cell">
                  <button
                    className={`play-button ${playingChar === char ? 'playing' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      playMorseCode(char, code);
                    }}
                  >
                    {playingChar === char ? '▶️' : '🔊'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedChar && (
        <div className="selected-info">
          <h2>Selected Character: {selectedChar}</h2>
          <p>Morse Code: {MORSE_CODE_DICT[selectedChar]}</p>
          <button 
            className="close-button"
            onClick={() => setSelectedChar(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default MorseHomePage;