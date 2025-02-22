import MorseConverter from "./Converter/MorseConverter";
import MorseHomePage from "./Home Page/Home.jsx";
import ModeSelection from "./Morse Exam/Mode selection page/ModeSelection.jsx";
import MorseExamEasy from "./Morse Exam/easy mode/MorseExamEasy.jsx";
import MorseExamMedium from "./Morse Exam/medium mode/MorseExamMedium.jsx";
import MorseExamHard from "./Morse Exam/hard mode/MorseExamHard.jsx";
import NavBar from "./Components/NavBar.jsx";

import { Routes, Route } from "react-router-dom"; // ❌ Removed Router here

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MorseHomePage />} />
        <Route path="/converter" element={<MorseConverter />} />
        <Route path="/exam" element={<ModeSelection />} />
        <Route path="/exam/easy" element={<MorseExamEasy />} />
        <Route path="/exam/medium" element={<MorseExamMedium />} />
        <Route path="/exam/hard" element={<MorseExamHard />} />
      </Routes>
    </>
  );
}

export default App;
