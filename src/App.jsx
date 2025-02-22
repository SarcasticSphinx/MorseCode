import MorseConverter from "./Converter/MorseConverter";
import MorseHomePage from "./Home Page/Home.jsx";
import ModeSelection from "./Morse Exam/Mode selection page/ModeSelection.jsx";
import MorseExamEasy from "./Morse Exam/easy mode/MorseExamEasy.jsx";
import MorseExamMedium from "./Morse Exam/medium mode/MorseExamMedium.jsx";
import MorseExamHard from "./Morse Exam/hard mode/MorseExamHard.jsx";
import NavBar from "./Components/NavBar.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/MorseCode" element={<MorseHomePage />} />
        <Route path="/MorseCode/converter" element={<MorseConverter />} />
        <Route path="/MorseCode/exam" element={<ModeSelection />} />
        <Route path="/MorseCode/exam/easy" element={<MorseExamEasy />} />
        <Route path="/MorseCode/exam/medium" element={<MorseExamMedium />} />
        <Route path="/MorseCode/exam/hard" element={<MorseExamHard />} />

      </Routes>
    </>
  );
}

export default App;
