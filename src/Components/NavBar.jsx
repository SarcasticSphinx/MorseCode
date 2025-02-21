import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <h1 className="logo">Morse Code App</h1>
                <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/MorseCode">Home</Link>
                    <Link to="/MorseCode/converter">Converter</Link>
                    <Link to="/MorseCode/exam">Exam</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
