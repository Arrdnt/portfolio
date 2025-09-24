
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
  const { settings } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = ['hero', 'about', 'projects', 'skills', 'testimonials', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY + 100;
      const section = sections.find((s) => {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          return fromTop >= top && fromTop < top + height;
        }
        return false;
      });
      if (section) setActiveSection(section);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo" style={{ fontSize: `${settings.fontSize}px` }}>Portfolio</div>
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {sections.map((section) => (
            <li key={section}>
              <button
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Header;
