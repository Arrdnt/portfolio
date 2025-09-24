
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Hero.css';

const Hero: React.FC = () => {
  const { settings } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const subtitles = [
    'A passionate developer creating amazing things with code.',
    'Building intuitive and engaging user experiences.',
    'Turning ideas into reality with modern web technologies.',
    'Crafting innovative solutions for the digital world.'
  ];

  useEffect(() => {
    const typeText = () => {
      const currentSubtitle = subtitles[currentTextIndex];
      if (typedText.length < currentSubtitle.length) {
        setTypedText(currentSubtitle.substring(0, typedText.length + 1));
      } else {
        setTimeout(() => {
          setTypedText('');
          setCurrentTextIndex((prev) => (prev + 1) % subtitles.length);
        }, 2000);
      }
    };

    const interval = setInterval(typeText, 100);
    return () => clearInterval(interval);
  }, [typedText, currentTextIndex, subtitles]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-wave wave-1"></div>
        <div className="hero-wave wave-2"></div>
        <div className="hero-wave wave-3"></div>
        <div className="hero-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
                '--particle-color': settings.primaryColor
              }}
            />
          ))}
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-main">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Your Name</span>
          </h1>
          <p className="hero-subtitle">
            {typedText}
            <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
          </p>
          <div className="hero-buttons">
            <button className="cta-btn primary" onClick={scrollToAbout}>
              Explore My Work
            </button>
            <button className="cta-btn secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get In Touch
            </button>
          </div>
          <div className="hero-stats">
            <span>3+ Years Experience</span>
            <span>•</span>
            <span>20+ Projects</span>
            <span>•</span>
            <span>5+ Technologies</span>
          </div>
        </div>
        <div className="hero-cta">
          <div className="cta-highlight">
            Ready to build something extraordinary? Let's collaborate!
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToAbout}>
        <div className="scroll-line"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
