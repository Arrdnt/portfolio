
import React from 'react';
import './BackToTop.css';
import { useTheme } from '../../context/ThemeContext';

const BackToTop: React.FC = () => {
  const { settings } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="back-to-top" onClick={scrollToTop} style={{ background: settings.primaryColor }}>
      ↑
    </button>
  );
};

export default BackToTop;
