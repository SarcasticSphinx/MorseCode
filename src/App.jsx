import MorseConverter from "./Converter/MorseConverter";
import MorseHomePage from "./Home Page/Home.jsx";
import MorseExam from "./Morse Exam/MorseExam.jsx";
import NavBar from "./Components/NavBar.jsx";

import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/MorseCode" element={<MorseHomePage />} />
        <Route path="/MorseCode/converter" element={<MorseConverter />} />
        <Route path="/MorseCode/exam" element={<MorseExam />} />
      </Routes>
    </>
  );
}

export default App;
