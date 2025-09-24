
import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Contact.css';

const Contact: React.FC = () => {
  const { settings } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitted(true);
    // Simulate API call with delay
    setTimeout(() => {
      setSubmitted(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 3000);
    }, 2000);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
    { name: 'Email', icon: '✉️', url: 'mailto:your.email@example.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Dribbble', icon: '🎨', url: 'https://dribbble.com' }
  ];

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-layout">
        <div className="contact-info interactive-box">
          <h3>Let's Collaborate!</h3>
          <p>Interested in working together or have a question? I'd love to hear from you. Reach out via the form below or connect on social media. Let's create something amazing together.</p>
          <div className="social-links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className={`social-link ${hoveredSocial === link.name ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredSocial(link.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
                <div className="social-glow"></div>
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="contact-form interactive-box">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>
          <button type="submit" className="submit-btn" disabled={submitted}>
            {submitted ? 'Sending...' : 'Send Message'}
          </button>
          {formSubmitted && <p className="success-msg">Message sent successfully!</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
