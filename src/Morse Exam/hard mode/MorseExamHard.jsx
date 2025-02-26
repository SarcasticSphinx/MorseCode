import { MORSE_CODE_DICT } from "../../../data/morseCode";
import { useEffect, useState, useRef } from "react";
import "../easy mode/MorseExamEasy";

const MorseExam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userGuess, setUserGuess] = useState("");
    const [isBlinking, setIsBlinking] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [results, setResults] = useState([]);
    const [examFinished, setExamFinished] = useState(false);
    const [examStarted, setExamStarted] = useState(false);
    const [countdown, setCountdown] = useState(null);
    
    // Create a ref for the input element
    const inputRef = useRef(null);

    const generateQuestions = () => {
        const letters = Object.keys(MORSE_CODE_DICT);
        let randomWords = [];
        for (let i = 0; i < 5; i++) {
            let word = "";
            while (word.length < 5) {
                const letter = letters[Math.floor(Math.random() * letters.length)];
                if (!word.includes(letter)) {
                    word += letter;
                }
            }
            randomWords.push(word);
        }
        setQuestions(randomWords);
        setExamStarted(true);
        setCountdown(3);
    };

    // Handle countdown and start blinking
    useEffect(() => {
        let timer;
        if (countdown !== null && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && questions.length > 0) {
            timer = setTimeout(() => {
                setCountdown(null);
                startBlinking(questions[currentIndex]);
                
                // Focus on the input field after a short delay to ensure it's visible
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }, 100);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown, questions, currentIndex]);

    const startBlinking = (word) => {
        if (!word) return; // Guard clause to prevent undefined errors
        
        let index = 0;
        const blinkLetter = (letter) => {
            const morse = MORSE_CODE_DICT[letter];
            let morseIndex = 0;
            
            const interval = setInterval(() => {
                if (morseIndex >= morse.length) {
                    clearInterval(interval);
                    setIsBlinking(false);
                    if (index < word.length - 1) {
                        index++;
                        setTimeout(() => blinkLetter(word[index]), 3000);
                    }
                } else {
                    setIsBlinking(true);
                    setTimeout(
                        () => {
                            setIsBlinking(false);
                        },
                        morse[morseIndex] === "▪" ? 100 : 500
                    );
                    morseIndex++;
                }
            }, 1000);
        };

        if (word.length > 0) {
            blinkLetter(word[index]);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value.toUpperCase();
        setUserGuess(input);

        const currentWord = questions[currentIndex];
        if (!currentWord) return; // Guard clause to prevent undefined errors

        // Check if the input is wrong at any point
        if (input.length <= currentWord.length) {
            for (let i = 0; i < input.length; i++) {
                if (input[i] !== currentWord[i]) {
                    handleWrongAnswer(input);
                    return;
                }
            }
            // If input length matches word length and we got here, it's correct
            if (input.length === currentWord.length) {
                handleCorrectAnswer(input);
            }
        } else {
            handleWrongAnswer(input);
        }
    };

    const handleCorrectAnswer = (answer) => {
        setResults([
            ...results,
            {
                question: questions[currentIndex],
                answer: answer,
                correct: true,
            },
        ]);
        setFeedback("Correct!");
        moveToNextQuestion();
    };

    const handleWrongAnswer = (answer) => {
        setResults([
            ...results,
            {
                question: questions[currentIndex],
                answer: answer,
                correct: false,
            },
        ]);
        setFeedback(`Incorrect! The correct answer was ${questions[currentIndex]}`);
        moveToNextQuestion();
    };

    const moveToNextQuestion = () => {
        setUserGuess("");
        if (currentIndex < 4) {
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                setCountdown(3);
                setFeedback("");
            }, 3000);
        } else {
            setTimeout(() => {
                setExamFinished(true);
            }, 3000);
        }
    };

    return (
        <div className="exam-container">
            <h1 className="exam-title">Morse Code Exam [Hard Mode]</h1>
            <a href="/MorseCode/#/exam"><button className="back-button">Back</button></a>
            {!examStarted ? (
                <button className="start-button" onClick={generateQuestions}>
                    Start Exam
                </button>
            ) : !examFinished ? (
                <>
                    <p className="instruction">
                        Guess the word based on the blinking Morse code!
                    </p>
                    <p className="question-count">Question {currentIndex + 1} of 5</p>
                    {countdown !== null ? (
                        <div className="countdown">Starting in {countdown}...</div>
                    ) : (
                        <>
                            <div className={`morse-blink ${isBlinking ? "blink" : ""}`}></div>
                            <p className="feedback">{feedback}</p>
                            <input
                                type="text"
                                className="guess-input"
                                value={userGuess}
                                onChange={handleInputChange}
                                placeholder="Type your answer"
                                maxLength={5}
                                ref={inputRef}
                                autoFocus
                            />
                        </>
                    )}
                    
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
                                    <td>{result.question.split('').map(letter => MORSE_CODE_DICT[letter]).join(' ')}</td>
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