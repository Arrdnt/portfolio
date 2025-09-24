
import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { useTheme } from '../../context/ThemeContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO',
    quote: 'Outstanding work! Transformed our vision into reality with innovative solutions.',
    company: 'TechCorp',
    avatar: 'https://via.placeholder.com/80/FF6B6B/FFFFFF?text=JD'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    quote: 'Exceptional developer with deep knowledge of modern technologies. Highly recommended!',
    company: 'Innovate Inc.',
    avatar: 'https://via.placeholder.com/80/4ECDC4/FFFFFF?text=JS'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Product Manager',
    quote: 'Delivered projects on time with top-notch quality. A true professional.',
    company: 'FutureLabs',
    avatar: 'https://via.placeholder.com/80/FFE66D/000000?text=MJ'
  },
  {
    id: 4,
    name: 'Sarah Lee',
    role: 'Designer',
    quote: 'Collaborated seamlessly, bringing technical expertise to creative challenges.',
    company: 'DesignHub',
    avatar: 'https://via.placeholder.com/80/6C5CE7/FFFFFF?text=SL'
  }
];

const Testimonials: React.FC = () => {
  const { settings } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || !settings.animationEnabled) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, settings.animationEnabled]);

  const testimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="testimonials">
      <h2 className="section-title">What Clients Say</h2>
      <div className="testimonials-container">
        <div className="testimonial-card interactive-box">
          <div className="testimonial-avatar">
            <img src={testimonial.avatar} alt={testimonial.name} />
          </div>
          <div className="testimonial-content">
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <div className="testimonial-author">
              <h4>{testimonial.name}</h4>
              <span>{testimonial.role}, {testimonial.company}</span>
            </div>
          </div>
          <div className="testimonial-nav">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`nav-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
          <button className="auto-play-toggle" onClick={() => setAutoPlay(!autoPlay)}>
            {autoPlay ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
