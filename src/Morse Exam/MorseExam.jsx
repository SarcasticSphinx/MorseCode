import { MORSE_CODE_DICT } from "../../data/morseCode";
import { useEffect, useState } from "react";
import "./MorseExam.css";

const MorseExam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userGuess, setUserGuess] = useState("");
    const [isBlinking, setIsBlinking] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [results, setResults] = useState([]);
    const [examFinished, setExamFinished] = useState(false);

    useEffect(() => {
        generateQuestions();
    }, []);

    const generateQuestions = () => {
        const letters = Object.keys(MORSE_CODE_DICT);
        let randomLetters = [];
        while (randomLetters.length < 5) {
            const letter = letters[Math.floor(Math.random() * letters.length)];
            if (!randomLetters.includes(letter)) {
                randomLetters.push(letter);
            }
        }
        setQuestions(randomLetters);
        startBlinking(randomLetters[0]);
    };

    const startBlinking = (letter) => {
        const morse = MORSE_CODE_DICT[letter];
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
        }, 1000);
    };

    const handleGuess = () => {
        const currentLetter = questions[currentIndex];
        const isCorrect = userGuess.toUpperCase() === currentLetter;
        setResults([...results, { question: currentLetter, answer: userGuess.toUpperCase(), correct: isCorrect }]);
        setFeedback(isCorrect ? "Correct!" : `Incorrect! The correct answer was ${currentLetter}`);
        setUserGuess("");

        if (currentIndex < 4) {
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                startBlinking(questions[currentIndex + 1]);
                setFeedback("");
            }, 1000);
        } else {
            setTimeout(() => {
                setExamFinished(true);
            }, 1000);
        }
    };

    const handleBlinkAgain = () => {
        startBlinking(questions[currentIndex]);
    };

    return (
        <div className="exam-container">
            <h1 className="exam-title">Morse Code Exam</h1>
            {!examFinished ? (
                <>
                    <p className="instruction">Guess the letter based on the blinking Morse code!</p>
                    <p className="question-count">Question {currentIndex + 1} of 5</p>
                    <div className={`morse-blink ${isBlinking ? "blink" : ""}`}></div>
                    <input
                        type="text"
                        className="guess-input"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="Enter your guess"
                    />
                    <button className="submit-button" onClick={handleGuess}>Submit Guess</button>
                    <button className="again-button" onClick={handleBlinkAgain}>Again</button>
                    <p className="feedback">{feedback}</p>
                </>
            ) : (
                <div className="result-container">
                    <h2 className="result-title">Exam Completed!</h2>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Your Answer</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{MORSE_CODE_DICT[result.question]}</td>
                                    <td>{result.question}</td>
                                    <td>{result.answer}</td>
                                    <td>{result.correct ? "✔️ Correct" : "❌ Incorrect"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MorseExam;
