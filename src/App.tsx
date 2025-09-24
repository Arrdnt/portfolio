
import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

function AppContent() {
  const { settings } = useTheme();
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rootClass = `app ${settings.theme} ${settings.animationEnabled ? 'animated' : ''}`;

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={rootClass}>
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        {showBackToTop && <BackToTop />}
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
