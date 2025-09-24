
import React from 'react';
import './LoadingScreen.css';
import { useTheme } from '../../context/ThemeContext';

const LoadingScreen: React.FC = () => {
  const { settings } = useTheme();

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo" style={{ color: settings.primaryColor }}>
          Portfolio
        </div>
        <div className="loading-spinner"></div>
        <p>Loading amazing experiences...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
