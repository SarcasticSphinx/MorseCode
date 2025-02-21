import {MORSE_CODE_DICT} from "../../data/morseCode";
import "./Home.css";

const MorseHomePage = () => {
    return (
      <div className="morse-homepage">
        <h1 className="title">Morse Code Dictionary</h1>
        <table className="morse-table">
          <thead>
            <tr>
              <th>Character</th>
              <th>Morse Code</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(MORSE_CODE_DICT).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MorseHomePage;