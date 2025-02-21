import { MORSE_CODE_DICT } from "../../data/morseCode";
import { useEffect, useState } from "react";
import "./MorseExam.css";

//the space between dots and dashes that are part of the same letter is one second. the space between different letters is three seconds. the space between different words is seven seconds.

const MorseExam = () => {
    const [morseLetter, setMorseLetter] = useState("");
    const [userGuess, setUserGuess] = useState("");
    const [isBlinking, setIsBlinking] = useState(false);
    const [currentMorse, setCurrentMorse] = useState("");
    const [feedback, setFeedback] = useState("");

    const startExam = () => {
        const letters = Object.keys(MORSE_CODE_DICT);
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        setMorseLetter(randomLetter);
        setCurrentMorse(MORSE_CODE_DICT[randomLetter]);

        const blinkMorseCode = (morse) => {
            let index = 0;
            const interval = setInterval(() => {
                if (index >= morse.length) {
                    clearInterval(interval);
                    setIsBlinking(false);
                } else {
                    setIsBlinking(true);
                    setTimeout(() => {
                        setIsBlinking(false);
                    }, morse[index] === "▪" ? 200 : 600); // Short blink for dot, long blink for dash
                    index++;
                }
            }, 1000); // Interval between blinks
        };

        blinkMorseCode(currentMorse);
    };

    useEffect(() => {
        startExam();
    }, []);

    const handleGuess = () => {
        if (userGuess.toUpperCase() === morseLetter) {
            setFeedback("Correct!");
        } else {
            setFeedback("Incorrect! Try again.");
        }
        setUserGuess("");
    };

    const handleAgain = () => {
        setFeedback("");
        setUserGuess("");
        startExam();
    };

    return (
        <div className="exam-container">
            <h1>Morse Code Exam</h1>
            <p className="instruction">
                Guess the letter based on the blinking Morse code!
            </p>

            <div className={`morse-blink ${isBlinking ? "blink" : ""}`}></div>

            <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Enter your guess"
            />
            <button onClick={handleGuess}>Submit Guess</button>
            <button onClick={handleAgain}>Again</button>

            <p className="feedback">{feedback}</p>
        </div>
    );
};

export default MorseExam;
