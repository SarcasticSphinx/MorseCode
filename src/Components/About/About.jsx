import React from "react";
import "./About.css";
import authorImage from "./../../asset/author.jpg"; // Replace with the actual image path

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <img src={authorImage} alt="Author" className="author-image" />
        <div className="about-content">
          <h2 className="about-title">About the Author</h2>
          <p className="about-text">
            Hi, I'm Mushfiqur Rahman, the creator of <span className="highlight">SAIL SIGNAL</span>. 
            I have a passion for maritime communication and coding. 
            My goal is to make learning Morse code easier and more interactive for mariners worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
