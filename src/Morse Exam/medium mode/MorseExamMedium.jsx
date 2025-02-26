import { MORSE_CODE_DICT } from "../../../data/morseCode";
import { useState, useRef } from "react";
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
    startBlinking(randomWords[0]);
    setExamStarted(true);
  };

  const startBlinking = (word) => {
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
            morse[morseIndex] === "▪" ? 200 : 600
          );
          morseIndex++;
        }
      }, 1000);
    };
    blinkLetter(word[index]);
  };

  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleGuess = () => {
    const currentWord = questions[currentIndex];
    const isCorrect = userGuess.toUpperCase() === currentWord;
    setResults([
      ...results,
      {
        question: currentWord,
        answer: userGuess.toUpperCase(),
        correct: isCorrect,
      },
    ]);
    setFeedback(
      isCorrect
        ? "Correct!"
        : `Incorrect! The correct answer was ${currentWord}`
    );
    setUserGuess("");

    if (currentIndex < 4) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        startBlinking(questions[currentIndex + 1]);
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

  return (
    <div className="exam-container">
      <h1 className="exam-title">Morse Code Exam [Medium Mode]</h1>
      <a href="/MorseCode/#/exam">
        <button className="back-button">Back</button>
      </a>
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
          <button className="submit-button" onClick={handleGuess}>
            Submit Guess
          </button>
          <button className="again-button" onClick={handleBlinkAgain}>
            Again
          </button>
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
                  <td>
                    {result.question
                      .split("")
                      .map((letter) => MORSE_CODE_DICT[letter])
                      .join(" ")}
                  </td>
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
