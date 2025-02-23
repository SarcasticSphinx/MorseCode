import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../asset/logo.png";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to close menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <img src={logo} alt="Morse Code App" className="logo" />
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/converter" onClick={closeMenu}>Converter</Link>
          <Link to="/exam" onClick={closeMenu}>Exam</Link>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;