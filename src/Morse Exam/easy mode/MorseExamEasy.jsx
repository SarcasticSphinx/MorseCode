import { MORSE_CODE_DICT } from "../../../data/morseCode";
import { useEffect, useState, useRef } from "react";
import "./MorseExam.css";

const MorseExam = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [isBlinking, setIsBlinking] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [results, setResults] = useState([]);
  const [examFinished, setExamFinished] = useState(false);
  const [examStarted, setExamStarted] = useState(false); // New state for exam start
  const inputRef = useRef(null);

  useEffect(() => {
    if (examStarted) {
      generateQuestions();
    }
  }, [examStarted]);

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
        setTimeout(
          () => {
            setIsBlinking(false);
          },
          morse[index] === "▪" ? 100 : 500
        );
        index++;
      }
    }, 1000);
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleGuess = () => {
    const currentLetter = questions[currentIndex];
    const isCorrect = userGuess.toUpperCase() === currentLetter;
    setResults([
      ...results,
      {
        question: currentLetter,
        answer: userGuess.toUpperCase(),
        correct: isCorrect,
      },
    ]);
    
    setFeedback(
      isCorrect
        ? "Correct!"
        : `Incorrect! The correct answer was ${currentLetter}`
    );
    setUserGuess("");

    if (currentIndex < 4) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        startBlinking(questions[currentIndex + 1]);
        // Focus on the input field after a short delay to ensure it's visible
        setTimeout(() => {
          if (inputRef.current) {
              inputRef.current.focus();
          }
      }, 100);
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

  const handleStartExam = () => {
    setExamStarted(true);
  };

  return (
    <div className="exam-container">
      <h1 className="exam-title">Morse Code Exam [Easy Mode]</h1>
      <a href="/MorseCode/#/exam">
        <button className="back-button">Back</button>
      </a>
      {!examStarted ? (
        <button className="start-button" onClick={handleStartExam}>
          Start Exam
        </button>
      ) : !examFinished ? (
        <>
          <p className="instruction">
            Guess the letter based on the blinking Morse code!
          </p>
          <p className="question-count">Question {currentIndex + 1} of 5</p>
          <div className={`morse-blink ${isBlinking ? "blink" : ""}`}></div>
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
          <p className="feedback">{feedback}</p>
          <button className="submit-button" onClick={handleGuess}>
            Submit Guess
          </button>
          <button className="again-button disabled" onClick={handleBlinkAgain}>
            Again
          </button>
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
